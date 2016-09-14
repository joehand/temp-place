# temp.place

[TEMP.PLACE](https://temp.place) is a place to send temporary & secure messages with no server.

Messages are stored in memory in the browser. Messages are sent encrypted directly to peers with no server in the middle. Message sharing stops when you close your tab (if other people have leave the tab open, they can still view message until it is closed).

### Technical Bits

[Hypercore](https://github.com/mafintosh/hypercore) provides the storage layer and syncronizes the data. [Webrtc-swarm](https://github.com/mafintosh/webrtc-swarm) connects peers to send data directly between browsers. Data is stored in memory with [memdb](https://github.com/juliangruber/memdb). [Choo](https://github.com/yoshuawuyts/choo) and [tachyons](http://tachyons.io/) provide the awesome front-end magic.

## Usage

Visit [temp.place](https://temp.place) and send messages.

## Development

Contributions welcome!

### Getting Started

* `git clone https://github.com/joehand/temp-place.git`
* `cd temp-place && npm install`
* `npm start` to start development server

### Production Server

Run `node server.js` to run production server on port `8080`.

## License

MIT