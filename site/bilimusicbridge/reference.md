# BiliMusicBridge

BiliMusicBridge 把 B 站直播弹幕中的“点歌”请求交给 AllMusic 4.2.0 及以上版本的默认音乐源搜索，并按 AllMusic 自身的队列规则加入播放列表。

项目现在是 Maven 多模块结构，同一套 B 站协议与点歌逻辑支持 Bukkit、Folia、BungeeCord 和 Velocity：

| 模块 | 产物 | 目标平台 | 编译基线 |
| --- | --- | --- | --- |
| `common` | 内部公共依赖 | B 站连接、配置、限流、AllMusic 兼容层 | Java 8 |
| `bukkit` | `BiliMusicBridge-Bukkit-*.jar` | Spigot / Paper / Purpur 等 Bukkit 服务端 | Spigot API 1.12.2、Java 8 字节码 |
| `folia` | `BiliMusicBridge-Folia-*.jar` | Folia | Folia API 1.20.1、Java 17 字节码 |
| `bungeecord` | `BiliMusicBridge-BungeeCord-*.jar` | BungeeCord / Waterfall | BungeeCord API 1.16、Java 8 字节码 |
| `velocity` | `BiliMusicBridge-Velocity-*.jar` | Velocity | Velocity API 3.0、Java 11 字节码 |

这些版本是二进制兼容的设计基线，不是只允许表中单一 MC 版本。Bukkit 产物没有声明 `api-version`，用于覆盖 1.12.2 及后续 Bukkit API；Folia 产物以 Folia 最早的 1.20.1 API 编译，并只使用长期保留的 GlobalRegionScheduler 与 EntityScheduler；代理端可接受的客户端/后端 MC 协议版本仍由 BungeeCord、Velocity、ViaVersion 和对应的 AllMusic 版本决定。

## 安装

1. 先在目标平台安装对应平台的 AllMusic 4.2.0 或更高版本，以及至少一个音乐源，例如 QQMusic。
2. 在 AllMusic 配置中设置可用的 `defaultApi`。
3. 四个 BiliMusicBridge 平台产物中只选择一个：
   - Spigot、Paper、Purpur：使用 Bukkit 产物。
   - Folia：使用 Folia 产物，不要使用 Bukkit 产物。
   - BungeeCord、Waterfall：使用 BungeeCord 产物。
   - Velocity：使用 Velocity 产物。
4. 把选择的 jar 放入该服务端或代理端的 `plugins` 目录。
5. 启动一次以生成插件数据目录中的 `config.yml` 和默认 Cookie 路径，然后填写直播间号：

```yaml
room-id: 123456
```

6. 如需 Cookie，把它写入数据目录内的 `cookie.json`，然后执行：

```text
/bilimusic reload
```

AllMusic 和 BiliMusicBridge 必须安装在同一个进程、同一个平台中。例如使用 Velocity 版 AllMusic 时，应同时使用 Velocity 版 BiliMusicBridge；代理版插件不是把请求转发给某一个装有 Bukkit AllMusic 的后端服。

## Cookie 文件

Cookie 不是必填项。`cookie-file` 是相对于插件数据目录的路径；绝对路径、盘符、`.`、`..` 和空路径会被拒绝并回退到 `cookie.json`。

支持以下格式。

浏览器导出的 JSON 数组：

```json
[
  {"name": "SESSDATA", "value": "..."},
  {"name": "bili_jct", "value": "..."},
  {"name": "DedeUserID", "value": "..."}
]
```

JSON 对象：

```json
{
  "SESSDATA": "...",
  "bili_jct": "...",
  "DedeUserID": "..."
}
```

原始 Cookie Header：

```text
SESSDATA=...; bili_jct=...; DedeUserID=...
```

插件不会在日志中输出 Cookie 值。自动获取的 `buvid3` / `buvid4` 会写入同一数据目录的 `device.properties`；不要把真实 Cookie 或 `device.properties` 提交到公开仓库。

## 点歌格式

默认支持：

```text
点歌晴天
点歌 晴天
点歌：晴天
点歌: 晴天
点歌 - 晴天
```

前缀可以在 `song-request.prefixes` 中增加或修改。每条请求会调用 AllMusic 当前默认音乐源等价于以下公开 API 的搜索逻辑：

```java
AllMusicApi.getApiMusic().search(new String[]{keyword})
```

然后读取搜索结果第 `0` 项，构造 `PlayerAddMusicObj`，触发当前平台的 `onMusicAdd` 事件并调用 `PlayMusic.addTask(...)`。

