# BiliMusicBridge troubleshooting

## AllMusic is unavailable

Use AllMusic 4.2.0 or newer in the same instance as BiliMusicBridge. The proxy bridge cannot call AllMusic on a separate Bukkit backend. Check source loading in AllMusic's logs and ensure `defaultApi` matches the source ID.

## Chat arrives but no song is requested

Check `room-id`, `song-request.prefixes`, and `/bilimusic status`. The default prefix is `点歌`, and messages must start with it. Empty keywords or text exceeding `max-keyword-length` do not enter the normal request flow.

Defaults are a 20-second cooldown per Bilibili account, a 1000 ms global interval, an 8-second duplicate-keyword window, and a pending queue capacity of 100. Run `/bilimusic reload` after changing these values. If failures are not broadcast to players, inspect console logs or enable `messages.broadcast-failure` as needed.

## No players, duplicate song, or full queue

The default `allmusic.require-online-player: true` requires an online player eligible for playback. The bridge retains AllMusic's queue length, duplicates, song blacklist, per-player limits, and other checks. Livestream viewers are not Minecraft accounts, so direct enqueueing does not charge Vault or proxy economy balances.

## Where cookies go

Cookies are optional. Put them in the current BiliMusicBridge data directory, normally as `cookie.json`. Browser-exported arrays, JSON objects, and raw Cookie headers are supported. The path must stay inside the data directory. Cookies and generated `device.properties` are runtime data and should not be included in public documentation.

## A song is found but players hear nothing

Check that AllMusic client/server versions match and the source returns a usable playback URL. BiliMusicBridge receives chat, searches, and enqueues; AllMusic and the source still handle actual resolution and playback. See [Music source troubleshooting](../allmusic/troubleshooting.md).
