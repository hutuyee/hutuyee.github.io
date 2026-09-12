# QQMusic

AllMusic_QQMusic 的 API ID 是 `qqmusic`。它支持关键词搜索、歌曲信息、专辑封面、时间轴歌词与 QQ 音乐返回的可用播放地址，也能读取支持的歌曲或歌单链接中的标识。

## 搜索和默认音乐源

按[音乐源安装步骤](index.md#安装)加载 JAR 后：

```text
/music search qqmusic 稻香
```

若 AllMusic 的 `defaultApi` 已设为 `qqmusic`，可以省略 API ID：

```text
/music search 稻香
```

歌曲通常使用 QQ 音乐的 `songmid`，歌单使用数字 ID。当前实现可以从 `songmid`、`disstid` / `dissid` 参数及支持的 song、songdetail、playlist、taoge 路径提取标识。浏览器分享页链接不一定就是音频地址，应交给音乐源解析。

## Cookie 与播放

QQMusic 读取 AllMusic 已加载的 Cookie 列表，即 AllMusic 自己的 `cookie.json` 数据。QQMusic 的 `reload(File)` 没有独立配置文件逻辑，不需要额外创建 `qqmusic.yml`。

需要登录态时，按 AllMusic 的 Cookie 格式保存当前 QQ 音乐账号的数据，再用当前 AllMusic 的重载方式或正常重启加载。没有 Cookie 时仍可能获得公开搜索结果或部分歌曲地址；具体可播放范围取决于 QQ 音乐返回结果和账号权限。扩展不会提供平台未正常授权返回的播放链接。

不要把真实 Cookie 写入本网站的示例或提交到公开仓库。代码中的 `QQSong.debug` 默认是 `false`。

## 从源码构建

把与你的 AllMusic 版本对应的核心 JAR 放入项目的 `libs/`，然后执行：

```text
gradlew.bat build
```

Linux/macOS 使用 `./gradlew build`。产物在 `build/libs/`，当前源码的版本号由 `build.gradle` 决定；不要照抄旧 README 中的固定文件名。编译依赖为 `compileOnly`，运行时由 AllMusic 提供相应核心与公共库。

[QQMusic 源码](https://github.com/hutuyee/AllMusic_QQMusic) · [常见问题](troubleshooting.md)