## AllMusic 兼容方式

> [!IMPORTANT]
> 当前版本仅支持 **AllMusic 4.2.0 及以上版本**，不再支持 AllMusic 4.2.0 以下版本。如需搭配旧版 AllMusic 使用，请下载 BiliMusicBridge 的低版本 Release。

AllMusic 公开了音乐源搜索 API，但当前没有公开的“外部请求加入点歌队列”方法。为了同时适配四个平台、避免把某一个 AllMusic 平台 jar 打进插件，公共模块在运行时执行以下流程：

1. 通过当前平台的插件管理器查找 AllMusic 实例。
2. 使用 AllMusic 自己的插件类加载器解析核心类，避免 Bukkit、BungeeCord、Velocity 的插件类加载隔离问题。
3. 调用 `AllMusicApi.getApiMusic()` 与 `IMusicApi.search(...)`。
4. 在入队前保留 AllMusic 普通点歌的主要检查：队列长度、歌曲 ID、重复歌曲、歌曲黑名单、玩家点歌上限、玩家黑名单和是否存在可播放玩家。
5. 使用当前平台的控制台发送者构造事件参数，触发 AllMusic 的 `onMusicAdd`，最后加入 AllMusic 自己的任务队列。

反射查找集中在 `common/.../allmusic/AllMusicBridge.java`。找不到 AllMusic、默认音乐源未加载或核心结构不兼容时，请求会被明确拒绝，不会用空对象继续入队。

直播观众不是 Minecraft 账号，因此直接入队不会扣除 Vault 或代理端经济。`respect-player-ban` 可以控制是否套用 AllMusic 的玩家黑名单；歌曲黑名单、重复歌曲和队列长度始终遵守。

## Folia 调度

Folia 没有 Bukkit 的单一主线程。Folia 产物声明了：

```yaml
folia-supported: true
```

公共状态、AllMusic 搜索完成后的入队和管理命令通过 `GlobalRegionScheduler` 执行；发送给具体玩家的消息通过玩家自己的 `EntityScheduler` 执行。B 站 HTTP、WebSocket、心跳与音乐源搜索继续运行在插件自己的有界工作线程中，不占用区域 tick 线程。

参考：

- [PaperMC：Supporting Paper and Folia](https://docs.papermc.io/paper/dev/folia-support/)
- [PaperMC Folia 项目说明](https://github.com/PaperMC/Folia)

## 并发模型

- `BiliMusicBridge-Live`：B 站连接、心跳、收包与重连。
- `BiliMusicBridge-Search`：有界单线程搜索队列，保持点歌顺序。
- Bukkit：最终入队回到 Bukkit 主线程。
- Folia：最终入队进入全局区域调度器，玩家消息进入实体调度器。
- BungeeCord / Velocity：最终入队交给代理平台任务调度器。
- AllMusic 自己的 `allmusic_task`：解析歌曲信息并加入实际播放列表。

## 命令

```text
/bilimusic status
/bilimusic reconnect
/bilimusic request <歌曲名>
/bilimusic reload
```

别名：`/bmb`

权限：`bilimusic.admin`。Bukkit/Folia 默认只授予 OP；代理端交给对应权限系统或代理配置管理。

## 配置重点

```yaml
song-request:
  prefixes:
    - "点歌"
  queue-capacity: 100
  per-user-cooldown-seconds: 20
  global-cooldown-millis: 1000
  duplicate-window-seconds: 8
  requester-name-mode: "username"
  requester-fixed-name: "B站观众"

allmusic:
  use-default-api: true
  direct-queue: true
  respect-player-ban: true
  require-online-player: true
```

`requester-name-mode`：

- `username`：使用 B 站用户名，不添加前缀。
- `fixed`：所有直播点歌统一显示为 `requester-fixed-name`。

## 构建

整个项目需要 JDK 17 或更高版本执行 Maven；各模块会分别生成 Java 8、Java 11 和 Java 17 目标字节码：

```bash
mvn package
```

平台 jar 分别位于：

```text
bukkit/target/BiliMusicBridge-Bukkit-1.0.1.jar
folia/target/BiliMusicBridge-Folia-1.0.1.jar
bungeecord/target/BiliMusicBridge-BungeeCord-1.0.1.jar
velocity/target/BiliMusicBridge-Velocity-1.0.1.jar
```

`common` 不是可直接安装的插件。部署时不要把多个平台产物同时放进同一个 `plugins` 目录。
