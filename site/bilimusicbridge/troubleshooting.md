# BiliMusicBridge 常见问题

## 显示 AllMusic 不可用

确认是 AllMusic 4.2.0 或更高版本，并与 BiliMusicBridge 安装在同一个实例。代理版 BiliMusicBridge 不会调用另一个 Bukkit 子服里的 AllMusic。检查 AllMusic 日志中音乐源是否加载成功，以及 `defaultApi` 是否等于对应音乐源 ID。

## 弹幕来了但没有点歌

检查 `room-id`、`song-request.prefixes` 和 `/bilimusic status`。默认前缀是“点歌”，消息需要以此前缀开头；空关键词或超出 `max-keyword-length` 的内容不会进入正常点歌流程。

默认单个 B 站账号冷却 20 秒，全局最小间隔 1000 毫秒，同一关键词 8 秒内去重，待处理队列容量为 100。修改这些值后执行 `/bilimusic reload`。如果默认配置没有向玩家广播失败原因，可以通过控制台日志查看拒绝原因，或按需开启 `messages.broadcast-failure`。

## 提示没有玩家、重复歌曲或队列已满

默认 `allmusic.require-online-player: true`，需要在线且可播放音乐的玩家。插件保留 AllMusic 自己的队列长度、重复歌曲、歌曲黑名单与玩家点歌上限等检查。直播观众不是 Minecraft 账号，直接入队不会扣除 Vault 或代理经济。

## Cookie 放在哪里

Cookie 为可选项。文件放在当前 BiliMusicBridge 插件的数据目录中，默认文件名 `cookie.json`；支持浏览器导出的数组、JSON 对象或原始 Cookie Header。路径必须在插件数据目录内。Cookie 与自动生成的 `device.properties` 属于运行数据，不应放进公开文档。

## 搜索到了，但玩家听不到

先检查 AllMusic 客户端模组与服务端版本是否匹配，以及该音乐源是否能返回可用播放地址。BiliMusicBridge 负责接收弹幕、搜索和入队，实际解析与播放仍由 AllMusic 和音乐源完成。进一步排查见[音乐源常见问题](../allmusic/troubleshooting.md)。
