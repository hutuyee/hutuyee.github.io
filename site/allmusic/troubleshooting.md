# 音乐源常见问题

## 提示找不到音乐 API

确认 JAR 位于 AllMusic 实际数据目录的 `api/` 中，并正常重启加载。`qqmusic` 与 `kugou` 都是小写 API ID。如果日志中没有加载成功的记录，先处理目录、JAR 或接口版本问题，再修改 `defaultApi`。

## 出现 NoSuchMethodError 或 ClassNotFoundException

音乐源依赖当前 AllMusic 核心接口。使用与运行版本匹配的发布包，或把对应核心 JAR 放入音乐源源码的 `libs/` 后重新构建。不要把 AllMusic 核心再打包到音乐源中，也不要混用多个平台的 AllMusic 安装包。

## 搜索有结果，播放却失败

搜索结果只表示找到歌曲，播放还需要取得有效音频地址。检查 Cookie 是否过期、账号权限是否满足，以及服务端能否连接音乐平台。歌词或封面成功不表示音频地址一定可用。两种扩展均依赖平台正常返回的免费或已授权资源。

## 游戏里没有声音

确认玩家客户端安装了与服务端匹配的 AllMusic 模组，并检查玩家是否处于静音、黑名单或被排除的服务器。先按 AllMusic 本身的命令和播放配置排查，再处理 BiliMusicBridge 的直播连接。

## 两种音乐源同时使用时如何设置 Cookie

QQMusic 使用 AllMusic 加载的 Cookie 列表。Kugou 可以通过 `ALLMUSIC_KUGOU_COOKIE` 独立配置，以减少不同平台同名 Cookie 之间的混淆。具体优先级见 [Kugou 文档](kugou.md#cookie-来源)。

## 如何反馈问题

提供运行平台、Java 与 AllMusic 版本、音乐源版本、相关错误日志，以及不含账号信息的歌曲标识。QQMusic 问题提交到 [AllMusic_QQMusic Issues](https://github.com/hutuyee/AllMusic_QQMusic/issues)，酷狗问题提交到 [AllMusic_Kugou Issues](https://github.com/hutuyee/AllMusic_Kugou/issues)。
