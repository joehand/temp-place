const html = require('choo/html')
const css = require('sheetify')

const messageList = require('../elements/message-list')

module.exports = (state, prev, send) => {
  if ((!state.feed.key && state.params.key) || state.feed.key !== state.params.key) send('feed:initFeed', {key: state.params.key})
  const feed = state.feed
  const connecting = () => {
    // TODO: Connection timer.
    return html`
      <div class="pt2">
        <div class="ph3 pv1 bg-white mv2 ba b--yellow br2">
          <p>Connecting...</p>
        </div>
      </div>
    `
  }

  const header = () => {
    const warning = html`
      <p class="dark-gray f6"><span class="dark-red">Warning!</span> Reloading the page will remove current messages and break your url.</p>
    `
    return html`
      <div class="">
        <a class="f6 ttu pv2 tracked-tight code fw1 gray" href="https://temp.place/${feed.key}">temp.place/${feed.key}</a>
        ${feed.owner ? warning : ''}
      </div>
    `
  }

  return html`
    <div>
      ${header()}
      ${feed.messages.length || feed.owner ? messageList(feed.messages) : connecting()}
    </div>
  `
}
