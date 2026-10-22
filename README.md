# Tortilla Flat Skills

用户自有、跨项目 skills 的源码仓库。按 `skills/<category>/<skill-name>/SKILL.md` 分类；目标项目继续维护自己的内容、校验器与发布规则。

目前只有一项：[learning-library-add](skills/management/learning-library-add/SKILL.md)，归入 `management`，默认将指定 HTML 教学页整理为独立草稿，保存到 Learning Library 仓库、登记并读回确认。

## 安装与调用

分类目录是源码组织，不是自动发现入口。[Codex 官方文档](https://learn.chatgpt.com/docs/build-skills#where-codex-loads-local-skills)说明，用户级发现位置是 `~/.agents/skills`，支持链接到单个 skill 文件夹。安装这一项即可，无需迁移其他 skills：

```sh
# 在仓库根目录执行；若目标已存在，先检查来源，不覆盖。
mkdir -p "$HOME/.agents/skills"
ln -s "$PWD/skills/management/learning-library-add" "$HOME/.agents/skills/learning-library-add"
```

这是实时源码链接，源码更新会影响已安装 skill。安装后检查链接目标，并在新聊天的技能列表中确认；若未显示，重启 Codex。链接存在本身不证明当前聊天已经刷新了发现列表。

在 Bridge、Research 等聊天中说：

> 用 $learning-library-add，把 `/绝对路径/lesson.html` 加到 Learning Library，先准备草稿。

也可以自然地说“把这页加到 Learning Library”。页面指代不明时，skill 会先定位具体文件。它会保留原项目记录，处理 CSS、图片、关联参考页等传递依赖，准备独立页面包、候选条目与私人来源说明，保存到真实 Library 仓库并登记，再调用 Library 原生构建器在临时副本中检查。

## 检查草稿

草稿保存在 Library 仓库的 `library-pages/<slug>/`：`public/` 放独立页面，旁边的 `entry.json` 保存候选条目，`notes.md` 保存私人来源、路径映射、依赖清单与检查结果。Library 的私人草稿索引登记该条目；没有现成索引时，skill 建立并链接根目录的 `DRAFTS.md`。这些产物不放进本公开 skills 仓库。

默认交接完成必须确认三件事：文件确实写进目标 Library 仓库；索引中有唯一且链接有效的登记；元数据、声明文件与登记均已读回核对。外部临时包和预览目录不能替代这一交接。只有你明确要求仅预览、不写目标仓库时，才停留在外部草稿，并说明尚未交接。

```sh
node skills/management/learning-library-add/scripts/check-draft.mjs \
  --library /path/to/tortilla-flat-learning-library \
  --package /path/to/tortilla-flat-learning-library/library-pages/example-slug
```

检查脚本复用指定 Library checkout 的构建、依赖和 inventory 检查，只写新建临时目录；实际保存与登记由 skill 的前一步完成。成功后输出预览 artifact 与 inventory 的位置，供 Library 的 `scripts/serve.mjs` 预览。预览首页只是候选目录的模拟；正式 catalog 和发布记录不会因保存草稿而改变。

依赖清单完成时，每个引用都必须归入已打包文件、Library 规则允许保留的外链或附有原因的未解决依赖。未解决项作为收录阻塞项随草稿交付，可以继续其他草稿准备；全部解决后才能应用正式 catalog 收录变更。静态检查通过不能解除这些阻塞。

默认结果是**草稿已保存并登记**，同时说明本地、已提交或 PR 等实际 Git 状态。完成目标 Library 的正式收录流程，并在其正式源码中确认用户批准的具体条目和页面文件后，才报告**已收录**；仍待必要 review/merge 的正式收录改动应报告为提案。另行批准部署、并核对所需生产证据后，才报告**已公开发布**。仓库内的 Markdown 草稿索引用于查找和交接，不代表已实现私人网页阅读器。

验证入口：

```sh
node --test test/check-draft.test.mjs
# 指向本机现有 Library checkout，包含原生构建集成验证：
LEARNING_LIBRARY_ROOT=/path/to/tortilla-flat-learning-library node --test test/check-draft.test.mjs
```

本仓库尚不定义通用插件发行或批量安装机制；本地链接足以使用第一项 skill。
