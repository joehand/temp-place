const html = require('choo/html')
const css = require('sheetify')
const marked = require('marked')

module.exports = (state, prev, send) => {
  const prefix = css`
    textarea {
      margin-top:3px;
      box-shadow: 0 0 5px #DDD inset;
      outline: none;
      transition: background 0.5s;
      transition: opacity 0.5s;
    }

    textarea:hover {
      opacity:0.85;
    }

    textarea:focus {
      background: white;
      opacity:1;
    }

    button {
      transition: all 0.3s;
    }

    .key {
      font-size:10px;
    }
  `

  return html`
    <div class="${prefix} mt3">
      <h3 class="f4 tc mid-gray fw5 ttu tracked">${state.feed.key ? 'Add Another Message' : 'Start a New Temp Place'}</h3>
      <form onsubmit=${(e) => {
        const input = e.target.children[0]
        if (input.value) send('feed:appendMessage', marked(input.value))
        input.value = ''
        e.preventDefault()
      }}>
        <textarea class="${prefix} pa2 b--light-gray br2 w-100 o-50 h4 bg-transparent hover-bg-near-white" id="message"></textarea>
        <button class="w-100 mv3 pv2 fw5 small-caps
          mid-gray br2 ba b--light-gray
          hover-bg-washed-green pointer bg-transparent"
          action="submit">
          ${state.feed.key ? 'Send Message' : 'Create Your Temp Place'}</button>
        <p class="fw5 f6 tc gray mh3 lh-copy">Write a message above ${state.feed.key ? 'to add to your place.' : 'to start a new temp place.'}<br> Messages are formatted with markdown.</p>
      </form>
    </div>
  `
}
