---
title: "GitHub 协作使用备忘"
date: 2026-09-05
category: other
tags: [github, git, collaboration]
summary:  "本地与远程、冲突原因、拉取他人修改、解决冲突、以及如何用己方版本更新 main 的操作备忘。"
status: stable
---

## 本地提交 vs 远程提交


|              | 本地                       | 远程（GitHub）           |
| ------------ | ------------------------ | -------------------- |
| 是什么          | 你电脑上的 `.git` 仓库          | GitHub 服务器上的仓库       |
| `git commit` | 只改**本地**历史               | 不动远程                 |
| `git push`   | —                        | 把本地 commit **上传**到远程 |
| `git pull`   | 把远程新 commit **下载并合并**到本地 | —                    |


可以把它想成：

```
本地：  A — B — C — D（你的 commit）
远程：  A — B — C — E（别人 push 的 commit）
```

你只 `commit` 不 `push`：改动只在你电脑上。  
别人看不到，直到你 `push`。

---

## 为什么会冲突？

冲突发生在：**你和别人基于同一个旧版本，各自做了修改，Git 无法自动决定保留哪一边。**

典型场景：

1. 你们都从 commit `C` 出发
2. 你本地 commit 了 `D`（改了第 10 行）
3. 别人 push 了 `E`（也改了第 10 行）
4. 你 `git pull` 时，Git 不知道怎么合并第 10 行 → **冲突**

常见诱因：

- 多人同时改**同一个文件**的**同一段**
- 一人改、一人删同一个文件
- 长时间不 `pull`，本地和远程差了很多 commit

改不同文件、不同行，Git 通常能自动合并，不会冲突。

---

## 提交前想先融合他人的结果

**原则：先同步远程，再提交、再推送。**

### 日常流程

```bash
# 1. 开始干活前，先拉最新
git pull origin main

# 2. 改代码、改文件
# ...

# 3. 提交到本地
git add .
git commit -m "描述你做了什么"

# 4. 推送前再拉一次（防止别人刚 push）
git pull origin main

# 5. 推送
git push origin main
```

### 已有本地 commit、还没 push 时

```bash
git pull origin main    # 把别人的 commit 合并进来
# 若无冲突 → 直接 push
git push origin main
```

若希望历史更一条线，可以用 rebase：

```bash
git pull --rebase origin main
git push origin main
```

`rebase` 会把你的 commit「挪到」别人最新 commit 之后，log 更干净；冲突时同样要手动解决。

---

## 冲突了怎么处理？以及想放弃此次合并怎么办？

`git pull` 或 `git merge` 报 `CONFLICT` 时：

### 1. 看哪些文件冲突

```bash
git status
# 显示 both modified 的文件
```

### 2. 打开冲突文件

会看到类似标记：

```
<<<<<<< HEAD
你（或当前分支）的内容
=======
别人（或要合并进来的分支）的内容
>>>>>>> branch-name
```

### 3. 手动编辑

- 删掉 `<<<<<<<`、`=======`、`>>>>>>>` 这些行
- 保留你想要的最终内容（可以只留一边，也可以两边各取一部分重写）

### 4. 标记已解决并完成合并

```bash
git add 冲突文件路径
git commit -m "Resolve merge conflict in xxx"
git push origin main
```

若 `pull --rebase` 时冲突，解决后：

```bash
git add .
git rebase --continue
git push origin main
```

想放弃这次合并、回到 pull 之前：

```bash
git merge --abort
# 或 rebase 时：
git rebase --abort
```

---

## 特殊情况：想用我现在的版本作为 main

**不直接在 main 上硬推覆盖**，除非团队明确允许。更规范的做法：

### 方式 A：正常合并（推荐）

你的改动已经在本地 commit 好，且冲突已按上面步骤解决：

```bash
git pull origin main   # 解决冲突
git push origin main   # 你的版本进入 main
```

这就是「用协商后的结果更新 main」，最安全。

### 方式 B：Pull Request（多人协作推荐）

1. 从最新 `main` 拉分支：`git checkout -b my-feature`
2. 提交并 push 分支：`git push origin my-feature`
3. 在 GitHub 开 **Pull Request**，请队友 review
4. 通过后 **Merge**，main 更新为你的改动

适合需要讨论、review 的场景。

### 方式 C：你的分支完全取代 main（需全员同意）

仅当团队确认「以你的版本为准、别人的改动可以丢弃」时：

```bash
# 你在自己的分支上，历史是你想要的最终状态
git checkout main
git reset --hard 你的分支名    # 本地 main 指向你的版本
git push --force origin main   # ⚠️ 覆盖远程 main
```

**风险：** 远程上别人还没合并的 commit 会丢失。  
**必须：** 事先在群里/会议上确认，并通知所有人先备份或合并他们需要的内容。

更温和的做法是用 PR 合并，而不是 force push。

---

## 常见解决办法


| 情况         | 做什么                                        |
| ---------- | ------------------------------------------ |
| 刚开始改代码     | `git pull`                                 |
| 改完了        | `git add .` → `git commit`                 |
| 要上传        | 先 `git pull`，再 `git push`                  |
| pull 报冲突   | 打开文件删冲突标记 → `git add` → `git commit`       |
| 想放弃这次 pull | `git merge --abort` 或 `git rebase --abort` |
| 想看远程和本地差多少 | `git fetch` 然后 `git log main..origin/main` |
| 多人项目       | 用分支 + Pull Request，少直接在 main 上改            |


---

## 参考

- [GitHub Docs: Resolving merge conflicts](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/addressing-merge-conflicts)

