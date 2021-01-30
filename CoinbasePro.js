const WebSocketClient = require('websocket').client;

/**
 * Represents a CoinbasePro Websocket feed
 *
 */
class CoinbaseProFeed {
  constructor() {
    this.client = new WebSocketClient();
    this.url = "wss://ws-feed.pro.coinbase.com";
    this.subscription = {
      type: "subscribe",
      product_ids: ["BTC-USD"],
      channels: [{name: "ticker"}]
    };

    this.configureClient();
  } // constructor()

  startFeed() {
    this.client.connect(this.url);
  } // startFeed()

  configureClient() {
    let client = this.client;
    client.on('connectFailed', (error) => {
      this.handleConnectFailed(error);
    });
    client.on('connect', (connection) => {
      this.handleConnection(connection);
    });
  } // configureClient()

  handleConnectFailed(error) {
    console.log('Connect Error:', error.toString());
  } // handleConnectFailed(error)

  handleConnection(connection) {
    console.log('Coinbase Pro Websocket Feed Connected');
    connection.on('error', (error) => {
      this.handleConnectionError(error);
    });
    connection.on('close', () => {
      this.handleConnectionClose()
    });
    connection.on('message', (message) => {
      this.handleConnectionMessage(message);
    });
    // send subscriptions (must do before 5 seconds or conn closes)
    connection.sendUTF(JSON.stringify(this.subscription));
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
      let timestamp = new Date(data.time)
      switch (type) {
        case 'subscriptions':
          console.log('Subscriptions:', data.channels);
          break;
        case 'ticker':
          console.log(timestamp.toLocaleTimeString(), '|', data.product_id, data.side, data.price);
          break;
        default:
          console.log('UNIMPLEMENTED TYPE CASE:', type);
      }
    } else {
      console.log('Message received not utf8')
    } // if (message.type === 'utf8')
  } // handleConnectionMessage(message)

} // CoinbaseProFeed

exports.CoinbaseProFeed = CoinbaseProFeed;


// let client = new WebSocketClient();
// let url = 'wss://ws-feed.pro.coinbase.com';
// let subscription = {
//   type: "subscribe",
//   product_ids: ["BTC-USD"],
//   channels: [{name: "ticker"}]
// }
//
// client.on('connectFailed', function(error) {
//   console.log('Connect Error:', error.toString());
// });
//
// client.on('connect', function(connection) {
//   console.log('Coinbase Pro Websocket Feed Connected');
//   connection.on('error', function(error) {
//     console.log('Connection Error', error.toString());
//   });
//   connection.on('close', function() {
//     console.log('Connection Closed');
//   });
//   connection.on('message', function(message) {
//     if (message.type === 'utf8') {
//       // console.log('Received:', message.utf8Data);
//       let data = JSON.parse(message.utf8Data);
//       let type = data.type;
//       let timestamp = new Date(data.time)
//       switch (type) {
//         case 'subscriptions':
//           console.log('Subscriptions:', data.channels);
//           break;
//         case 'ticker':
//           console.log(timestamp.toLocaleTimeString(), '|', data.product_id, data.side, data.price);
//           break;
//         default:
//           console.log('UNIMPLEMENTED TYPE CASE:', type);
//       }
//     } else {
//       console.log('Message received not utf8')
//     }
//   });
//   connection.sendUTF(JSON.stringify(subscription));
// });
//
// client.connect(url);
