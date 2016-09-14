const memdb = require('memdb')
const hypercore = require('hypercore')
const swarm = require('webrtc-swarm')
const signalhub = require('signalhub')
const pump = require('pump')

const DEFAULT_SIGNALHUB = 'https://signalhub.mafintosh.com'

module.exports = (key) => {
  const core = hypercore(memdb())
  const feedOpts = {}
  const owner = !key
  if (!owner) feedOpts.sparse = true

  const feed = core.createFeed(key)

  const swarmKey = 'temp-place' + feed.discoveryKey.toString('hex')
  const sw = swarm(signalhub(swarmKey, DEFAULT_SIGNALHUB))
  sw.on('peer', (conn) => {
    console.info('new swarm conneciton')
    var peer = feed.replicate({ upload: owner })
    pump(conn, peer, conn)
  })

  return feed
}