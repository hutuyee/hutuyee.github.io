# Kugou

AllMusic_Kugou uses the API ID `kugou`. It supports Kugou keyword search, song information, covers, timed lyrics, and available playback URLs returned by the platform. It can extract song or playlist identifiers from some share links.

## Search and default source

After following the [installation steps](index.md#installation):

```text
/music search kugou 稻香
```

Omit the API ID when AllMusic's `defaultApi` is `kugou`. Kugou songs commonly use a 32-character hexadecimal `hash`; playlists use numeric IDs. The implementation recognizes `hash`, `specialid` / `special_id` parameters and supported playlist paths. Link parameters `album_id` and `album_audio_id` are retained for song resolution.

## Cookie sources

By default, Kugou uses AllMusic's loaded `cookie.json`. It also supports a separate cookie, selected in this order:

1. JVM system property `allmusic.kugou.cookie`.
2. Environment variable `ALLMUSIC_KUGOU_COOKIE`.
3. The source-code cookie override, normally empty.
4. AllMusic's cookie list when no override is present.

A separate cookie helps when using different music platforms together. Manage real values through your service startup configuration. Restart the server or proxy after changing environment variables. Cookie validity, playable songs, and required device fields depend on Kugou's responses. If `mid` / `dfid` required by Android playback are missing, the log asks you to export cookies again.

The extension's `reload(File)` has no separate configuration-file logic. `KugouSong.debug` currently defaults to `false`; older README claims that it is enabled by default do not apply.

## Build from source

Put the core JAR matching your AllMusic version in `libs/`, then run:

```text
gradlew.bat build
```

On Linux/macOS, use `./gradlew build`. Output is in `build/libs/`, with the version from `build.gradle`. AllMusic must supply the core and shared libraries at runtime.

[Kugou source](https://github.com/hutuyee/AllMusic_Kugou) · [Troubleshooting](troubleshooting.md)
