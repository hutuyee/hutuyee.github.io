# Music source troubleshooting

## Music API not found

Put the JAR in `api/` inside AllMusic's actual data directory and restart normally. Both `qqmusic` and `kugou` are lowercase API IDs. If the logs show no successful load, resolve directory, JAR, or interface-version problems before changing `defaultApi`.

## NoSuchMethodError or ClassNotFoundException

Sources depend on the AllMusic core interface. Use a matching release or put your core JAR in the extension's `libs/` and rebuild. Do not bundle AllMusic core inside the source or mix AllMusic packages for different platforms.

## Search works but playback fails

A search result only means a song was found. Playback also requires a valid audio URL. Check expired cookies, account permissions, and server connectivity to the music platform. Working covers or lyrics do not guarantee a playable URL. Both extensions rely on free or authorized resources returned normally by the platform.

## No sound in the game

Check that the player's AllMusic client mod matches the server, and that the player is not muted, blacklisted, or on an excluded server. Investigate AllMusic's own commands and playback settings before BiliMusicBridge's live connection.

## Cookies when using both sources

QQMusic uses AllMusic's loaded cookie list. Kugou can use `ALLMUSIC_KUGOU_COOKIE` independently to reduce collisions between cookie names on different platforms. See [Kugou cookie sources](kugou.md#cookie-sources).

## Report a problem

Include the platform, Java and AllMusic versions, source version, relevant error logs, and a song identifier without account information. Report QQMusic problems to [AllMusic_QQMusic Issues](https://github.com/hutuyee/AllMusic_QQMusic/issues) and Kugou problems to [AllMusic_Kugou Issues](https://github.com/hutuyee/AllMusic_Kugou/issues).
