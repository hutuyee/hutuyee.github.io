# 文档来源与更新

本站收录 H_aaa 的 Minecraft 插件与音乐源文档，使用 VitePress 构建，参考 [AkariLevelDocs](https://github.com/CPJiNan/AkariLevelDocs) 的文档组织方式，按项目提供导航、目录和站内搜索。

## 内容来源

| 文档 | 主要来源 |
| --- | --- |
| ShitBot | [ShitBot 的 docs 目录](https://github.com/hutuyee/ShitBot/tree/main/docs)与对应源码 |
| BiliMusicBridge | [项目 README、默认配置和源码](https://github.com/hutuyee/BiliMusicBridge) |
| QQMusic | [AllMusic_QQMusic 源码](https://github.com/hutuyee/AllMusic_QQMusic) |
| Kugou | [AllMusic_Kugou 源码](https://github.com/hutuyee/AllMusic_Kugou) |
| AllMusic 加载目录与默认音乐源 | [AllMusic 上游说明与核心代码](https://github.com/Coloryr/AllMusic) |

本轮文档整理日期为 2026-09-12。文档描述对应源码能力，下载的历史 Release 可能尚未包含新接口。安装时以下载包版本、平台和对应变更记录为准。

音乐源旧 README 中的固定 JAR 文件名和部分 Debug 默认值已经落后于源码；本网站以实际 `build.gradle`、入口实现与默认字段为准。

## 网站维护

网站源码位于 `hutuyee.github.io` 仓库的 `site/`，生成的静态文件位于 `docs/`，公开地址是 `https://hutuyee.github.io/docs/`。访问网站首页 `https://hutuyee.github.io/` 会自动进入文档中心。

ShitBot 文档更新后，在网站仓库执行 `npm run docs:sync -- <ShitBot仓库路径>` 同步，再使用 `npm run docs:build` 生成公开文件。将源码和生成文件一起提交到 `main`，现有 GitHub Pages 会继续按根目录发布。站点生成与路径配置参考 [VitePress 部署文档](https://vitepress.dev/guide/deploy)。
