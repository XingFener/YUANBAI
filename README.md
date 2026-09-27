# ∞ · 元白

> 走进元白，感知无限

“元白楼”未来设计学院空间多感官探索网站的第一版可运行交互原型。体验从未知空间开始，通过触觉、听觉、嗅觉与视觉线索逐步认识物体，并让建筑场景逐层显现。

## 本地运行

需要 Node.js 18 或更新版本。项目没有需要安装的 npm 依赖，也不需要 API Key、账号或 `.env`。

~~~sh
cd lowkey-clone
npm run build
npm start
~~~

如果系统只有 Node.js：

~~~sh
cd lowkey-clone
node scripts/build.mjs
node scripts/serve.mjs
~~~

打开 <http://127.0.0.1:4173/>。

默认版本使用梦核空间探索样式与半透明、可载入图片的 3D 门框。需要查看此前的探索页视觉时，可打开 <http://127.0.0.1:4173/?style=classic>；需要查看实体木门版本时，可打开 <http://127.0.0.1:4173/?doors=classic>。

## 当前体验流程

~~~text
开屏动画 → 启动页 → 六扇门 Hub → 通用 Scene → 依次发现 Hotspot
→ 感知 Card / 声音交互 → 场景逐步 Reveal → 返回 Hub → 结束页
~~~

场景完成状态保存在浏览器 `localStorage` 中。

## 项目结构

| 路径 | 用途 |
| --- | --- |
| `lowkey-clone/src/app.js` | 页面状态、通用组件和六个场景的统一数据配置 |
| `lowkey-clone/src/local.css` | 启动页、门、场景、Card、Reveal 和响应式样式 |
| `lowkey-clone/scripts/build.mjs` | 生成本地可运行站点并复制必要素材 |
| `lowkey-clone/scripts/serve.mjs` | 仅监听 `127.0.0.1` 的本地服务器 |
| `lowkey-clone/reference/` | 构建所需的公开运行快照、图片和音频 |
| `lowkey-clone/dist/` | 构建产物，不提交到 Git |

六个场景共用一套 Hub、Scene、Hotspot、Card、Reveal 和进度系统。

## 修改场景与素材

场景配置位于 `lowkey-clone/src/app.js` 顶部的 `SCENES`。每个场景的 `doorImage` 控制门框中的图片；每个 hotspot 的 `x`、`y` 是相对画面的百分比坐标，并可配置 `background`、`image` 和 `audioSrc`。

- 图片放入 `lowkey-clone/reference/archive/`，页面路径写作 `/archive/...`
- 音频放入 `lowkey-clone/reference/audio/`，页面路径写作 `/audio/...`
- 修改源码后重新构建
- 不要直接编辑 `lowkey-clone/dist/`

## 使用 Codex 继续开发

Clone 后，在 Codex 中打开仓库根目录并先阅读 `AGENTS.md`、本 README、`lowkey-clone/README.md` 和 `lowkey-clone/src/app.js`。

主要开发入口是 `lowkey-clone/src/app.js` 和 `lowkey-clone/src/local.css`。这是基于公开、已编译 React/Three.js 运行资源构建的本地适配器，并非原站的 Next.js/TypeScript 源码工程；不要用新的脚手架替换它。

## 兼容入口与来源说明

旧展柜体验仍保留在 `/?view=archive`、`/?view=orbit` 和 `/?case=light-out-of-place`。

项目保留了原始公开运行资源和媒体的来源记录。`lowkey-clone/provenance.json` 记录原始脚本摘要。原始媒体和第三方运行代码的权属仍归各自权利人，本仓库不声称拥有原站原创素材或原始 TypeScript 源码。
