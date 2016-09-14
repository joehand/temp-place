const html = require('choo/html')

module.exports = (messages) => {
  return html`
    <ul class="list pl0 ml0">
      ${messages.map(function (messsage, i) {
        const contentWrapper = html`<div class="ph3 pv1"></div>`
        contentWrapper.innerHTML = messsage
        return html`
          <li class="bg-white mv2 ba b--light-silver br2">
            ${contentWrapper}
          </li>
        `
      })}
    </ul>
  `
}
