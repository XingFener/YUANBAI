# ∞ · 元白 — 未来设计学院空间多感官探索原型

当前默认入口已经更新为“开屏动画 → 启动页 → 六扇门 Hub → 通用探索场景 → 结束页”。六个场景的内容、hotspot 坐标和媒体路径统一维护在 `src/app.js` 顶部的 `SCENES` 配置中。

正式入口默认使用梦核空间探索样式以及半透明、可载入图片的 3D 展柜门框。此前的探索页视觉保留在 `/?style=classic`，旧实体木门版本保留在 `/?doors=classic`。

原有 YUANBAI 本地展柜仍作为兼容体验保留，可通过 `/?view=archive`、`/?view=orbit` 或 `/?case=light-out-of-place` 进入。以下展柜说明继续适用于这些兼容入口。

## 原有本地展柜

当前站内品牌统一为 YUANBAI；原始资源快照保留来源名称，构建时替换最终显示文字。Clone 与继续开发的说明见仓库根目录 README.md。

原站：https://lowkeytp.art/

用户提供的两张截图对应同一个页面的展柜总览与画框展开状态。本项目复用原站公开的 Three.js / React 运行代码、样式、图片和音频，并增加独立的本地入口，保留画框材质、几何形状和交互时间轴。不是原站原始 TypeScript 工程；未获取原站后台或源代码仓库。

## 启动

需要 Node.js 18 或更新版本，无需安装 npm 依赖。

```sh
node scripts/build.mjs
node scripts/serve.mjs
```

也可运行 `npm run build` 和 `npm start`。

- 总览：http://127.0.0.1:4173/
- 展开 LIGHT, OUT OF PLACE：http://127.0.0.1:4173/?case=light-out-of-place
- Orbit 入口：http://127.0.0.1:4173/?view=orbit

## 交互

- 拖动或滚轮浏览七个画框；左右方向键逐个切换。
- 点击侧面的画框使其居中，再点击打开；Enter / 空格也可开合。
- Escape 或点击展开后的门框可关闭。
- 点击作品或 VIEW WORKS 进入组图阅读器。
- 阅读器支持前后切换、缩略图、缩放、故事与音频播放。
- RETURN TO ORBIT 返回原站的环形作品入口。

## 文件

- `src/app.js`：可编辑的页面状态和入口适配代码。
- `src/local.css`：本地补充样式。
- `scripts/build.mjs`：可复现构建与有限的入口补丁，补丁目标不匹配时会报错。
- `scripts/serve.mjs`：仅监听本机 127.0.0.1 的预览服务。
- `reference/`：原站公开资源的下载快照，保持原文件。
- `dist/`：生成的本地可运行站点，所有运行资源均为本地文件。
- `provenance.json`：引用脚本的 SHA-256。
- `docs/research/`：页面状态、交互和组件规格。

作品、品牌与原始运行资源来源于 LOWKEY，未改变其权属。

## 当前交付状态

已生成本地运行版本，构建与 JavaScript 语法检查通过，总览已在浏览器显示。根据用户要求已停止进一步验证；展开入口、完整交互流程及移动端的最终验收等待用户反馈。当前没有发布到公网。
