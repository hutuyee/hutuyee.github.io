# QQMusic

AllMusic_QQMusic uses the API ID `qqmusic`. It supports keyword search, song information, album covers, timed lyrics, and available playback URLs returned by QQ Music. It can also extract identifiers from supported song and playlist links.

## Search and default source

After following the [installation steps](index.md#installation):

```text
/music search qqmusic 稻香
```

If AllMusic's `defaultApi` is `qqmusic`, omit the API ID:

```text
/music search 稻香
```

Songs usually use QQ Music's `songmid`; playlists use numeric IDs. The implementation extracts identifiers from `songmid`, `disstid` / `dissid` parameters and supported song, songdetail, playlist, and taoge paths. A browser share-page URL is not necessarily an audio URL; let the source resolve it.

## Cookies and playback

QQMusic reads the cookie list already loaded by AllMusic from its own `cookie.json`. QQMusic's `reload(File)` has no separate configuration-file logic, so there is no need for a `qqmusic.yml`.

If a logged-in session is needed, save your QQ Music account's data using AllMusic's cookie format, then reload through the procedure supported by your AllMusic version or restart. Without cookies, public search results and some song URLs may still work. Playability depends on the platform's response and account permissions. The extension does not provide playback links that the platform has not authorized and returned normally.

Do not put real cookies in documentation examples or public repositories. `QQSong.debug` defaults to `false`.

## Build from source

Put the core JAR matching your AllMusic version in the project's `libs/`, then run:

```text
gradlew.bat build
```

On Linux/macOS, use `./gradlew build`. Output is in `build/libs/`; `build.gradle` determines the version. Do not copy a fixed filename from an old README. The dependency is `compileOnly`; AllMusic supplies the core and shared libraries at runtime.

[QQMusic source](https://github.com/hutuyee/AllMusic_QQMusic) · [Troubleshooting](troubleshooting.md)
