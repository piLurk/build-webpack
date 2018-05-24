import test from 'ava'
import {Nuxt, Builder} from 'nuxt'
import {resolve} from 'path'
let nuxt = null

test.before('Init Nuxt.js', async t => {
  const rootDir = resolve(__dirname,'..')
  let config = {}
  try { config = require(resolve(rootDir, 'nuxt.config.js'))}catch(e){}
  config.rootDir = rootDir 
  config.dev =false
  nuxt = new Nuxt(config)
  await new Builder(nuxt).build()
  nuxt.listen(4000, 'localhost')
})

test('路由 / 有效且能渲染 HTML', async t => {
  let context = {}
  const { html } = await nuxt.renderRoute('/', context)
  t.true(html.includes('<h1 class="red">hello wudongyue</h1>'))
})

test('路由 / 有效且渲染的HTML有特定样式', async t => {
  const window = await nuxt.renderAndGetWindow('http://localhost:4000/')
  const element = window.document.querySelector('.red')
  t.not(element, null)
  t.is(element.textContent, 'hello wudongyue')
  t.is(element.className, 'red')
  t.is(window.getComputedStyle(element).color, 'red')
})

// 关掉服务器和Nuxt实例，停止文件监听。
test.after('Closing server and nuxt.js', t => {
  nuxt.close()
})