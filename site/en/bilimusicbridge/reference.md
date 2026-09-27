# BiliMusicBridge reference

BiliMusicBridge sends song requests beginning with `点歌` in Bilibili live chat to the default music source in AllMusic 4.2.0 or newer. Results enter the playback queue under AllMusic's own rules.

The Maven project has multiple modules sharing Bilibili protocol and request logic across Bukkit, Folia, BungeeCord, and Velocity:

| Module | Artifact | Platform / responsibility | Compile baseline |
| --- | --- | --- | --- |
| `common` | Internal shared dependency | Bilibili connection, configuration, rate limits, AllMusic compatibility | Java 8 |
| `bukkit` | `BiliMusicBridge-Bukkit-*.jar` | Spigot / Paper / Purpur and other Bukkit servers | Spigot API 1.12.2, Java 8 bytecode |
| `folia` | `BiliMusicBridge-Folia-*.jar` | Folia | Folia API 1.20.1, Java 17 bytecode |
| `bungeecord` | `BiliMusicBridge-BungeeCord-*.jar` | BungeeCord / Waterfall | BungeeCord API 1.16, Java 8 bytecode |
| `velocity` | `BiliMusicBridge-Velocity-*.jar` | Velocity | Velocity API 3.0, Java 11 bytecode |

These are binary compatibility baselines, not restrictions to one Minecraft version. The Bukkit artifact omits `api-version` to cover Bukkit APIs from 1.12.2 onward. Folia builds against the earliest 1.20.1 API and uses the long-standing GlobalRegionScheduler and EntityScheduler. Accepted client/backend Minecraft protocols on proxies still depend on BungeeCord, Velocity, ViaVersion, and the AllMusic version.

## Installation

1. Install AllMusic 4.2.0 or newer for the target platform and at least one music source, such as QQMusic.
2. Set a working `defaultApi` in AllMusic.
3. Choose exactly one BiliMusicBridge artifact: Bukkit for Spigot/Paper/Purpur, Folia for Folia, BungeeCord for BungeeCord/Waterfall, or Velocity for Velocity.
4. Put that JAR in the server or proxy's `plugins` directory.
5. Start once to generate `config.yml` and the default cookie path in the plugin data directory, then set:

```yaml
room-id: 123456
```

6. If cookies are needed, save them to `cookie.json` in the data directory and run:

```text
/bilimusic reload
```

AllMusic and BiliMusicBridge must run in the same process and on the same platform. For example, Velocity AllMusic needs Velocity BiliMusicBridge. A proxy bridge does not forward requests to a Bukkit backend running AllMusic.

## Cookie file

Cookies are optional. `cookie-file` is relative to the plugin data directory. Absolute paths, drive letters, `.`, `..`, and empty paths are rejected and fall back to `cookie.json`.

Supported formats include a browser-exported JSON array:

```json
[
  {"name": "SESSDATA", "value": "..."},
  {"name": "bili_jct", "value": "..."},
  {"name": "DedeUserID", "value": "..."}
]
```

A JSON object:

```json
{
  "SESSDATA": "...",
  "bili_jct": "...",
  "DedeUserID": "..."
}
```

Or a raw Cookie header:

```text
SESSDATA=...; bili_jct=...; DedeUserID=...
```

The plugin does not log cookie values. Automatically obtained `buvid3` / `buvid4` values are saved to `device.properties` in the same data directory. Do not commit real cookies or that file to a public repository.

## Song request format

Defaults:

```text
点歌晴天
点歌 晴天
点歌：晴天
点歌: 晴天
点歌 - 晴天
```

`点歌` is the literal default request prefix; `晴天` is an example song title. Add or change prefixes in `song-request.prefixes`. Each request searches AllMusic's current default source using logic equivalent to:

```java
AllMusicApi.getApiMusic().search(new String[]{keyword})
```

It then reads result `0`, constructs `PlayerAddMusicObj`, triggers the current platform's `onMusicAdd` event, and calls `PlayMusic.addTask(...)`.

