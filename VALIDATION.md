# Validation — 2026-10-22

`learning-library-add` 已完成源码与本机用户级链接，尚未在新聊天的技能发现列表中验收。安装说明见 README。验证未使用真实 Bridge 页面，未修改 Bridge 或 Learning Library checkout。

- `skill-creator/scripts/quick_validate.py`：通过。
- `node --test test/check-draft.test.mjs`：7 项通过，0 跳过。使用现有 Library（revision `730369cbd4574fcf31e9b21f1cc62b2dcfa2b273`）原生 catalog、页面依赖、build 和 inventory 检查；未复制校验规则。
- 正向用例：完整页面、CSS import、图片、JS module import、关联参考页及返回链接；确认源页面与正式 catalog 字节未变、私人 notes 未进入产物。
- 负向用例：漏声明依赖、缺失资源、远程运行资源、当前身份冲突、symlink 祖先越界、声明路径穿越，均被拒绝。
- 手工合成流程：从 `lessons/lesson.html`、`assets/`、`reference/` 模拟原项目结构复制与改写为独立包。通过原生检查后，使用 Library 自带 server 浏览临时 artifact；确认 CSS、图片、按钮交互、参考页往返和 Library 返回链接正常。

本机运行时为 Node 24.12.0；未运行 Library 的 Node 22 生产 CI 或完整发布验收。浏览器验证覆盖可见行为，未进行独立网络抓包。合成流程由当前 agent 执行，未声称独立 agent forward-test。该轮证明第一项 skill 的包交接与隔离检查可用，不证明所有 HTML 结构都能自动提取依赖；依赖识别与复制仍由执行 skill 的 agent 按来源检查。

脚本只检查新候选条目与当前 catalog 的组合；历史身份保留与发布批准仍应查阅 Library 的 publication record，并走其现行 release 流程。私人收藏目录的产品语义尚未决定，现有功能仅用于草稿预览。没有真实页面被收录、公开发布或部署。
