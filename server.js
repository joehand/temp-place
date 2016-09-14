const browserify = require('browserify')
const bankai = require('bankai')
const http = require('http')
const path = require('path')

const client = path.join(__dirname, 'index.js')

const assets = bankai({optimize: true})
const css = assets.css()
const js = assets.js(browserify, client, {transform: ['es2040']})
const html = assets.html()

http.createServer((req, res) => {
  switch (req.url) {
    case '/': return html(req, res).pipe(res)
    case '/bundle.js': return js(req, res).pipe(res)
    case '/bundle.css': return css(req, res).pipe(res)
    default: return html(req, res).pipe(res)
  }
}).listen(8080)
