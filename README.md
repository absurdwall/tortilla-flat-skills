# Tortilla Flat Skills

用户自有、跨项目 skills 的源码仓库，按 `skills/<category>/<skill-name>/SKILL.md` 分类。目标项目维护自己的内容、契约、校验器和发布规则；本仓库负责跨项目操作流程。

## Manage Learning Library

[manage-learning-library](skills/management/manage-learning-library/SKILL.md) 用于收录学习页面或链接、整理项目集合、检查指定资源的来源变化，以及在授权范围内准备更新。原来的 [learning-library-add](skills/management/learning-library-add/SKILL.md) 保留为兼容入口；检查脚本的旧路径也继续可用。

先完成 Library 的功能和契约，再适配 skill。本次 Library 需要具备 `docs/management-contract.md` 中的集合与来源记录能力；如果本地默认 checkout 尚未集成更新，可明确指定已验证的 Library checkout，不能把临时预览当成正式目录。

在任一项目的聊天消息框中调用：

```text
$manage-learning-library 把刚才生成的 HTML 加到 Learning Library。
$manage-learning-library 把 /完整路径/lesson.html 加到 Learning Library。
$manage-learning-library 把 https://example.org/lesson/ 加到 Learning Library，保留原站链接。
$manage-learning-library 检查 Library 中那篇“工具说明为什么进入了打牌请求”有没有来源更新，先只检查。
$manage-learning-library 刷新指定页面的副本，并保留 Library 里已有的改动。
```

skill 先定位并核验 Library 项目，再处理指定资源。有稳定公开网址、继续由原项目维护的页面优先收录为链接；没有公开网址的本地 HTML 保存为独立页面包。默认完成私人候选保存、登记、读回和验证。它不会自动改变原项目文件或持续后台同步。

同一项目的学习资源可归入项目集合。agent 根据原有章节、先修知识和内容关系安排阅读顺序；无需用户逐篇排序。每篇仍然可单独搜索、打开。来源检查和刷新遵循 Library 的私有来源记录与冲突规则。

保存草稿、提出正式目录修改、远端同步和公开发布分别报告。日常分支、提交与 push 行为沿用 Library 当前规则；push 只在请求时执行，正式收录与手动发布保留各自的批准边界。

## 安装

分类目录是源码组织，不是自动发现入口。将单个 skill 文件夹链接到用户级发现目录；若已有目标，先检查其来源。

```sh
mkdir -p "$HOME/.agents/skills"
ln -s "$PWD/skills/management/manage-learning-library" "$HOME/.agents/skills/manage-learning-library"
```

旧名称如需保留，可单独链接 `skills/management/learning-library-add`。兼容入口与新 skill 一起安装，或保持源码中的相邻目录结构。源码链接随所指分支更新；链接存在不证明当前聊天已刷新发现列表，在后续聊天中确认新名称可见。

## 检查候选与更新提案

skill 自动执行需要的检查；下列脚本不是完整收录流程，不会保存、登记或批准目录变更：

```sh
node skills/management/manage-learning-library/scripts/check-draft.mjs \
  --library /absolute/library-checkout \
  --package /absolute/library-pages/example-slug

# 同一正式身份的私下更新提案
node skills/management/manage-learning-library/scripts/check-draft.mjs \
  --library /absolute/library-checkout \
  --package /absolute/prepared-replacement \
  --mode update
```

候选包的 `entry.json` 使用 Library 当前 schema。托管候选有 `public/` 和私人 `notes.md`；URL 候选不要求页面镜像。新集合可用包旁的 `collection.json` 提议，来源记录格式由 Library 维护。多条资源重排时要一起准备完整目录提案，避免重复顺序。

脚本调用指定 Library 的 build、identity、inventory 和适用的 source 检查，只写隔离临时目录。来源不可用、不受追踪、仍有依赖阻塞或尚未浏览检查，都需要如实报告。预览目录包含候选，不代表正式收录或公开发布。

行为范围与验证场景见 [skill spec](skills/management/manage-learning-library/references/spec.md)。运行集成检查：

```sh
LEARNING_LIBRARY_ROOT=/absolute/updated-library-checkout node --test test/*.test.mjs
```

本仓库不定义批量安装或通用插件发行机制。
