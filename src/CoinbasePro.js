const WebSocketClient = require('websocket').client;
const EventEmitter = require('events');

/**
 * Represents a CoinbasePro Websocket feed
 *
 */
class CoinbaseProFeed {
  constructor() {
    this.client = new WebSocketClient();
    this.priceEventEmitter = new EventEmitter();
    this.url = "wss://ws-feed.pro.coinbase.com";
    this.subscription = {
      type: "subscribe",
      product_ids: ["BTC-USD"],
      channels: [{name: "ticker"}]
    };

    this.configureClient();
  } // constructor()

  configureClient() {
    let client = this.client;
    client.on('connectFailed', (error) => {
      this.handleConnectFailed(error);
    });
    client.on('connect', (connection) => {
      this.handleConnection(connection);
    });
  } // configureClient()

  startFeed() {
    this.client.connect(this.url);
  } // startFeed()

  get priceEvents() {
    return this.priceEventEmitter;
  } // get priceEvents()

  // ---- HANDLERS ---- //

  handleConnectFailed(error) {
    console.log('Connect Error:', error.toString());
  } // handleConnectFailed(error)

  handleConnection(connection) {
    console.log('Coinbase Pro Websocket Feed Connected');
    // send subscriptions (must do before 5 seconds or conn closes)
    connection.sendUTF(JSON.stringify(this.subscription));
    // handle connection events
    connection.on('error', (error) => {
      this.handleConnectionError(error);
    });
    connection.on('close', () => {
      this.handleConnectionClose()
    });
    connection.on('message', (message) => {
      this.handleConnectionMessage(message);
    });
  } // handleConnection(connection)

  handleConnectionError(error) {
    console.log('Connection Error', error.toString());
  } // handleConnectionError(error)

  handleConnectionClose() {
    console.log('Connection Closed');
  } // handleConnectionClose()

  handleConnectionMessage(message) {
    if (message.type === 'utf8') {
      // console.log('Received:', message.utf8Data);
      let data = JSON.parse(message.utf8Data);
      let type = data.type;
      let timestamp = new Date(data.time);
      timestamp = timestamp.toLocaleTimeString()
      switch (type) {
        case 'subscriptions':
          console.log('Subscriptions:', data.channels);
          break;
        case 'ticker':
          console.log(timestamp, '|', data.product_id, data.side, data.price);
          // if anyone is listening...
          if ( this.priceEventEmitter.listenerCount('price') ) {
            this.priceEventEmitter.emit('price', data.price);
          }
          break;
        default:
          console.log('UNIMPLEMENTED TYPE CASE:', type);
      }
    } else {
      console.log('Message received not utf8. Type:', message.type)
    } // if (message.type === 'utf8')
  } // handleConnectionMessage(message)

} // CoinbaseProFeed

exports.CoinbaseProFeed = CoinbaseProFeed;