## AllMusic compatibility

> [!IMPORTANT]
> This version supports **AllMusic 4.2.0 and newer**. For earlier AllMusic versions, use an older BiliMusicBridge release.

AllMusic exposes music source search APIs but currently has no public method for external requests to join the song queue. To support all four platforms without bundling a platform-specific AllMusic JAR, the shared module:

1. Finds AllMusic through the current platform's plugin manager.
2. Resolves core classes with AllMusic's own class loader to respect Bukkit, BungeeCord, and Velocity isolation.
3. Calls `AllMusicApi.getApiMusic()` and `IMusicApi.search(...)`.
4. Retains the main normal-request checks: queue length, song ID, duplicates, song blacklist, per-player request limits, player blacklist, and an eligible online player.
5. Builds event arguments using the platform console sender, triggers `onMusicAdd`, and enqueues through AllMusic's own task queue.

Reflection is centralized in `common/.../allmusic/AllMusicBridge.java`. Missing AllMusic, an unloaded default source, or incompatible core structure causes explicit rejection rather than enqueueing empty objects.

Livestream viewers are not Minecraft accounts, so direct enqueueing does not charge Vault or proxy economy balances. `respect-player-ban` controls whether AllMusic's player blacklist applies. Song blacklists, duplicate checks, and queue limits always apply.

## Folia scheduling

Folia has no single Bukkit main thread. Its artifact declares:

```yaml
folia-supported: true
```

Shared state, enqueueing after search, and admin commands use GlobalRegionScheduler. Player-specific messages use that player's EntityScheduler. Bilibili HTTP, WebSocket, heartbeats, and source searches stay on the plugin's bounded workers rather than region tick threads.

References:

- [PaperMC: Supporting Paper and Folia](https://docs.papermc.io/paper/dev/folia-support/)
- [PaperMC Folia project](https://github.com/PaperMC/Folia)

## Concurrency

- `BiliMusicBridge-Live`: Bilibili connections, heartbeats, packets, and reconnection.
- `BiliMusicBridge-Search`: bounded single-thread search queue preserving request order.
- Bukkit: final enqueueing returns to the main thread.
- Folia: final enqueueing uses the global scheduler; player messages use entity scheduling.
- BungeeCord / Velocity: final enqueueing uses the proxy scheduler.
- AllMusic's `allmusic_task`: resolves song information and adds it to the actual playlist.

## Commands

```text
/bilimusic status
/bilimusic reconnect
/bilimusic request <song name>
/bilimusic reload
```

Alias: `/bmb`.

Permission: `bilimusic.admin`. Bukkit/Folia grants it to OPs by default; proxies use their permission system or proxy configuration.

## Key configuration

```yaml
song-request:
  prefixes:
    - "点歌"
  queue-capacity: 100
  per-user-cooldown-seconds: 20
  global-cooldown-millis: 1000
  duplicate-window-seconds: 8
  requester-name-mode: "username"
  requester-fixed-name: "Bilibili viewer"

allmusic:
  use-default-api: true
  direct-queue: true
  respect-player-ban: true
  require-online-player: true
```

`requester-name-mode`:

- `username`: use the Bilibili username without a prefix.
- `fixed`: show all livestream requests as `requester-fixed-name`.

## Building

The aggregate project needs JDK 17 or newer to run Maven. Modules produce Java 8, 11, and 17 bytecode:

```bash
mvn package
```

Platform JAR locations (the documented 1.0.1 filenames):

```text
bukkit/target/BiliMusicBridge-Bukkit-1.0.1.jar
folia/target/BiliMusicBridge-Folia-1.0.1.jar
bungeecord/target/BiliMusicBridge-BungeeCord-1.0.1.jar
velocity/target/BiliMusicBridge-Velocity-1.0.1.jar
```

`common` is not directly installable. Never place multiple platform artifacts in one `plugins` directory.
