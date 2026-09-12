# BiliMusicBridge

BiliMusicBridge 把 B 站直播间中以“点歌”开头的弹幕交给 AllMusic 默认音乐源搜索，并将第一条搜索结果加入 AllMusic 队列。它支持 Bukkit、Folia、BungeeCord 和 Velocity，AllMusic 与桥接插件需要处于同一进程和平台。

## 安装前准备

- 对应平台的 AllMusic **4.2.0 或更高版本**。
- 至少一个可用的 AllMusic 音乐源，例如 [QQMusic](../allmusic/qqmusic.md) 或 [Kugou](../allmusic/kugou.md)，并设置好 `defaultApi`。
- 与 AllMusic 配套的客户端音乐模组，供玩家听到音乐。
- 直播间号，以及匹配运行平台的 [BiliMusicBridge 安装包](https://github.com/hutuyee/BiliMusicBridge/releases)。

| 运行平台 | 安装包 | 插件字节码要求 |
| --- | --- | --- |
| Spigot / Paper / Purpur | `BiliMusicBridge-Bukkit-*.jar` | Java 8+ |
| Folia | `BiliMusicBridge-Folia-*.jar` | Java 17+ |
| BungeeCord / Waterfall | `BiliMusicBridge-BungeeCord-*.jar` | Java 8+ |
| Velocity | `BiliMusicBridge-Velocity-*.jar` | Java 11+ |

服务端、代理和 AllMusic 自身的 Java 要求也需要满足。Folia 使用专用包；一个实例只放入一个平台包。

## 第一次连接

1. 先安装 AllMusic 与音乐源，在游戏里确认自己的点歌配置可用。
2. 将 BiliMusicBridge 平台包放入 `plugins/`，启动生成配置。
3. 在插件数据目录的 `config.yml` 填写直播间号：

```yaml
room-id: 123456
auto-connect: true
cookie-file: "cookie.json"
```

4. 执行 `/bilimusic reload`，再用 `/bilimusic status` 查看状态。
5. 直播间发送 `点歌 晴天`。默认要求游戏中存在可播放玩家。

默认也识别 `点歌晴天`、`点歌：晴天`、`点歌: 晴天` 和 `点歌 - 晴天`。插件使用 AllMusic 默认音乐源的第一条结果，直播观众无需提供 Minecraft 账号。

## 日常管理

| 命令 | 用途 |
| --- | --- |
| `/bilimusic status` | 查看连接与插件状态 |
| `/bilimusic reconnect` | 重新连接直播间 |
| `/bilimusic request <歌曲名>` | 管理员直接提交一次点歌请求 |
| `/bilimusic reload` | 重新读取配置 |

命令别名为 `/bmb`，权限为 `bilimusic.admin`。

限流、Cookie、显示名称、队列规则和配置示例见[完整手册](reference.md)，无法连接或点歌失败时见[常见问题](troubleshooting.md)。
