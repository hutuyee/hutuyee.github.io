# BiliMusicBridge

BiliMusicBridge searches AllMusic's default music source for Bilibili live chat messages beginning with `点歌` (“request a song”) and adds the first result to AllMusic's queue. It supports Bukkit, Folia, BungeeCord, and Velocity. AllMusic and the bridge must run in the same process and on the same platform.

## Before installation

- AllMusic **4.2.0 or newer** for your platform.
- At least one working source, such as [QQMusic](../allmusic/qqmusic.md) or [Kugou](../allmusic/kugou.md), with `defaultApi` configured.
- A matching AllMusic client mod for players to hear music.
- A live room ID and the [BiliMusicBridge package](https://github.com/hutuyee/BiliMusicBridge/releases) matching your platform.

| Platform | Package | Plugin bytecode requirement |
| --- | --- | --- |
| Spigot / Paper / Purpur | `BiliMusicBridge-Bukkit-*.jar` | Java 8+ |
| Folia | `BiliMusicBridge-Folia-*.jar` | Java 17+ |
| BungeeCord / Waterfall | `BiliMusicBridge-BungeeCord-*.jar` | Java 8+ |
| Velocity | `BiliMusicBridge-Velocity-*.jar` | Java 11+ |

Also satisfy the Java requirements of your server, proxy, and AllMusic. Folia needs its dedicated package. Install only one platform package per instance.

## First connection

1. Install AllMusic and a source first, and confirm your in-game song requests work.
2. Put the BiliMusicBridge platform JAR in `plugins/` and start to generate configuration.
3. Set the room ID in the plugin data directory's `config.yml`:

```yaml
room-id: 123456
auto-connect: true
cookie-file: "cookie.json"
```

4. Run `/bilimusic reload`, then `/bilimusic status`.
5. Send `点歌 晴天` in the live room. By default, at least one eligible player must be online in the game.

The defaults also recognize `点歌晴天`, `点歌：晴天`, `点歌: 晴天`, and `点歌 - 晴天`. The plugin uses the default source's first search result. Viewers do not need a Minecraft account. You can change request prefixes in `song-request.prefixes`; changing the documentation language does not change these defaults.

## Everyday administration

| Command | Purpose |
| --- | --- |
| `/bilimusic status` | Show connection and plugin status |
| `/bilimusic reconnect` | Reconnect to the live room |
| `/bilimusic request <song name>` | Submit an administrator song request |
| `/bilimusic reload` | Reload configuration |

Alias: `/bmb`. Permission: `bilimusic.admin`.

See the [full reference](reference.md) for rate limits, cookies, requester names, queue rules, and configuration examples. See [Troubleshooting](troubleshooting.md) for connection or request failures.
