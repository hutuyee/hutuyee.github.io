# ShitBot documentation

## Installation and everyday use

- [Installation and deployment](/en/shitbot/installation.md): platform JARs, first startup, and deployment options.
- [Configuration](/en/shitbot/configuration.md): key settings in `config.yml` and `commands.yml`.
- [Commands and permissions](/en/shitbot/commands.md): admin commands, QQ commands, shortcuts, and permission checks.
- [Server startup notices](/en/shitbot/startup-notices.md): proxy startup, waiting for a backend, reconnection retries, and reloads.
- [PlaceholderAPI variables](/en/shitbot/placeholders.md): status/binding placeholders and PAPI data in images.
- [Custom backgrounds and pixel coordinates](/en/shitbot/pixel-templates.md): prepare a PNG background and position variables.
- [Image rendering and advanced templates](/en/shitbot/image-templates.md): built-in and advanced modes, optional components, scenes, the editor, and the plugin API.
- [Troubleshooting](/en/shitbot/troubleshooting.md): connections, forwarding, binding, databases, and proxy commands.

## Server networks and data

- [Proxies and backend servers](/en/shitbot/proxy-backend.md): the command channel between BungeeCord/Velocity and Spigot backends.
- [Databases and migration](/en/shitbot/database.md): SQLite, MySQL, platform migration, and EasyBot imports.
- [Inventory queries and textures](/en/shitbot/inventory.md): offline snapshots, resource packs, mod items, and custom icons.

## Maintenance and development

- [Plugin API and whitelist management](/en/shitbot/api.md): asynchronous binding APIs, admin commands, and whitelist entries without QQ.
- [Platform compatibility](/en/shitbot/compatibility.md): recorded environments, platform differences, and optional dependencies.
- [Upgrading and automatic updates](/en/shitbot/updating.md): manual upgrades, `/shitbot update`, and release signatures.
- [Production security checklist](/en/shitbot/security.md): OneBot, databases, command transport, permissions, and logs.
- [Building and development](/en/shitbot/development.md): Maven builds, modules, and release artifacts.

For a first installation, read [Installation and deployment](/en/shitbot/installation.md), then [Configuration](/en/shitbot/configuration.md). Configure [Proxies and backend servers](/en/shitbot/proxy-backend.md) only if you need QQ commands to run on backends.

QQ command examples in these English pages use the built-in `en_US` aliases unless stated otherwise. Set `language: "en_US"` in `config.yml` and reload to use them. Changing the documentation language does not change the plugin's configuration.
