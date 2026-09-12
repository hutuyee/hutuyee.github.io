---
layout: home
hero:
  name: H_aaa 插件文档
  text: 把群聊、直播与音乐带进 Minecraft
  tagline: 从第一次安装到日常管理，在这里找到配置示例、命令说明和开发接口。
  image:
    src: /logo.svg
    alt: H_aaa
  actions:
    - theme: brand
      text: 开始使用 ShitBot
      link: /shitbot/installation
    - theme: alt
      text: 配置直播点歌
      link: /bilimusicbridge/
    - theme: alt
      text: 安装音乐源
      link: /allmusic/
features:
  - title: ShitBot
    details: OneBot v11 群服互通、QQ 绑定与白名单、在线图、背包查询、图片模板和插件 API。
    link: /shitbot/
    linkText: 阅读 ShitBot 文档
  - title: BiliMusicBridge
    details: 将 B 站直播弹幕点歌接入 AllMusic 的搜索和队列，支持 Bukkit、Folia 与两种代理平台。
    link: /bilimusicbridge/
    linkText: 阅读直播点歌文档
  - title: QQMusic 与 Kugou
    details: 为 AllMusic 添加 QQ 音乐和酷狗音乐搜索、歌曲信息、封面、歌词与可用播放地址。
    link: /allmusic/
    linkText: 阅读音乐源文档
---

## 从这里开始

| 你想做的事 | 对应文档 |
| --- | --- |
| 连接 Minecraft 和 QQ 群 | [ShitBot 安装与部署](./shitbot/installation.md) |
| 允许没有 QQ 的玩家进入服务器 | [白名单管理](./shitbot/api.md#管理员命令) |
| 用自己的图片放置文字与变量 | [像素坐标模板](./shitbot/pixel-templates.md) |
| 让直播观众通过弹幕点歌 | [BiliMusicBridge 快速开始](./bilimusicbridge/index.md) |
| 为 AllMusic 选择 QQ 音乐或酷狗 | [音乐源安装](./allmusic/index.md) |

ShitBot 文档包含当前源码中的新功能，下载安装包时请使用包含相应功能的版本。音乐插件与音乐源要匹配 AllMusic 的接口版本，具体要求见各自安装页。

[文档来源与更新](./sources.md)
