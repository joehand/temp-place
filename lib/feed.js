const memdb = require('memdb')
const hypercore = require('hypercore')
const swarm = require('hyperdrive-archive-swarm')

module.exports = (key) => {
  const core = hypercore(memdb())
  const feedOpts = {}
  const swarmOpts = {signalhubPrefix: 'temp-place-'}
  if (key) {
    feedOpts.sparse = true
    swarmOpts.upload = false
  }

  const feed = core.createFeed(key)
  const sw = swarm(feed, swarmOpts)
  sw.on('connection', () => {
    console.info('new swarm conneciton')
  })

  return feed
}