# H_aaa Plugin Docs

[简体中文](README.md) | **English**

[Open the documentation center](https://hutuyee.github.io/docs/en/) for installation, configuration, and development guides for ShitBot, BiliMusicBridge, AllMusic QQMusic, and Kugou.

## Website maintenance

The site uses VitePress 1.6.4. Sources are in `site/` and generated files in `docs/`. GitHub Pages publishes from the root of `main`; the root page redirects to `/docs/`.

Chinese pages retain their existing addresses under `/docs/`. English pages use `/docs/en/`. The language menu in the desktop navigation and mobile menu switches to the same document in the other language. Both languages cover the homepage, navigation, search prompts, and all project manuals.

```text
npm ci
npm run docs:sync -- ../ShitBot
npm run docs:build
```

`docs:sync` copies the specified ShitBot repository's `docs/*.md` and `docs/en/*.md` into `site/shitbot/` and `site/en/shitbot/`, respectively, and copies the shared pixel-template examples. It rewrites repository documentation links to their website locations and removes the per-page repository language links replaced by the website menu.

Maintain BiliMusicBridge and music source Chinese pages in their project directories under `site/`, with English counterparts under `site/en/`. Compare against the corresponding repositories and update both languages. New pages must have matching filenames in both languages; update bilingual navigation in `site/.vitepress/config.mts`. Keep the homepage and about page paired as well.

`docs:build` generates the static publication files. Commit the sources and generated `docs/` files together and push to `main` for GitHub Pages to publish. Do not commit `node_modules/`.

## Contact

- QQ: 2139145308
- WeChat: hutuyee
