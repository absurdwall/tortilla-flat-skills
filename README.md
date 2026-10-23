# Tortilla Flat Skills

用户自有、跨项目 skills 的源码仓库。按 `skills/<category>/<skill-name>/SKILL.md` 分类；目标项目继续维护自己的内容、校验器与发布规则。

目前只有一项：[manage-learning-library](skills/management/manage-learning-library/SKILL.md)，归入 `management`，用于收录页面或链接、整理项目集合，以及检查和刷新指定资源；默认保存为私人草稿。

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

托管页面草稿保存在 Library 仓库的 `library-pages/<slug>/`：`public/` 放独立页面，旁边的 `entry.json` 保存候选条目，`notes.md` 保存私人来源、路径映射、依赖清单与检查结果。Library 的私人草稿索引登记该条目；没有现成索引时，skill 建立并链接根目录的 `DRAFTS.md`。链接候选只保存元数据和私人来源说明。这些产物不放进本公开 skills 仓库。

默认交接完成必须确认三件事：文件确实写进目标 Library 仓库；索引中有唯一且链接有效的登记；元数据、声明文件与登记均已读回核对。外部临时包和预览目录不能替代这一交接。只有你明确要求仅预览、不写目标仓库时，才停留在外部草稿，并说明尚未交接。

下面的命令只检查已准备好的包，不代替上面的完整 skill 调用；正常使用时由 agent 执行：

```sh
node skills/management/manage-learning-library/scripts/check-draft.mjs \
  --library /path/to/tortilla-flat-learning-library \
  --package /path/to/tortilla-flat-learning-library/library-pages/example-slug
```

检查脚本复用指定 Library checkout 的构建、依赖和 inventory 检查，只写新建临时目录；实际保存与登记由 skill 的前一步完成。成功后输出预览 artifact 与 inventory 的位置，供 Library 的 `scripts/serve.mjs` 预览。预览首页只是候选目录的模拟；正式 catalog 和发布记录不会因保存草稿而改变。

依赖清单完成时，每个引用都必须归入已打包文件、Library 规则允许保留的外链或附有原因的未解决依赖。未解决项作为收录阻塞项随草稿交付，可以继续其他草稿准备；全部解决后才能应用正式 catalog 收录变更。静态检查通过不能解除这些阻塞。

默认结果是**草稿已保存并登记**，同时说明本地、已提交或 PR 等实际 Git 状态。完成目标 Library 的正式收录流程，并在其正式源码中确认用户批准的具体条目和页面文件后，才报告**已收录**；仍待必要 review/merge 的正式收录改动应报告为提案。另行批准部署、并核对所需生产证据后，才报告**已公开发布**。仓库内的 Markdown 草稿索引用于查找和交接，不代表已实现私人网页阅读器。

本仓库尚不定义通用插件发行或批量安装机制；本地链接足以使用第一项 skill。
