import { readdir, readFile, writeFile, mkdir, cp } from 'node:fs/promises'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const source = resolve(process.argv[2] || resolve(root, '../ShitBot'), 'docs')
const target = resolve(root, 'site/shitbot')
await mkdir(target, { recursive: true })
for (const entry of await readdir(source, { withFileTypes: true })) {
  if (!entry.isFile() || !entry.name.endsWith('.md')) continue
  let body = await readFile(resolve(source, entry.name), 'utf8')
  body = body.replace(/\]\(README\.md([)#])/g, '](index.md$1')
    .replace(/\]\(\.\.\/README\.md\)/g, '](https://github.com/hutuyee/ShitBot#readme)')
    .replace(/\]\(\.\.\/(\.github\/[^)]+)\)/g, '](https://github.com/hutuyee/ShitBot/blob/main/$1)')
  await writeFile(resolve(target, entry.name === 'README.md' ? 'index.md' : entry.name), body)
}
await mkdir(resolve(root, 'site/public/examples'), { recursive: true })
await cp(resolve(source, 'examples/pixel-card'), resolve(root, 'site/public/examples/pixel-card'), { recursive: true })
console.log('ShitBot 文档已同步到 site/shitbot，像素模板已复制到公开下载目录。')
