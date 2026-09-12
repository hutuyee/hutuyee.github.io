# H_aaa 插件 WIki

## 新版文档中心

[打开插件文档中心](https://hutuyee.github.io/docs/)，包括 ShitBot、BiliMusicBridge、AllMusic QQMusic 和 Kugou。历史页面继续保留。

网站采用 VitePress 1.6.4，源文件位于 `site/`，生成文件位于 `docs/`。GitHub Pages 保持 `main` 分支根目录发布。

```text
npm ci
npm run docs:sync -- ../ShitBot
npm run docs:build
```

`docs:sync` 从指定 ShitBot 仓库复制使用文档和像素模板示例。BiliMusicBridge 与音乐源文档维护在 `site/` 的各项目目录，更新时对照对应仓库源码。提交源文件与生成后的 `docs/` 文件即可发布；不要提交 `node_modules/`。

## 联系方式
- QQ: 2139145308
- 微信: qq2139145308

## Wiki
- [MCQQRun](https://hutuyee.github.io/Q%e7%be%a4%e7%bb%91)
