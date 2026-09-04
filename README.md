# Leriuir1293.github.io

个人学术主页与公开知识库。基于 [Jekyll](https://jekyllrb.com/) + [GitHub Pages](https://pages.github.com/)，**内容即 Markdown 文件**，无需每次改网页代码。

线上地址（部署后）：<https://leriuir1293.github.io>

---

## 30 秒上手

| 想做什么 | 编辑哪里 |
|----------|----------|
| 改姓名、邮箱、研究兴趣、外链 | `_data/profile.yml` |
| 新增一篇学习笔记 | 在 `_notes/` 新建 `.md` 文件 |
| 新增一篇博客 | 在 `_blog/` 新建 `.md` 文件 |
| 新增论文 | 在 `_publications/` 新建 `.md` 文件 |
| 新增研究项目 | 在 `_projects/` 新建 `.md` 文件 |
| 改导航栏 | `_data/navigation.yml` |
| 新增笔记分类 | `_config.yml` → `note_categories` |

复制模板：`templates/note-template.md`、`templates/blog-template.md`

---

## 项目结构

```
├── _config.yml          # 站点配置（分类、集合、构建设置）
├── _data/
│   ├── profile.yml      # ★ 个人信息（姓名、邮箱、链接、研究兴趣）
│   └── navigation.yml   # 导航栏
├── _notes/              # ★ 学习笔记（知识库）
├── _blog/               # ★ 博客长文
├── _projects/           # 研究项目
├── _publications/       # 论文与发表
├── _layouts/            # 页面模板（一般不需要改）
├── _includes/           # 可复用组件
├── assets/css/          # 样式
├── assets/js/           # 搜索、移动端导航
├── about.md             # About 页面
├── cv.md                # CV 页面
├── contact.md           # 联系方式
├── index.html           # 首页
├── notes.md             # Notes 列表页（含搜索与分类筛选）
├── blog.md              # Blog 列表页
├── research.md          # 项目列表
├── publications.md      # 论文列表
├── Gemfile              # Ruby 依赖（本地预览用）
└── README.md            # 本文件
```

**设计原则：** 内容与表现分离。日常维护 = 写 Markdown + 偶尔改 `profile.yml`。

---

## 本地预览

需要 Ruby 3.x（推荐通过 [RubyInstaller](https://rubyinstaller.org/) 安装，Windows 勾选 MSYS2）。

```bash
# 进入项目目录
cd Leriuir1293.github.io

# 首次：安装依赖
bundle install

# 启动本地服务器
bundle exec jekyll serve

# 浏览器打开 http://localhost:4000
# 修改文件后自动刷新（notes/blog 等内容需保存 .md 文件）
```

> 没有 Ruby 也可以直接 push 到 GitHub，由 GitHub Pages 自动构建。本地预览只是为了提交前检查排版。

---

## 部署到 GitHub Pages

### 首次部署

1. 在 GitHub 创建仓库 **`Leriuir1293/Leriuir1293.github.io`**（用户名.github.io 格式）
2. 将本项目 push 到该仓库的 `main` 分支：

```bash
git init
git add .
git commit -m "Initial academic homepage"
git branch -M main
git remote add origin https://github.com/Leriuir1293/Leriuir1293.github.io.git
git push -u origin main
```

3. GitHub → 仓库 **Settings → Pages** → Source 选 **Deploy from a branch** → Branch 选 `main` / `/(root)`
4. 等待 1–3 分钟，访问 <https://leriuir1293.github.io>

### 日常更新

```bash
git add .
git commit -m "Add note: transformer attention"
git push
```

推送后 GitHub 自动重新构建，无需其他操作。

---

## 如何新增一篇 Note

1. 复制 `templates/note-template.md` 为 `_notes/你的主题.md`（文件名即 URL slug）
2. 填写 front matter：

```yaml
---
title: "笔记标题"
date: 2026-04-01
category: machine-learning    # 见 _config.yml 中的 note_categories
tags: [optimization, sgd]
summary: "一句话摘要，显示在列表和搜索结果中"
status: draft                 # draft | wip | stable
---
```

3. 写正文（支持 Markdown、代码块、`$LaTeX$` 公式）
4. `git push` 即可

**分类：** 在 `_config.yml` 的 `note_categories` 中添加新分类后，Notes 页面的筛选按钮会自动出现。

**搜索：** Notes 页支持按标题、摘要、标签实时搜索；也可通过 URL 参数 `?category=machine-learning` 或 `?tag=optimization` 分享筛选结果。

---

## 如何新增一篇 Blog

1. 复制 `templates/blog-template.md` 为 `_blog/文章slug.md`
2. 填写 front matter：

```yaml
---
title: "文章标题"
date: 2026-04-01
categories: [research]        # 主题分类
tags: [paper-reading]
summary: "列表页显示的摘要"
reading_time: 10              # 可选，阅读分钟数
---
```

3. 撰写正文（比 Notes 更完整、更适合公开阅读）
4. `git push`

Notes 与 Blog 的区别：

| | Notes | Blog |
|---|-------|------|
| 目录 | `_notes/` | `_blog/` |
| 定位 | 写给未来自己的知识库 | 适合他人阅读的正式文章 |
| 篇幅 | 任意 | 通常较长 |
| 状态字段 | `status: draft/wip/stable` | 无（默认发布） |

---

## 如何更新个人信息

编辑 **`_data/profile.yml`**：

```yaml
name: "Your Name"
title: "PhD Student in CS"
affiliation: "XX University"
email: "you@university.edu"
research_interests:
  - "Large language models"
  - "Reasoning"
links:
  github: "https://github.com/Leriuir1293"
  google_scholar: "https://scholar.google.com/..."
```

此文件中的信息会自动出现在首页、About、Contact、页脚等位置。

**CV PDF（可选）：** 将 PDF 放到 `assets/files/cv.pdf`，并在 `profile.yml` 中设置 `cv_pdf: /assets/files/cv.pdf`。

---

## 如何新增论文 / 项目

### 论文（`_publications/`）

```yaml
---
title: "Paper Title"
authors: "Your Name, Coauthor"
venue: "NeurIPS"
year: 2026
type: conference          # conference | journal | preprint | workshop
links:
  - label: PDF
    url: "https://..."
  - label: Code
    url: "https://github.com/..."
---
```

列表页自动按 `year` 降序排列。正文可选（用于详情页摘要、BibTeX 等）。

### 项目（`_projects/`）

```yaml
---
title: "Project Name"
status: ongoing           # ongoing | completed
period: "2025 – Present"
featured: true            # true 则显示在首页
tags: [nlp, reasoning]
summary: "一句话描述"
links:
  - label: Code
    url: "https://github.com/..."
---
```

---

## 自定义与扩展

| 需求 | 做法 |
|------|------|
| 改配色、字体、排版 | 编辑 `assets/css/main.css` 顶部的 CSS 变量 |
| 改页面模板 | 编辑 `_layouts/` 中对应文件 |
| 新增导航项 | 编辑 `_data/navigation.yml` |
| 新增内容类型 | 在 `_config.yml` 的 `collections` 中添加，并创建对应 layout |
| 迁移到其他平台 | 所有内容都在 Markdown 中，可直接导入 Hugo、Quartz 等 |

依赖极少：Jekyll（GitHub Pages 内置）、MathJax CDN（公式）、无 npm/webpack。

---

## 常见问题

**Q: 构建失败？**  
到 GitHub 仓库 → Actions / Pages 查看日志。常见原因：YAML front matter 缩进错误、`_config.yml` 语法问题。

**Q: 笔记/博客页面没更新？**  
确认文件在 `_notes/` 或 `_blog/` 目录，且 front matter 以 `---` 包裹。

**Q: 公式不显示？**  
使用 `$...$`（行内）或 `$$...$$`（块级）。复杂公式参考 [MathJax 文档](https://docs.mathjax.org/)。

**Q: 半年后忘了怎么用？**  
看本 README 的「30 秒上手」表格即可。

---

## 许可

内容（Notes、Blog 等）版权归你所有。站点代码可自由修改。
