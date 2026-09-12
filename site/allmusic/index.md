# AllMusic 外置音乐源

QQMusic 与 Kugou 为 AllMusic 提供音乐源接口。AllMusic 负责玩家命令、播放队列和客户端通信，音乐源负责搜索、歌曲信息、播放地址、封面与歌词。

| 音乐源 | API ID | 源码 | 下载 |
| --- | --- | --- | --- |
| QQ 音乐 | `qqmusic` | [AllMusic_QQMusic](https://github.com/hutuyee/AllMusic_QQMusic) | [Releases](https://github.com/hutuyee/AllMusic_QQMusic/releases) |
| 酷狗音乐 | `kugou` | [AllMusic_Kugou](https://github.com/hutuyee/AllMusic_Kugou) | [Releases](https://github.com/hutuyee/AllMusic_Kugou/releases) |

## 安装

1. 安装与你的平台匹配的 [AllMusic 服务端](https://github.com/Coloryr/AllMusic)，并为需要听歌的玩家安装匹配的客户端模组。
2. 正常启动一次，让 AllMusic 创建数据目录。
3. 停止服务端或代理，把音乐源 JAR 放入 **AllMusic 数据目录中的 `api/`**。上游常见路径为 `allmusic/api/`，以当前平台日志与实际生成的目录为准。音乐源不是独立 Bukkit 插件。
4. 再次启动，检查 AllMusic 是否识别出 `qqmusic` 或 `kugou`。
5. 使用明确的 API ID 搜索，例如 `/music search qqmusic 晴天` 或 `/music search kugou 晴天`。

两种音乐源可以同时加载，`defaultApi` 决定省略音乐源 ID 时使用哪一个。修改 AllMusic 的 `config.json` 中这一项，保留其他原有配置：

```json
{
  "defaultApi": "qqmusic"
}
```

使用酷狗时改为 `"kugou"`。添加或替换音乐源 JAR 后正常重启；单纯修改配置的重载方式以当前 AllMusic 版本为准。

## 版本配套

这些扩展依赖 AllMusic 的 `IMusicApi` 接口与核心对象，使用 Java 8 目标字节码；实际 Java 要求由运行的 AllMusic、服务端和代理共同决定。出现 `NoSuchMethodError`、`ClassNotFoundException` 等情况时，应匹配音乐源所用的 AllMusic 核心版本，或使用对应核心重新构建。

[QQMusic 说明](qqmusic.md)与 [Kugou 说明](kugou.md)介绍了歌曲标识、Cookie 和构建方式。如果还需要直播弹幕点歌，再安装同一平台的 [BiliMusicBridge](../bilimusicbridge/index.md)。
