// Nuxt
const { Nuxt, Builder } = require('nuxt')
let config = require('./nuxt.config.js')
config.rootDir = __dirname // for electron-builder

const nuxt = new Nuxt(config)
async function build() {
  await nuxt.ready()
  const builder = new Builder(nuxt)
  try {
    await builder.build()
  } catch (err) {
    console.error(err) // eslint-disable-line no-console
    process.exit(1)
  }
}

if (config.dev) {
  build()
}

// HTTP server
const http = require('http')
let _NUXT_URL_

if (config.dev) {
  const server = http.createServer(nuxt.render)
  server.listen()
  _NUXT_URL_ = `http://localhost:${server.address().port}`
} else {
  _NUXT_URL_ = `${__dirname}/dist/index.html`
}
console.log(`Nuxt working on ${_NUXT_URL_}`)

// Electron
const electron = require('electron')
const app = electron.app
const BrowserWindow = electron.BrowserWindow
let win = null

const newWin = () => {
  win = new BrowserWindow({
    webPreferences: {
      nodeIntegration: true
    }
  })
  win.maximize()
  win.on('closed', () => (win = null))
  if (config.dev) {
    const pollServer = () => {
      http
        .get(_NUXT_URL_, (res) => {
          if (res.statusCode === 200) {
            win && win.loadURL(_NUXT_URL_)
          } else {
            setTimeout(pollServer, 300)
          }
        })
        .on('error', pollServer)
    }
    pollServer()
  } else {
    return win.loadURL(_NUXT_URL_)
  }
}

app.on('ready', newWin)
app.on('window-all-closed', () => app.quit())
app.on('activate', () => win === null && newWin())
