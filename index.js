const choo = require('choo')
const html = require('choo/html')
const css = require('sheetify')
const memdb = require('memdb')
const hypercore = require('hypercore')
const swarm = require('hyperdrive-archive-swarm')

const core = hypercore(memdb())
let feed = null

const landingView = require('./views/landing')
const feedView = require('./views/feed')
const message = require('./components/message-box')
const messageList = require('./elements/message-list')

css('tachyons')
css('./style', {global: true})

const app = choo()
app.model(require('./models/feed')())

const mainView = (state, prev, send) => {
  // if (state.params.key && state.params.key.length !== 64) TODO 404
  const showMessageBox = state.params.key ? state.feed.owner : true
  if (!state.params.key && state.feed.key) send('feed:destroyFeed')

  console.log('here', state.params.key, state)

  const feedSidebar = () => {
    return html`
      <div class="pt3">
        <h3 class="f4 tc mid-gray fw5 ttu tracked">Welcome to temp.place!</h3>
        <p class="lh-copy measure tc mid-gray">
          <a href='/' class="link underline-hover ttu avenir f5 fw4 tracked mid-gray">temp.place</a> is a place to send secure short-term messages.
        </p>
      </div>
    `
  }

  return html`
    <main class="h-100 bg-washed-blue">
      <div class="cf bg-washed-blue">
        <header class="cf w-100 pa3 pb0">
          <h1 class="mt2 mb0">
            <a class="link pointer f5 fr w-25 fw4 pt3 bt bw1 ttu tracked mid-gray tr rh-title avenir">
              temp.place
            </a>
          </h1>
        </header>
        <section class="fl pa3 w-100 w-60-ns">
          ${state.params.key ? feedView(state, prev, send) : landingView(state, prev, send)}
        </section>
        <section class="fl pa3 w-100 w-40-ns">
          ${showMessageBox ? message(state, prev, send) : feedSidebar()}
        </section>
      </div>
    </main>
  `
}

app.router((route) => [
  route('/', mainView),
  route('/:key', mainView)
])

const tree = app.start()
document.body.appendChild(tree)
