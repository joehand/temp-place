const html = require('choo/html')

const messageList = require('../elements/message-list')

module.exports = (state, prev, send) => {
  const tempPlace = () => {
    return html`<span class="ttu avenir f5 fw4 tracked mid-gray">temp.place</span>`
  }

  const welcome = () => {
    return html`
      <div>
        <h2>Welcome to ${tempPlace()}!</h2>
        <p class="lh-copy mid-gray">${tempPlace()} is a place to send temporary & secure messages with no server.</p>
        <h3>Using ${tempPlace()}:</h3>
        <ol class="lh-copy mid-gray">
          <li>Create your first message to start your ${tempPlace()}.</li>
          <li>Write messages in markdown, you can add as many messages as you like.</li>
          <li>Send the link to share your messages.</li>
          <li>People with the link can only download your messages while you keep the tab open.</li>
          <li>Done sharing? Close the tab to stop sharing the messages.</li>
        </ol>
        <p class="lh-copy mid-gray">
          Messages are stored in memory in the browser.
          Messages are sent encrypted <i>directly</i> to peers with no server in the middle.
          Message sharing stops when you close your tab (if other people have leave the tab open, they can still view message until it is closed).
        </p>
        <h3>Technical Bits</h3>
        <p class="lh-copy mid-gray">
          ${tempPlace()} development is <a href="https://github.com/joehand/temp-place">available on Github</a>.
          <a href="https://github.com/mafintosh/hypercore">Hypercore</a> provides the storage layer and syncronizes the data.
          <a href="https://github.com/mafintosh/webrtc-swarm">Webrtc-swarm</a> connects peers to send data directly between browsers.
        </p>
      </div>
    `
  }

  return html`
    <div>
      ${messageList([welcome().innerHTML])}
    </div>
  `
}