import * as fs from 'node:fs'
import path from 'node:path'

const functions = fs.readdirSync('./src/routes', {
  recursive: true,
})

let table =
  '| Function | Method | Route | Documentation |\n| --- | --- | --- | --- |\n'

for (const file of functions) {
  if (typeof file !== 'string') {
    continue
  }

  if (!file.endsWith('.ts')) {
    continue
  }

  if (file.endsWith('index.ts') || file.endsWith('types.d.ts')) {
    continue
  }

  const fullPath = path.join('./src/routes', file)
  const content = fs.readFileSync(fullPath, 'utf8')

  const docMatch = /@see\s+(https?:\/\/[^ ]+)\n/.exec(content)
  const doc = docMatch?.[1]
  if (!doc) {
    console.warn(`No documentation URL found for ${file}`)
    continue
  }

  const routeMatch = /path:\s*['`](\/.+)['`]/.exec(content)
  const route = routeMatch?.[1]?.replace(/\$\{params\.(\w+)\}/, ':$1')
  if (!route) {
    console.warn(`No route found for ${file}`)
    continue
  }

  const functionNameMatch = /export\s+const\s+(\w+)\s*=\s*\(/.exec(content)
  const functionName = functionNameMatch?.[1]
    ?.replace(/^create/, '')
    .replace(/^(.)/, (c) => c.toLowerCase())
  if (!functionName) {
    console.warn(`No function name found for ${file}`)
    continue
  }

  const methodMatch = /method:\s*['`](\w+)['`]/.exec(content)
  const method = methodMatch?.[1]
  if (!method) {
    console.warn(`No method found for ${file}`)
    continue
  }

  const parent = file.split('/')[0]
  if (!parent) {
    console.warn(`No parent found for ${file}`)
    continue
  }

  const fullFunctionName = `${parent}.${functionName}`
  table += `| ${fullFunctionName} | ${method} | ${route} | [Reference](${doc}) |\n`
}

console.log(table)
