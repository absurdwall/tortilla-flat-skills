# Tortilla Flat Skills

用户自有、跨项目 skills 的源码仓库。按 `skills/<category>/<skill-name>/SKILL.md` 分类；目标项目继续维护自己的内容、校验器与发布规则。

目前有三项，归入 `management`：

- [manage-learning-library](skills/management/manage-learning-library/SKILL.md)：用于收录页面或链接、整理项目集合，以及检查和刷新指定资源；默认保存为私人草稿。
- [management-workspace-update](skills/management/management-workspace-update/SKILL.md)：从近期 Codex 工作出发，轻量盘点项目方向、未完成事项和追踪缺口，按请求更新 Management 进展。
- [management-workspace-review](skills/management/management-workspace-review/SKILL.md)：检查活跃项目的本地与远端分支、额外 worktree、未提交改动及未推送 commits，先完成只读核查，再按项目给出明确的行动建议。

## 项目盘点与更新

将两个 `management-workspace-*` 文件夹分别链接到用户级发现目录，方式同下文。它们使用已安装且已绑定工作区的 `tortilla-flat-management` 包定位现有 Registry；原生 helper 继续负责管理数据写入和读回。

```sh
# 在仓库根目录执行；若目标已存在，先检查来源，不覆盖。
ln -s "$PWD/skills/management/management-workspace-update" "$HOME/.agents/skills/management-workspace-update"
ln -s "$PWD/skills/management/management-workspace-review" "$HOME/.agents/skills/management-workspace-review"
```

```text
$management-workspace-update 帮我盘点现在各个项目在做什么、还差什么，并更新 Management 中已有项目的进展。
$management-workspace-update 只检查 Codex 项目与 Registry 的差异，先不要写入。
$management-workspace-review 检查活跃项目的工作环境，给我报告。
```

默认先看项目清单和近期聊天摘要，按需要读相关对话及 Issue、PR，形成足够可信的近况概览。盘点会指出覆盖范围、新项目和追踪缺口；写入更新时复用 Management 原生 helper 并读回确认。面板自身的状态统计与加载速度仍由产品实现负责。

Update 开头醒目标明是否需要用户操作；没有待处理事项时直接说明“更新完成，无需操作”。每个项目概况控制在一两句话，详细证据通过链接或已有详细记录保留。

Review 先完成能自行做的只读核查，再分两部分报告：全部仓库的现状总览，以及按项目组织的操作建议。总览包括本地与远端分支数、额外 worktree、未提交与未推送工作，以及保留分支的具体名称和理由；建议部分只列需要处理的项目，写清动作、具体对象和理由，无需点击链接才能看懂。没有建议事项时明确说明无需操作，另简要注明覆盖缺口。额外 worktree 不包含主 checkout。检查保留各项目的文件、Git 状态和远端 tracker；如请求保存报告，只写 Management 自有记录。Registry 继续保留在共享工作区根目录，这项维护授权不扩展到根仓库其他内容。

`management-update` 已改名为 `management-workspace-update`。更新已有安装时，先核对旧链接确实指向本仓库的旧 skill，再移除该链接并安装新名称；保留来源不明的安装。

## 安装与调用

分类目录是源码组织，不是自动发现入口。[Codex 官方文档](https://learn.chatgpt.com/docs/build-skills#where-codex-loads-local-skills)说明，用户级发现位置是 `~/.agents/skills`，支持链接到单个 skill 文件夹。安装这一项即可，无需迁移其他 skills：

```sh
# 在仓库根目录执行；若目标已存在，先检查来源，不覆盖。
mkdir -p "$HOME/.agents/skills"
ln -s "$PWD/skills/management/manage-learning-library" "$HOME/.agents/skills/manage-learning-library"
```

这是实时源码链接，源码更新会影响已安装 skill。安装后检查链接目标，并在新聊天的技能列表中确认；若未显示，重启 Codex。链接存在本身不证明当前聊天已经刷新了发现列表。

在 Bridge、Research 等聊天的消息框中写技能名，再指定 HTML 文件即可。这是一条对话指令，不是终端命令：

```text
$manage-learning-library 把 /绝对路径/lesson.html 保存到 Learning Library，作为草稿登记并给我预览。
```

同一聊天中刚生成了唯一明确的 HTML 时，也可以写：

```text
$manage-learning-library 把刚才生成的 HTML 加到 Learning Library。
```

换聊天或有多个候选页面时，提供完整文件路径、附件或明确的页面链接。也可以自然地说“把这页加到 Learning Library”；指代不明时，skill 会先定位具体文件。有稳定公开网址且由原项目维护的资源优先保留链接。本地 HTML 则保留原项目记录，处理 CSS、图片、关联参考页等依赖，保存独立页面包、候选条目与来源说明，登记并读回，再调用 Library 原生构建器检查。

日常收纳遵循 Library 自己 README 中的内容流程：通常在本地 `main` 保存、登记、检查和提交，不默认每页建 PR。push 是另行请求的远端同步；当前若已有待审阅分支/PR，则保留并报告实际状态，不自动合并或切换分支。修改 Library 构建、校验或发布逻辑仍走分支/PR。正式收录与公开部署继续需要各自的明确批准。

## 检查草稿

托管页面草稿保存在 Library 仓库的 `library-pages/<slug>/`：`public/` 放独立页面，旁边的 `entry.json` 保存候选条目，`notes.md` 简记来源、必要改写和最新状态。持久记录与日常检查遵循目标 Library 管理契约的 `Routine intake`；生成的提案和详细检查输出留在临时预览目录。Library 的私人草稿索引登记该条目；没有现成索引时，skill 建立并链接根目录的 `DRAFTS.md`。链接候选只保存元数据和私人来源说明。这些产物不放进本公开 skills 仓库。

默认交接完成必须确认三件事：文件确实写进目标 Library 仓库；索引中有唯一且链接有效的登记；元数据、声明文件与登记均已读回核对。外部临时包和预览目录不能替代这一交接。只有你明确要求仅预览、不写目标仓库时，才停留在外部草稿，并说明尚未交接。

使用目标 Library `package.json` 指定的 Node 版本运行。下面的命令只检查已准备好的包，不代替上面的完整 skill 调用；正常使用时由 agent 执行：

```sh
node skills/management/manage-learning-library/scripts/check-draft.mjs \
  --library /path/to/tortilla-flat-learning-library \
  --package /path/to/tortilla-flat-learning-library/library-pages/example-slug
```

检查脚本复用指定 Library checkout 的构建、依赖和 inventory 检查，只写新建临时目录；实际保存与登记由 skill 的前一步完成。成功后输出预览 artifact 与 inventory 的位置，供 Library 的 `scripts/serve.mjs` 预览。预览首页只是候选目录的模拟；正式 catalog 和发布记录不会因保存草稿而改变。

依赖清单完成时，每个引用都必须归入已打包文件、Library 规则允许保留的外链或附有原因的未解决依赖。未解决项作为收录阻塞项随草稿交付，可以继续其他草稿准备；全部解决后才能应用正式 catalog 收录变更。静态检查通过不能解除这些阻塞。

默认结果是**草稿已保存并登记**，同时说明本地、已提交或 PR 等实际 Git 状态。完成目标 Library 的正式收录流程，并在其正式源码中确认用户批准的具体条目和页面文件后，才报告**已收录**；仍待必要 review/merge 的正式收录改动应报告为提案。另行批准部署、并核对所需生产证据后，才报告**已公开发布**。仓库内的 Markdown 草稿索引用于查找和交接，不代表已实现私人网页阅读器。

本仓库尚不定义通用插件发行或批量安装机制；本地链接足以使用第一项 skill。
