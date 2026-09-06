---
title: "Claude Code 与 Codex：安装、配置与实践"
date: 2026-09-06
category: other
tags: [Claude Code, Codex, AI]
summary: "整理 Node.js、Claude Code 与 Codex 的安装、配置及日常使用方法"
status: draft
---

> 本文是我对 Claude Code、Codex 及相关工作流的整理与实践记录。不同版本的客户端可能会调整命令或配置项；使用前建议结合当前版本的官方文档核对。API Key 属于敏感凭据，请勿提交到 Git 仓库或公开页面。

## 一、准备 Node.js 环境

### 1. Node.js 与 npm 是什么

Node.js 是基于 Chrome V8 引擎的 JavaScript 运行时，使 JavaScript 可以用于编写服务器端程序和各种命令行工具。npm（Node Package Manager）是 Node.js 自带的包管理器，用于安装、升级和管理 JavaScript 包。

前端工程化、许多 AI 编程工具的命令行版本，都依赖 Node.js 与 npm。

### 2. 下载与安装

下载地址：[Node.js 官网](https://nodejs.org/en/download/)

一般选择 **LTS（长期支持版）**，它通常比 Current 版本更适合日常开发。根据操作系统选择安装包，例如 64 位 Windows 可选择：

> **Windows Installer（.msi） → 64-bit**

Windows 安装过程基本按向导操作即可，连续点击 **Next**，保留默认选项通常就能完成安装。本文原先以 Node.js 16+ 为最低参考；实际使用时，建议优先满足目标工具当前文档要求，并安装仍处于维护周期的 LTS 版本。

安装完成后，可以在终端检查版本：

```bash
node --version
npm --version
```

### 3. 设置 npm 镜像（可选）

如果默认源下载较慢，可以将 npm registry 切换为国内镜像：

```bash
npm config set registry https://registry.npmmirror.com
```

查看当前配置：

```bash
npm config get registry
```

如需恢复 npm 官方源：

```bash
npm config set registry https://registry.npmjs.org
```

### 4. 卸载 Node.js

在 Windows 中打开 **控制面板 → 程序和功能**，或进入 **设置 → 应用**，找到 Node.js 后卸载。也可以按 `Win + R`，输入 `appwiz.cpl` 并回车，直接打开程序卸载窗口。

卸载完成后，如果下列目录仍然存在，可以确认其中没有需要保留的内容后再删除：

```text
C:\Program Files\nodejs
C:\Users\<用户名>\AppData\Roaming\npm
C:\Users\<用户名>\AppData\Roaming\npm-cache
```

## 二、安装与配置 Claude Code

### 1. 安装

使用 npm 全局安装 Claude Code：

```bash
npm install -g @anthropic-ai/claude-code --registry=https://registry.npmmirror.com
```

安装完成后检查版本：

```bash
claude --version
```

Claude Code 可以通过 VS Code 插件使用，也可以直接在终端中运行。若需要更直接地观察命令执行和权限确认过程，终端交互通常更方便。无论使用哪种方式，都不建议在不了解命令作用的情况下完全放开权限。

### 2. 临时配置环境变量

如果使用 API 中转服务，需要配置服务地址、密钥和模型。Windows **CMD** 中可暂时这样设置：

```bat
set ANTHROPIC_BASE_URL=https://api.example.com
set ANTHROPIC_AUTH_TOKEN=sk-your-api-key
set ANTHROPIC_MODEL=your-model-name
claude
```

将示例地址、模型名和 API Key 替换为服务商提供的实际值。进入 Claude Code 后输入 `/status`，检查 **Anthropic base URL** 是否为预期地址。

这种 `set` 方式只对当前终端窗口有效：关闭窗口或新开终端后需要重新设置。不要把真实密钥写进公开仓库、截图或文章示例中。

### 3. 持久化配置

更方便的方式是将环境变量写入 Claude Code 的 `settings.json`。Claude Code 启动时会读取用户目录下的配置文件；Windows 通常为：

```text
C:\Users\<你的用户名>\.claude\settings.json
```

文件不存在时可以新建；已有 JSON 内容时，应把 `env` 合并进去，而不是破坏原有配置：

```json
{
  "env": {
    "ANTHROPIC_BASE_URL": "https://api.example.com",
    "ANTHROPIC_AUTH_TOKEN": "sk-your-api-key",
    "ANTHROPIC_MODEL": "your-model-name"
  }
}
```

配置后重新启动 Claude Code，并使用 `/status` 验证模型、账号及连接状态。若服务商并不支持某个模型名，应以服务商实际提供的模型名称为准。

## 三、Claude Code 的项目约定与记忆

### 1. 使用 CLAUDE.md 管理项目规则

Claude Code 启动时会按作用域加载 `CLAUDE.md`。常见位置如下：

| 文件 | 作用 |
| --- | --- |
| 项目根目录下的 `CLAUDE.md` | 团队共享的架构、命令和协作规范 |
| 项目中的 `CLAUDE.local.md` | 个人临时偏好，通常加入 `.gitignore`，不提交到仓库 |
| `~/.claude/CLAUDE.md` | 用户级规则，对所有项目生效 |
| monorepo 子目录中的 `CLAUDE.md` | 进入相应子目录或读取其中内容时生效的局部规则 |

把每次都要重复说明的内容写进这些文件，相当于为 Agent 提供一份长期有效的项目说明：项目用途、允许与禁止的操作、测试方式以及特殊约束都可以集中记录。输入 `/init` 后，Claude Code 也可以扫描项目并生成一份初始的 `CLAUDE.md`，再由人工校正。

### 2. 什么内容值得写进去

适合记录：

- Claude 不容易从代码中推断出的内部命令或自定义脚本；
- 与语言或框架默认习惯不同的代码风格；
- 测试、构建、部署和提交代码的具体方式；
- 项目特有的环境变量、隐藏约束和容易踩坑的事项。

不必重复记录：

- 直接阅读代码就能看出的目录结构；
- 大段 API 文档（可以链接到官方文档）；
- 很快会过时的任务进度；
- “写高质量代码”这类缺乏可操作性的泛化要求。

官方实践建议是保持 `CLAUDE.md` 简短。它会在每次会话中加载，过于冗长可能使真正重要的规则被淹没。一个实用做法是：如果 Claude 反复犯同一种错误，就把经过确认的正确做法补充进去；随着迭代，它会逐渐成为项目的操作手册。

### 3. auto memory

`CLAUDE.md` 是用户主动写给 Claude 的项目指令；Claude Code 还可能使用 **auto memory**，把长期有帮助的经验整理成自己的笔记。两者作用互补，例如可以记录某个项目的特殊测试命令或某个依赖的已知问题。

可以定期输入：

```text
/memory
```

查看当前记忆，并删除或修正已经失效的内容。涉及安全、版本或团队规范的事项，仍应以仓库中的明确文档和人工确认结果为准。

## 四、Claude Code 的常用交互功能

### 1. 斜杠命令

进入 Claude Code 后，在输入框输入 `/` 通常可以查看当前版本支持的命令。下面是常用命令的用途概览：

| 命令 | 用途与建议 |
| --- | --- |
| `/model` | 查看或切换模型，并调整推理强度。强度越高通常越慢、消耗越多，应按任务复杂度选择。 |
| `/clear` | 清空当前上下文并开始新对话。切换到无关任务时建议使用，避免旧信息干扰判断。 |
| `/compact` | 手动压缩当前对话。可在上下文接近上限时使用，也可以说明希望摘要重点保留的内容。 |
| `/status` | 查看版本、模型、账号、连接状态和配置，排查 Base URL 时尤其有用。 |
| `/init` | 扫描项目并生成初版 `CLAUDE.md`。 |
| `/simplify` | 从复用、代码质量和效率等角度检查近期改动，并尝试自动简化或重构；使用前应审阅改动。 |
| `/insights` | 根据项目使用情况生成报告，帮助发现交互中的摩擦点和常修改区域。 |
| `/rename` | 为当前会话设置易识别的名称，便于之后恢复。 |
| `/rewind` | 打开检查点菜单，回退对话和由 Claude 直接修改的文件。 |
| `/goal` | 为当前会话设置完成条件，见下文。 |

### 2. 引用文件与编辑长提示

在输入框中使用 `@` 可以引用具体文件，例如：

```text
请检查 @src/auth.ts 中的会话校验逻辑。
```

这样可以明确告诉 Claude 优先关注的文件。对于很长的提示词、日志或计划，可以按 `Ctrl + G` 将当前输入交给默认编辑器编辑；保存并关闭编辑器后，内容会回填到 Claude Code 输入框。

### 3. 用 Esc 打断或回退

Claude 正在执行时按一次 `Esc` 可以立即中断当前动作，同时保留现有上下文。与其让 Agent 沿错误方向继续，不如及时打断并补充约束：

```text
我：重构这个模块
Claude：开始读取多个文件……
我：按 Esc
我：先不要修改 tests/，只重构 src/ 下的实现。
```

连续按两次 `Esc`，或输入 `/rewind`，会打开检查点（checkpoint）菜单。Claude Code 通常会在每次提交 prompt 时保存检查点，其中包括对话状态以及通过 `Edit` / `Write` 工具修改的文件。选择检查点后，可以回到之前的状态。

检查点适合：

- 改到一半发现方案方向不对；
- 对话变得混乱，想回到更清晰的节点；
- 尝试较大改动后，需要整体撤销。

需要注意：

- 通过 `rm`、`mv` 等 Bash 命令间接修改的文件，可能不在 checkpoint 的追踪范围内；
- checkpoint 不是 Git 的替代品，通常只保留有限时间。重要代码仍应及时提交到版本控制系统。

## 五、会话恢复与任务隔离

### 1. 恢复历史会话

关闭终端、重启电脑后，Claude Code 的会话记录通常仍可恢复：

```bash
# 继续当前目录下最近一次会话
claude --continue

# 从最近的会话列表中选择一个
claude --resume
```

`--continue` 只查找**当前目录**下最近的会话；如果切换到另一个项目目录，它不会自动跳回上一个项目。并行处理多个任务时，建议使用描述性名称区分会话，例如 `oauth-migration`、`debug-memory-leak`。

### 2. 让会话与 Git 分支一一对应

可以把每个待办事项视为一个独立会话，并让它对应一个 Git 分支：分支隔离代码，会话隔离上下文。这样切换任务时，不容易把不同任务的背景混在一起。

#### 示例：FactorMiner 项目

假设项目同时有以下任务：

```text
1. 修复 FMPE（因子动量溢价评估）模块的计算问题
2. 增加 ICIR 和 RankIC 因子评价指标
3. 重构数据预处理管道，使其支持 Parquet
4. 编写论文实验部分的代码和图表
```

可以按任务分别创建分支和会话：

```bash
# 进入项目根目录
cd ~/projects/FactorMiner-Benchmark

# 任务 1：修复 FMPE 问题
git switch -c fix/fmpe-calculation-bug
claude
# 在 Claude Code 中：/rename fix-fmpe-bug
# 然后描述：FMPE 模块计算因子收益时复权价格处理有误，请定位并修复。

# 任务 2：增加指标
git switch main
git switch -c feat/add-icir-rankic
claude
# 在 Claude Code 中：/rename feat-icir-rankic
# 然后描述：在 metrics/ 下新增 ICIR 和 RankIC 计算函数。

# 任务 3：迁移数据管道
git switch main
git switch -c refactor/data-pipeline-parquet
claude
# 在 Claude Code 中：/rename refactor-parquet-pipeline
# 然后描述：将 data_loader.py 从 CSV 迁移为支持 Parquet。

# 任务 4：编写实验图表
git switch main
git switch -c paper/experiment-figures
claude
# 在 Claude Code 中：/rename paper-experiment-figures
# 然后描述：根据实验结果生成 Figure 3 和 Figure 4 的代码。
```

如果正在编写指标时需要紧急修复 FMPE，可以先保存当前工作，再切换分支并恢复对应会话：

```bash
# 在当前分支保存未完成工作
git add .
git commit -m "WIP: partial ICIR and RankIC implementation"

# 切换到 FMPE 修复分支
git switch fix/fmpe-calculation-bug
claude --resume fix-fmpe-bug
```

处理完后再切回原分支：

```bash
git switch feat/add-icir-rankic
claude --resume feat-icir-rankic
```

会话可以保留它之前的上下文，但恢复前仍要确认当前 Git 分支正确，避免在错误的代码版本上继续操作。

### 3. 完成任务后的合并与清理

个人项目可以直接合并：

```bash
git switch main
git merge feat/add-icir-rankic
git push origin main

# 可选：删除已合并的本地分支
git branch -d feat/add-icir-rankic
```

会话可以保留，方便日后回溯；确认不再需要时再删除（具体命令以当前版本支持情况为准）：

```bash
claude delete feat-icir-rankic
```

合作项目通常应通过 Pull Request：

```bash
# 推送功能分支，而不是直接改 main
git push origin feat/add-icir-rankic
```

然后在 GitHub 或 GitLab 上创建 PR，填写变更说明、指定 Reviewer 并关联 Issue；等待 Code Review 和 CI 通过后，由 Maintainer 合并。合并后可以删除远程分支，并同步本地 `main`：

```bash
git push origin --delete feat/add-icir-rankic
git switch main
git pull origin main
git branch -d feat/add-icir-rankic
```

### 4. 使用 `/goal` 设定验收条件

对于需要持续执行的复杂任务，可以给当前会话设置目标：

```text
/goal 所有单元测试通过，并且 README 已更新
```

常见用法：

```text
/goal <用自然语言描述的完成条件>
/goal active
/goal clear
```

设置目标后，Claude 会把它当作验收条件，在准备结束时检查是否仍有未完成事项。它并不能替代人工验收，因此仍应查看 diff、测试结果和实际运行效果。

## 六、权限模式与 Plan 模式

Claude Code 的权限模式决定文件编辑和命令执行是否需要确认。通常可按 `Shift + Tab` 循环切换，并观察状态栏：

- **default**：涉及操作时通常请求确认；
- **acceptEdits**：文件编辑自动允许，但执行命令仍可能需要确认；
- **plan**：只探索和制定计划，不直接修改代码；
- **auto**：由安全分类器判断常规命令，明显危险的操作仍会被拦截（具体名称和行为可能随版本变化）。

复杂任务，例如“重新设计一个模块的 API”，建议先使用 plan 模式。Claude 会读取项目、分析依赖、提出必要问题并输出计划；人工确认方案后，再切换回可编辑模式执行。简单任务直接描述需求通常更高效。

也可以从命令行启动 auto 模式：

```bash
claude --permission-mode auto
```

无论使用哪种模式，都应特别关注删除文件、覆盖配置、执行外部命令和访问网络等不可逆或敏感操作。

## 七、聊天记录与 JSONL

### 1. JSON 与 JSONL

普通 JSON 往往将多个对象放在一个数组中：

```json
[
  {"name": "Alice", "age": 30},
  {"name": "Bob", "age": 25}
]
```

JSONL（JSON Lines）则是一行一个完整的 JSON 对象，不需要外层数组，也不需要在行尾添加逗号：

```jsonl
{"name":"Alice","age":30}
{"name":"Bob","age":25}
```

聊天记录适合 JSONL，因为每条消息都可以作为新的一行追加，读取时还能按时间顺序处理。

### 2. Claude Code 的记录位置

Claude Code 通常将会话保存为：

```text
~/.claude/projects/<项目路径>/<会话 ID>.jsonl
```

这里的 `<项目路径>` 一般是经过编码的项目绝对路径，而不是直接照抄带斜杠的路径。例如：

```text
项目路径：/Users/alice/code/myapp
记录目录：~/.claude/projects/-Users-alice-code-myapp/
```

JSONL 文件中会按顺序记录用户消息、模型回复和工具调用。简化示例：

```jsonl
{"type":"user","sessionId":"db4961c3-...","uuid":"87bb5552-...","parentUuid":null,"message":{"role":"user","content":"帮我写一个二分查找"}}
{"type":"assistant","sessionId":"db4961c3-...","uuid":"a1b2c3d4-...","parentUuid":"87bb5552-...","message":{"role":"assistant","content":"好的，二分查找的思路是……"}}
```

`sessionId` 表示所属会话，`uuid` 标识当前消息，`parentUuid` 指向上一条消息。`--resume` 可以理解为重新读取这些记录，并沿着消息关系还原会话上下文。

### 3. Sub Agent 的记录

除主会话外，Claude Code 还可能在独立上下文中运行 Sub Agent。子 Agent 的记录不会全部混入主会话文件，而是放在对应会话旁边的 `subagents/` 目录中，结构大致如下：

```text
~/.claude/projects/<项目路径>/
├── 9f558c28-....jsonl          # 主会话
└── 9f558c28-.../               # 与会话 ID 对应的目录
    └── subagents/
        ├── agent-a980c047....jsonl       # 子 Agent 的对话
        └── agent-a980c047....meta.json   # 类型和任务等元数据
```

主会话一般只记录发起了子任务，子 Agent 的完整上下文和消息则保存在独立文件中。记录文件可能包含敏感信息，查看、备份或分享前应做好脱敏。

## 八、Sub Agent：隔离上下文与并行协作

### 1. 为什么需要 Sub Agent

一个任务通常包含搜索文件、阅读依赖、设计方案、修改代码和运行测试等步骤。如果所有探索过程都堆积在主 Agent 的上下文中，真正开始实现时可能已经塞入大量无关内容。

Sub Agent 可以理解为“把子任务外包出去”：主 Agent 新建一个独立的消息上下文，提供任务描述；子 Agent 自行搜索、阅读和调用工具，完成后只返回摘要。主 Agent 得到的是结论，而不是全部中间过程。

例如：

- 不使用 Sub Agent：主 Agent 阅读十个文件，所有内容都留在主上下文中；
- 使用 Sub Agent：子 Agent 分析后只返回“鉴权涉及 `auth.ts`、`middleware.ts` 和 `session.ts`，其中 `auth.ts` 是入口，`session.ts` 依赖 Redis”。

### 2. 适合使用的场景

- 只关心结论、不需要亲自查看全部过程的探索性搜索；
- 描述本身足够完整、与主任务相对独立的子任务，例如为函数补充单元测试；
- 需要独立视角进行代码审查或提出“第二意见”；
- 多个互不依赖的任务可以并行处理。

独立审查尤其有价值：编写代码的 Agent 容易受原有思路影响，另一个独立上下文中的 Agent 更可能发现遗漏。

### 3. 不适合使用的场景

- 一个工具调用就能完成的简单任务。创建新上下文本身有额外开销；
- 严重依赖父会话中大量背景信息的任务。若必须在 prompt 中重新复述大段内容，隔离带来的收益会被抵消。

大多数时候，Claude Code 或 Codex 的主 Agent 会自行判断是否需要子 Agent。典型流程是：主 Agent 决策 → 生成子任务 prompt → Sub Agent 独立执行 → 返回摘要。

### 4. Fork Agent

Fork Agent 通常是内部的上下文优化机制，日常使用时不需要手动管理。可以主动使用 `/btw <问题>` 在主对话中插入一个临时问答，尽量不打断主线；自动记忆提取和后台进度整理等机制一般会在后台运行。

理解它的意义主要在于帮助我们认识 Agent 框架的设计：把不必污染主上下文的工作放到独立分支中处理。

## 九、创建自己的 Skill

### 1. Skill 是什么

如果某个本地工作流经常重复，且不一定值得开发成远程 MCP 服务，可以将它固化为一个 Skill。Skill 通常是一个包含 `SKILL.md` 的目录，Claude 按需读取其中的说明，并通过一个命令触发流程。Codex、Cursor、GitHub Copilot 等工具也提供了类似的可复用工作流机制。

目录位置通常为：

| 工具 | 项目级目录 | 全局目录 |
| --- | --- | --- |
| Claude Code | `.claude/skills/` | `~/.claude/skills/` |

项目级 Skill 只在当前项目使用；全局 Skill 对个人的多个项目生效。

### 2. Skill 的基本结构

一个最小 Skill 可以是：

```text
.claude/skills/image-optimizer/
└── SKILL.md
```

脚本、模板和参考资料都是可选的。例如图片优化 Skill 可以额外包含 `scripts/optimize.py`，用 Pillow 固定完成压缩、缩放和 WebP 转换。将稳定流程交给脚本，结果更一致，也能减少每次让模型重新生成代码的 token 消耗。

### 3. SKILL.md 的组成

`SKILL.md` 通常由 YAML 头部和 Markdown 正文组成：

1. YAML 头部位于两组 `---` 之间，声明名称、触发描述、权限等元信息；
2. Markdown 正文描述触发后应执行的步骤，相当于操作手册。

如果流程简单，纯文本说明就足够。例如检查 Git 提交信息的 Skill：

```markdown
---
name: commit-check
description: 检查 commit message 是否符合规范。提交代码或执行 git commit 时使用。
disable-model-invocation: true
allowed-tools: Bash(git *)
---

检查最近一条 commit message 是否符合以下格式：

<type>(<scope>): <description>

type 必须是 feat、fix、refactor、docs、test、chore 之一。
如果格式不正确，给出修改建议，并在用户确认后使用 git commit --amend 修正。
```

更复杂或对结果准确性要求更高的流程，建议配合脚本：

1. 复杂的数据处理，例如图片转换、批量文件处理；
2. 需要校验模型产物的流程，例如生成文件后检查格式、测试结果或必需字段。

### 4. 常见字段

- `allowed-tools`：限制该 Skill 可调用的工具，例如 `Bash(git *)` 只允许匹配 Git 命令的 Bash 调用。权限范围应尽量小；
- `${CLAUDE_SKILL_DIR}`：表示当前 Skill 的目录，可用于稳定引用随 Skill 分发的脚本、模板和参考文件，避免依赖当前工作目录；
- `disable-model-invocation: true`：禁止模型自行触发，只允许用户显式调用，适合有副作用或需要人工把关的流程；
- `$ARGUMENTS`：接收用户在命令后传入的参数，适合把文件名、选项或目标传给 Skill。

字段名称和行为可能随版本更新，创建后应以当前工具文档为准，并在无副作用的测试项目中验证。

### 5. 渐进式披露

Skill 不会在启动时把所有脚本和参考资料一次性塞进上下文，而是采用渐进式披露：

- **Level 1：元数据**——启动时加载名称和描述，用于判断是否匹配；
- **Level 2：指令正文**——Skill 被触发后加载 `SKILL.md` 的主要说明；
- **Level 3 及以上：附属资源**——只有任务需要时，才读取脚本、模板或参考文档。

这样既能让 Skill 被准确发现，又能控制上下文占用。

### 6. 使用与生成 Skill

使用时可以直接提出类似需求：

```text
请按照 /image-optimizer skill 的要求，优化 assets/ 下的图片。
```

Anthropic 还提供了 `skill-creator` Skill。安装后，在 Claude Code 中调用 `/skill-creator` 并用自然语言描述目标，它会生成 Skill 目录、`SKILL.md` 以及必要的脚本。生成结果仍应由人工检查，尤其是触发条件、权限范围、脚本输入输出和可能的副作用。

## 十、安装与配置 Codex

### 1. 使用形态

Codex 通常有 Desktop、CLI 和 VS Code 集成等入口。Desktop 版本可直接从官方网站下载；CLI 和 VS Code 插件适合终端或编辑器工作流。

不同入口通常共享用户目录下的 `.codex/` 配置，因此配置一次后多个入口都可以使用。默认流程可能会引导登录 ChatGPT 账号；如果所在地区无法注册或订阅，也可以根据服务商提供的方式配置兼容的 API 中转服务。请确认服务商可信，并遵守相关服务条款。

### 2. 找到配置目录

Windows 的 Codex 配置目录通常为：

```text
C:\Users\<用户名>\.codex\
```

以 `.` 开头的目录默认可能被隐藏。若资源管理器中看不到，可以选择 **查看 → 显示 → 隐藏的项目**。

本文主要涉及两个文件：

- `config.toml`：配置模型服务商、Base URL、模型和推理强度；
- `auth.json`：保存 API Key 等认证信息，必须妥善保护，不能提交到公开仓库。

### 3. 配置 `config.toml`

将下面内容按需写入 `config.toml`。若文件已有其他配置，请合并字段而不是盲目覆盖：

```toml
model_provider = "aicode007"
model = "your-model-name"
model_reasoning_effort = "high"
model_verbosity = "high"

[model_providers.aicode007]
name = "aicode007"
base_url = "https://api.example.com"
wire_api = "responses"
requires_openai_auth = true
```

其中 `model_provider`、`base_url`、`wire_api` 和模型名称必须与实际中转服务的兼容协议和文档一致。

### 4. 配置 `auth.json`

在同一目录创建或编辑 `auth.json`：

```json
{
  "auth_mode": "apikey",
  "OPENAI_API_KEY": "sk-your-api-key"
}
```

将示例 Key 替换为实际密钥。不要把这个文件上传到 GitHub；建议将其加入全局或项目的忽略规则，并限制文件访问权限。

## 十一、Codex 常用命令

在 Codex 输入框中键入 `/`，通常会弹出当前版本支持的命令列表。常用命令包括：

| 命令 | 用途 |
| --- | --- |
| `/compact` | 手动压缩上下文；上下文接近上限时可提前执行。 |
| `/plan` | 切换到计划模式。此模式下通常不写入文件，Codex 会先探索项目、提出问题并给出计划，确认后再执行。 |
| `/model` | 查看或切换模型，并调整推理强度；更高强度通常意味着更慢和更高消耗。 |

此外，也可以在输入框中使用 `@` 引用具体文件，让 Codex 优先关注指定内容：

```text
请检查 @src/auth.ts，并说明登录状态在哪里被持久化。
```

复杂任务先用 `/plan` 对齐范围和验收标准，简单任务直接描述目标即可。无论是 Claude Code 还是 Codex，执行后都应检查改动、运行测试，并确认没有意外修改无关文件。
