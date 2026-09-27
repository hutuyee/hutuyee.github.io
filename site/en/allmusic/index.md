# AllMusic music sources

QQMusic and Kugou provide music source APIs for AllMusic. AllMusic handles player commands, the playback queue, and client communication. Sources handle search, song information, playback URLs, covers, and lyrics.

| Source | API ID | Source code | Download |
| --- | --- | --- | --- |
| QQ Music | `qqmusic` | [AllMusic_QQMusic](https://github.com/hutuyee/AllMusic_QQMusic) | [Releases](https://github.com/hutuyee/AllMusic_QQMusic/releases) |
| Kugou | `kugou` | [AllMusic_Kugou](https://github.com/hutuyee/AllMusic_Kugou) | [Releases](https://github.com/hutuyee/AllMusic_Kugou/releases) |

## Installation

1. Install [AllMusic server software](https://github.com/Coloryr/AllMusic) for your platform and the matching client mod for players who want to listen.
2. Start once to generate AllMusic's data directory.
3. Stop the server or proxy and put the source JAR in **`api/` inside the AllMusic data directory**. A common upstream path is `allmusic/api/`; use the actual generated directory and platform logs. These sources are not standalone Bukkit plugins.
4. Start again and confirm that AllMusic recognizes `qqmusic` or `kugou`.
5. Search with an explicit API ID, for example `/music search qqmusic 晴天` or `/music search kugou 晴天`.

Both sources can load together. `defaultApi` chooses which source is used when its ID is omitted. Change this entry in AllMusic's `config.json` while preserving the other settings:

```json
{
  "defaultApi": "qqmusic"
}
```

Use `"kugou"` for Kugou. Restart normally after adding or replacing a source JAR. For configuration-only changes, use the reload procedure supported by your AllMusic version.

## Version compatibility

These extensions depend on AllMusic's `IMusicApi` interface and core objects and target Java 8 bytecode. Actual runtime requirements also depend on AllMusic, the server, and the proxy. For `NoSuchMethodError` or `ClassNotFoundException`, match the AllMusic core version used by the extension or rebuild against your core.

The [QQMusic](qqmusic.md) and [Kugou](kugou.md) guides cover song identifiers, cookies, and builds. For livestream chat requests, also install [BiliMusicBridge](../bilimusicbridge/index.md) on the same platform.
