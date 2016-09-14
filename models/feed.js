const createFeed = require('../lib/feed')

module.exports = () => {
  let _feed = null
  let _startStream = null

  return {
    namespace: 'feed',
    state: {
      messages: [],
      owner: false,
      key: null
    },
    reducers: {
      receiveMessage: (data, state) => ({ messages: [data].concat(state.messages) }),
      receiveFeed: (data, state) => ({ owner: data.owner, key: data.key })
    },
    effects: {
      appendMessage: (data, state, send, done) => {
        console.log('appendMessage', data)
        if (state.key) {
          return _feed.append(data, () => {
            send('feed:receiveMessage', data, done)
          })
        }
        send('feed:initFeed', {}, () => {
          _feed.append(data, () => {
            send('feed:receiveMessage', data, done)
          })
        })
      },
      initFeed: (data, state, send, done) => {
        if (_feed) return
        _feed = createFeed(data.key)
        const key = _feed.key.toString('hex')
        if (data.key) return send('feed:receiveFeed', {owner: false, key: key}, () => {
          _startStream()
          done()
        })
        _feed.finalize(() => {
          send('feed:receiveFeed', {owner: true, key: key}, () => {
            send('location:setLocation', { location: window.location.host + '/' + key }, () => {
              window.history.pushState(null, null, '/' + key)
              done()
            })
          })
        })
      },
      destroyFeed: (data, state, send, done) => {
        if (!_feed) return
        // TODO: this isn't restoring clean state
        _feed.close()
        _feed = null
        send('feed:receiveFeed', {owner: false, key: false}, done)
      }
    },
    subscriptions: {
      streamFeed: (send, done) => {
        _startStream = () => {
          const stream = _feed.createReadStream({ live: true })
          stream.on('data', (data) => {
            send('feed:receiveMessage', data.toString(), done)
          })
          _feed.prioritize({ start: 0, linear: true })
        }
      }
    }
  }
}
