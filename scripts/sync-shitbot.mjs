import { readdir, readFile, writeFile, mkdir, cp } from 'node:fs/promises'
import { resolve, dirname, relative, sep } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const repository = resolve(process.argv[2] || resolve(root, '../ShitBot'))
const source = resolve(repository, 'docs')
const locales = [
  { directory: '', route: '/shitbot/', readme: 'README.md' },
  { directory: 'en', route: '/en/shitbot/', readme: 'README.en.md' },
]

function websiteLink(href, directory) {
  if (/^(?:[a-z][a-z\d+.-]*:|\/\/|#)/i.test(href)) return href
  const hashAt = href.indexOf('#')
  const path = hashAt < 0 ? href : href.slice(0, hashAt)
  const hash = hashAt < 0 ? '' : href.slice(hashAt)
  const absolute = resolve(directory, path)
  const docPath = relative(source, absolute).split(sep).join('/')
  for (const locale of locales) {
    const prefix = locale.directory ? locale.directory + '/' : ''
    const name = docPath.slice(prefix.length)
    if (docPath.startsWith(prefix) && !name.includes('/') && name.endsWith('.md')) {
      return locale.route + (name === 'README.md' ? 'index.md' : name) + hash
    }
  }
  if (docPath.startsWith('examples/')) return '/docs/' + docPath + hash
  const repoPath = relative(dirname(source), absolute).split(sep).join('/')
  if (repoPath === 'image/spark.png') return '/images/shitbot/spark.png' + hash
  if (repoPath === 'README.md' || repoPath === 'README.en.md' || repoPath.startsWith('.github/')) {
    return 'https://github.com/hutuyee/ShitBot/blob/main/' + repoPath + hash
  }
  return href
}

for (const locale of locales) {
  const directory = resolve(source, locale.directory)
  const target = resolve(root, 'site', locale.route.slice(1))
  await mkdir(target, { recursive: true })
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    if (!entry.isFile() || !entry.name.endsWith('.md')) continue
    let body = await readFile(resolve(directory, entry.name), 'utf8')
    // The website uses VitePress's language menu in place of the repository links.
    body = body.replace(/^(?:\*\*简体中文\*\* \| \[English\]\([^\n]+\)|\[简体中文\]\([^\n]+\) \| \*\*English\*\*)\r?\n\r?\n/m, '')
      .replace(/\]\(([^\s)]+)\)/g, (_, href) => '](' + websiteLink(href, directory) + ')')
    if (entry.name === 'README.md') {
      const readme = await readFile(resolve(repository, locale.readme), 'utf8')
      const spark = readme.match(/(?:^|\n)(## Spark\r?\n[\s\S]*?)(?=\r?\n## |$)/)?.[1]
      if (spark) {
        body = body.trimEnd() + '\n\n' + spark.trimEnd()
          .replace(/\]\(([^\s)]+)\)/g, (_, href) => '](' + websiteLink(href, repository) + ')') + '\n'
      }
    }
    await writeFile(resolve(target, entry.name === 'README.md' ? 'index.md' : entry.name), body)
  }
}
await mkdir(resolve(root, 'site/public/examples'), { recursive: true })
await cp(resolve(source, 'examples/pixel-card'), resolve(root, 'site/public/examples/pixel-card'), { recursive: true })
await mkdir(resolve(root, 'site/public/images/shitbot'), { recursive: true })
await cp(resolve(repository, 'image/spark.png'), resolve(root, 'site/public/images/shitbot/spark.png'))
console.log('ShitBot 中英文文档与 README 中的 Spark 内容已同步，像素模板和 Spark 截图已复制到公开目录。')
