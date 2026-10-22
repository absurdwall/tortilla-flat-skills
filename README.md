# Tortilla Flat Skills

用户自有、跨项目 skills 的源码仓库。按 `skills/<category>/<skill-name>/SKILL.md` 分类；目标项目继续维护自己的内容、校验器与发布规则。

目前只有一项：[learning-library-add](skills/management/learning-library-add/SKILL.md)，归入 `management`，负责把指定 HTML 教学页准备成 Learning Library 收录草稿。

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

也可以自然地说“把这页加到 Learning Library”。页面指代不明时，skill 会先定位具体文件。它会保留原项目记录，处理 CSS、图片、关联参考页等传递依赖，准备独立页面包、候选条目与私人来源说明，再调用 Library 原生构建器在临时副本中检查。

## 检查草稿

准备目录包含 `public/`（仅独立页面）、`entry.json`（候选 catalog 条目）和可选 `notes.md`（私人来源、路径映射、未决项）。这些产物保存在私有临时目录或 Library 的合适草稿位置，不放进本公开源码仓库。

```sh
node skills/management/learning-library-add/scripts/check-draft.mjs \
  --library /path/to/tortilla-flat-learning-library \
  --package /private/path/to/prepared-package
```

脚本复用指定 Library checkout 的构建、依赖和 inventory 检查；只写新建临时目录。成功后输出预览 artifact 与 inventory 的位置。它不编辑正式 catalog、不登记已批准发布记录、不部署。使用 Library 的 `scripts/serve.mjs` 预览该临时 artifact；完成浏览器检查后再决定是否收录。

默认结果是**草稿**。具体 catalog 条目经用户批准并读回后，才报告**已收录**；另行批准部署、并核对生产证据后，才报告**已公开发布**。当前 Library 支持未收录页面的私人预览；统一可浏览的私人收藏目录仍是待决定的产品能力。

验证入口：

```sh
node --test test/check-draft.test.mjs
# 指向本机现有 Library checkout，包含原生构建集成验证：
LEARNING_LIBRARY_ROOT=/path/to/tortilla-flat-learning-library node --test test/check-draft.test.mjs
```

本仓库尚不定义通用插件发行或批量安装机制；本地链接足以使用第一项 skill。
