# Validation — 2026-10-22

`learning-library-add` 默认交接现为保存到真实 Library checkout、登记到私人 Markdown 索引并读回确认；用户明确要求不写目标仓库时才只预览。用户级链接仍指向本仓库源码。以下先记录当前交接验证，再保留初版验证范围。

## Saved-draft handoff

- 按更新后的流程，将一份已有真实页面包保存到私人 Library 仓库的 `library-pages/<slug>/`，保存候选元数据和来源说明，并通过根目录 `DRAFTS.md` 登记。
- 逐文件 SHA-256 比较确认全部 5 份保存文件与准备包一致；候选条目读回一致，索引恰有一条对应 ID，记录链接均可解析。结果保存在目标仓库的私人 notes 中，不把私人来源复制进本公开 skills 仓库。
- 以实际保存目录为输入，原生草稿构建和 inventory 检查通过。更新前后正式 catalog、发布记录及原项目 3 份文件的哈希均未改变，原项目 Git 状态也未改变。
- 另行执行正式 catalog 构建，登记前后完整公开 inventory 完全相同，仍为 8 个文件；新增草稿、索引、候选条目和私人 notes 均未进入公开产物。
- Library 的 138 项测试及 typecheck 通过；skill 的 7 项集成检查、格式校验和 diff 检查通过。运行时为 Node 24.12.0，未运行 Node 22 生产 CI。
- 从已保存草稿新建的预览页面、CSS 和参考页字节与此前已浏览验证的版本完全相同，沿用该次桌面检查；未新增移动端或控制台/网络抓取验收。
- 本轮仅保存并登记私人草稿，没有正式收录、部署或修改原项目。源文件索引不代表私人网页阅读器。

## Initial implementation validation

初版使用隔离合成材料，未修改真实 Bridge 或 Library checkout：

- `skill-creator/scripts/quick_validate.py`：通过。
- `node --test test/check-draft.test.mjs`：7 项通过，0 跳过。使用现有 Library（revision `730369cbd4574fcf31e9b21f1cc62b2dcfa2b273`）原生 catalog、页面依赖、build 和 inventory 检查；未复制校验规则。
- 正向用例：完整页面、CSS import、图片、JS module import、关联参考页及返回链接；确认源页面与正式 catalog 字节未变、私人 notes 未进入产物。
- 负向用例：漏声明依赖、缺失资源、远程运行资源、当前身份冲突、symlink 祖先越界、声明路径穿越，均被拒绝。
- 手工合成流程：从 `lessons/lesson.html`、`assets/`、`reference/` 模拟原项目结构复制与改写为独立包。通过原生检查后，使用 Library 自带 server 浏览临时 artifact；确认 CSS、图片、按钮交互、参考页往返和 Library 返回链接正常。

本机运行时为 Node 24.12.0；未运行 Library 的 Node 22 生产 CI 或完整发布验收。浏览器验证覆盖可见行为，未进行独立网络抓包。合成流程由当前 agent 执行，未声称独立 agent forward-test。该轮证明第一项 skill 的包交接与隔离检查可用，不证明所有 HTML 结构都能自动提取依赖；依赖识别与复制仍由执行 skill 的 agent 按来源检查。

脚本只检查新候选条目与当前 catalog 的组合；历史身份保留与发布批准仍应查阅 Library 的 publication record，并走其现行 release 流程。私人收藏目录的产品语义尚未决定，现有功能仅用于草稿预览。没有真实页面被收录、公开发布或部署。
