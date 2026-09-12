import { defineConfig } from 'vitepress'
import { fileURLToPath } from 'node:url'

const shitbot = [
  { text: '开始使用', items: [
    { text: 'ShitBot 文档', link: '/shitbot/' },
    { text: '安装与部署', link: '/shitbot/installation' },
    { text: '配置说明', link: '/shitbot/configuration' },
    { text: '命令与权限', link: '/shitbot/commands' },
    { text: '服务器启动提醒', link: '/shitbot/startup-notices' },
  ] },
  { text: '图片与变量', items: [
    { text: '图片渲染与高级模板', link: '/shitbot/image-templates' },
    { text: '自己的底图与像素坐标', link: '/shitbot/pixel-templates' },
    { text: 'PlaceholderAPI', link: '/shitbot/placeholders' },
    { text: '背包与材质', link: '/shitbot/inventory' },
  ] },
  { text: '群组服与开发', items: [
    { text: '代理与后端', link: '/shitbot/proxy-backend' },
    { text: '数据库与迁移', link: '/shitbot/database' },
    { text: 'API 与白名单管理', link: '/shitbot/api' },
    { text: '构建与开发', link: '/shitbot/development' },
  ] },
  { text: '维护', items: [
    { text: '常见问题', link: '/shitbot/troubleshooting' },
    { text: '兼容性', link: '/shitbot/compatibility' },
    { text: '升级与更新', link: '/shitbot/updating' },
    { text: '生产环境安全', link: '/shitbot/security' },
  ] },
]

export default defineConfig({
  lang: 'zh-CN',
  title: 'H_aaa 插件文档',
  description: 'ShitBot 群服互通、BiliMusicBridge 直播点歌和 AllMusic QQMusic / Kugou 音乐源的安装、配置与开发文档。',
  base: '/docs/',
  outDir: fileURLToPath(new URL('../../docs', import.meta.url)),
  cleanUrls: false,
  head: [['link', { rel: 'icon', type: 'image/svg+xml', href: '/docs/logo.svg' }]],
  themeConfig: {
    logo: '/logo.svg',
    nav: [
      { text: 'ShitBot', link: '/shitbot/' },
      { text: 'BiliMusicBridge', link: '/bilimusicbridge/' },
      { text: 'AllMusic 音乐源', link: '/allmusic/' },
    ],
    sidebar: {
      '/shitbot/': shitbot,
      '/bilimusicbridge/': [{ text: 'BiliMusicBridge', items: [
        { text: '介绍与快速开始', link: '/bilimusicbridge/' },
        { text: '安装、配置与完整手册', link: '/bilimusicbridge/reference' },
        { text: '常见问题', link: '/bilimusicbridge/troubleshooting' },
        { text: '选择音乐源', link: '/allmusic/' },
      ] }],
      '/allmusic/': [{ text: 'AllMusic 外置音乐源', items: [
        { text: '安装与选择', link: '/allmusic/' },
        { text: 'QQMusic', link: '/allmusic/qqmusic' },
        { text: 'Kugou', link: '/allmusic/kugou' },
        { text: '常见问题', link: '/allmusic/troubleshooting' },
        { text: '接入 B 站直播点歌', link: '/bilimusicbridge/' },
      ] }],
    },
    search: { provider: 'local', options: { translations: {
      button: { buttonText: '搜索文档', buttonAriaLabel: '搜索文档' },
      modal: { noResultsText: '没有找到相关内容', resetButtonTitle: '清除搜索',
        footer: { selectText: '选择', navigateText: '切换', closeText: '关闭' } },
    } } },
    outline: { level: [2, 3], label: '本页目录' },
    docFooter: { prev: '上一篇', next: '下一篇' },
    sidebarMenuLabel: '文档导航',
    returnToTopLabel: '回到顶部',
    darkModeSwitchLabel: '外观',
    socialLinks: [{ icon: 'github', link: 'https://github.com/hutuyee' }],
    footer: { message: '安装 · 配置 · 开发', copyright: 'H_aaa 的 Minecraft 插件文档' },
  },
})
