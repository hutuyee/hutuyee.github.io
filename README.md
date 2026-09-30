# H_aaa 插件文档

**简体中文** | [English](README.en.md)

[打开插件文档中心](https://hutuyee.github.io/)，查阅 ShitBot、BiliMusicBridge、AllMusic QQMusic 和 Kugou 的安装、配置与开发文档。

## 网站维护

网站采用 VitePress 1.6.4，源文件位于 `site/`，生成文件位于 `docs/`。GitHub Pages 使用 `main` 分支根目录发布，首页自动跳转到 `/docs/`。

中文页面沿用 `/docs/` 下的原地址，英文页面位于 `/docs/en/`。桌面导航栏和移动端菜单中的语言入口会切换到同一篇文档的另一种语言。首页、导航、搜索提示和各项目手册均提供两种语言。

```text
npm ci
npm run docs:sync -- ../ShitBot
npm run docs:build
```

`docs:sync` 从指定 ShitBot 仓库的 `docs/*.md` 与 `docs/en/*.md` 复制中英文手册，分别写入 `site/shitbot/` 与 `site/en/shitbot/`，并复制共用的像素模板示例。脚本将仓库内文档链接转换为对应网站地址，移除已由网站语言菜单替代的页首语言链接。

BiliMusicBridge 与音乐源中文文档维护在 `site/` 的各项目目录，英文文档维护在 `site/en/` 的对应目录。更新时对照对应仓库源码，同步修改两种语言；新增页面时保持两种语言的文件名一致，并更新 `site/.vitepress/config.mts` 的双语导航。首页和关于页也应成对维护。

`docs:build` 生成用于发布的静态文件。将源文件与生成后的 `docs/` 文件一起提交并推送到 `main` 后，由 GitHub Pages 发布；不要提交 `node_modules/`。

## 联系方式

- QQ: 2139145308
- 微信: hutuyee
