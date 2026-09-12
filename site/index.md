---
layout: home
hero:
  name: H_aaa 插件文档
  text: 群服互通、直播点歌和音乐源
  tagline: 几个 Minecraft 插件的使用说明。第一次装插件，或者想查配置、找命令，都可以从这里开始。
  image:
    src: /avatar.jpg
    alt: H_aaa 的头像
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
    details: 把 QQ 群和服务器连起来，同步聊天、绑定账号、管理白名单，还能查在线玩家和背包。
    link: /shitbot/
    linkText: 阅读 ShitBot 文档
  - title: BiliMusicBridge
    details: 在 B 站直播间发弹幕点歌，歌曲会加入 AllMusic 队列，在游戏里播放。
    link: /bilimusicbridge/
    linkText: 阅读直播点歌文档
  - title: QQMusic 与 Kugou
    details: 给 AllMusic 加上 QQ 音乐和酷狗音乐，用你习惯的音乐源搜索和点歌。
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

插件版本不同，配置和命令也可能有差别。下载时先看对应项目的 Release 说明；音乐插件还需要留意 AllMusic 的版本要求。

[关于文档与反馈](./sources.md)
