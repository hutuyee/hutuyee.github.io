# Kugou

AllMusic_Kugou 的 API ID 是 `kugou`。它提供酷狗关键词搜索、歌曲信息、封面、时间轴歌词和平台返回的可用播放地址，并支持从部分分享链接读取歌曲或歌单标识。

## 搜索和默认音乐源

按[音乐源安装步骤](index.md#安装)加载后：

```text
/music search kugou 稻香
```

AllMusic 的 `defaultApi` 为 `kugou` 时可省略 API ID。酷狗歌曲常用 32 位十六进制 `hash`，歌单使用数字 ID。当前实现识别 `hash`、`specialid` / `special_id` 参数和支持的歌单路径；链接中的 `album_id` 与 `album_audio_id` 会作为歌曲解析信息保留。

## Cookie 来源

默认从 AllMusic 已加载的 `cookie.json` 中读取酷狗 Cookie。当前源码也支持独立传入酷狗 Cookie，按以下优先级选择：

1. JVM 系统属性 `allmusic.kugou.cookie`。
2. 环境变量 `ALLMUSIC_KUGOU_COOKIE`。
3. 源码中的 Cookie 覆盖值（通常保持为空）。
4. 没有覆盖值时，使用 AllMusic 的 Cookie 列表。

独立 Cookie 便于同时使用不同音乐平台。应通过自己的服务启动配置管理真实值；修改环境变量需要重启服务端或代理。Cookie 有效性、歌曲可播放范围和所需设备字段以酷狗接口实际返回为准。缺少 Android 播放流程需要的 `mid` / `dfid` 时，日志会要求重新导出 Cookie。

扩展的 `reload(File)` 没有独立配置文件逻辑。代码中的 `KugouSong.debug` 当前默认是 `false`，旧 README 所述“默认开启”不适用于当前源码。

## 从源码构建

把匹配 AllMusic 版本的核心 JAR 放进项目 `libs/`，执行：

```text
gradlew.bat build
```

Linux/macOS 使用 `./gradlew build`，产物在 `build/libs/`。版本号以 `build.gradle` 为准；运行时需要 AllMusic 提供核心与公共库。

[Kugou 源码](https://github.com/hutuyee/AllMusic_Kugou) · [常见问题](troubleshooting.md)
