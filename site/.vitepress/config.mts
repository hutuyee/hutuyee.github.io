import { defineConfig, type DefaultTheme } from 'vitepress'
import { fileURLToPath } from 'node:url'

function localizedTheme(english: boolean): DefaultTheme.Config {
  const text = (zh: string, en: string) => english ? en : zh
  const link = (path: string) => (english ? '/en' : '') + path
  const item = (zh: string, en: string, path: string) => ({
    text: text(zh, en), link: link(path),
  })

  return {
    logo: { src: '/avatar.jpg', alt: text('H_aaa 的头像', "H_aaa's avatar") },
    nav: [
      item('ShitBot', 'ShitBot', '/shitbot/'),
      item('BiliMusicBridge', 'BiliMusicBridge', '/bilimusicbridge/'),
      item('AllMusic 音乐源', 'AllMusic sources', '/allmusic/'),
    ],
    sidebar: {
      [link('/shitbot/')]: [
        { text: text('开始使用', 'Getting started'), items: [
          item('ShitBot 文档', 'ShitBot documentation', '/shitbot/'),
          item('安装与部署', 'Installation and deployment', '/shitbot/installation'),
          item('配置说明', 'Configuration', '/shitbot/configuration'),
          item('命令与权限', 'Commands and permissions', '/shitbot/commands'),
          item('服务器启动提醒', 'Startup notices', '/shitbot/startup-notices'),
        ] },
        { text: text('图片与变量', 'Images and placeholders'), items: [
          item('图片渲染与高级模板', 'Rendering and advanced templates', '/shitbot/image-templates'),
          item('自己的底图与像素坐标', 'Backgrounds and pixel coordinates', '/shitbot/pixel-templates'),
          item('PlaceholderAPI', 'PlaceholderAPI', '/shitbot/placeholders'),
          item('背包与材质', 'Inventories and textures', '/shitbot/inventory'),
        ] },
        { text: text('群组服与开发', 'Networks and development'), items: [
          item('代理与后端', 'Proxies and backends', '/shitbot/proxy-backend'),
          item('数据库与迁移', 'Databases and migration', '/shitbot/database'),
          item('API 与白名单管理', 'API and whitelist management', '/shitbot/api'),
          item('构建与开发', 'Building and development', '/shitbot/development'),
        ] },
        { text: text('维护', 'Maintenance'), items: [
          item('常见问题', 'Troubleshooting', '/shitbot/troubleshooting'),
          item('兼容性', 'Compatibility', '/shitbot/compatibility'),
          item('升级与更新', 'Upgrading and updates', '/shitbot/updating'),
          item('生产环境安全', 'Production security', '/shitbot/security'),
        ] },
      ],
      [link('/bilimusicbridge/')]: [{ text: 'BiliMusicBridge', items: [
        item('介绍与快速开始', 'Introduction and quick start', '/bilimusicbridge/'),
        item('安装、配置与完整手册', 'Installation and full reference', '/bilimusicbridge/reference'),
        item('常见问题', 'Troubleshooting', '/bilimusicbridge/troubleshooting'),
        item('选择音乐源', 'Choose a music source', '/allmusic/'),
      ] }],
      [link('/allmusic/')]: [{ text: text('AllMusic 外置音乐源', 'AllMusic music sources'), items: [
        item('安装与选择', 'Installation and selection', '/allmusic/'),
        item('QQMusic', 'QQMusic', '/allmusic/qqmusic'),
        item('Kugou', 'Kugou', '/allmusic/kugou'),
        item('常见问题', 'Troubleshooting', '/allmusic/troubleshooting'),
        item('接入 B 站直播点歌', 'Bilibili live song requests', '/bilimusicbridge/'),
      ] }],
    },
    outline: { level: [2, 3], label: text('本页目录', 'On this page') },
    docFooter: { prev: text('上一篇', 'Previous page'), next: text('下一篇', 'Next page') },
    langMenuLabel: text('切换语言', 'Change language'),
    sidebarMenuLabel: text('文档导航', 'Menu'),
    returnToTopLabel: text('回到顶部', 'Return to top'),
    darkModeSwitchLabel: text('外观', 'Appearance'),
    darkModeSwitchTitle: text('切换到深色模式', 'Switch to dark theme'),
    lightModeSwitchTitle: text('切换到浅色模式', 'Switch to light theme'),
    skipToContentLabel: text('跳转到内容', 'Skip to content'),
    notFound: {
      title: text('页面未找到', 'Page not found'),
      quote: text('这个页面可能已移动，请从文档首页或搜索继续查找。', 'This page may have moved. Continue from the documentation home or search.'),
      linkLabel: text('返回文档首页', 'Go to documentation home'),
      linkText: text('返回首页', 'Take me home'),
    },
    footer: {
      message: text('安装 · 配置 · 开发', 'Installation · Configuration · Development'),
      copyright: text('H_aaa 的 Minecraft 插件文档', "Minecraft plugin documentation by H_aaa"),
    },
  }
}

export default defineConfig({
  lang: 'zh-CN',
  title: 'H_aaa 插件文档',
  description: 'ShitBot、BiliMusicBridge 和 AllMusic 音乐源的使用说明：安装、配置、常见问题和开发接口。',
  base: '/docs/',
  outDir: fileURLToPath(new URL('../../docs', import.meta.url)),
  cleanUrls: false,
  head: [['link', { rel: 'icon', type: 'image/jpeg', href: '/docs/avatar.jpg' }]],
  locales: {
    root: {
      label: '简体中文',
      lang: 'zh-CN',
      link: '/',
      title: 'H_aaa 插件文档',
      description: 'ShitBot、BiliMusicBridge 和 AllMusic 音乐源的使用说明：安装、配置、常见问题和开发接口。',
      themeConfig: localizedTheme(false),
    },
    en: {
      label: 'English',
      lang: 'en',
      link: '/en/',
      title: 'H_aaa Plugin Docs',
      description: 'Guides for ShitBot, BiliMusicBridge, and AllMusic sources: installation, configuration, troubleshooting, and plugin APIs.',
      themeConfig: localizedTheme(true),
    },
  },
  themeConfig: {
    i18nRouting: true,
    search: {
      provider: 'local',
      options: {
        locales: {
          root: {
            translations: {
              button: { buttonText: '搜索文档', buttonAriaLabel: '搜索文档' },
              modal: {
                displayDetails: '显示详细列表',
                backButtonTitle: '返回',
                noResultsText: '没有找到相关内容',
                resetButtonTitle: '清除搜索',
                footer: { selectText: '选择', navigateText: '切换', closeText: '关闭' },
              },
            },
          },
        },
      },
    },
    socialLinks: [{ icon: 'github', link: 'https://github.com/hutuyee' }],
  },
})
