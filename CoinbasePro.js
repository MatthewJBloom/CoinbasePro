const Notification = require('./Notify').Notification;
const WebSocketClient = require('websocket').client;

let priceAlert = new Notification();
let client = new WebSocketClient();
let url = 'wss://ws-feed.pro.coinbase.com';
let subscription = {
  type: "subscribe",
  product_ids: ["BTC-USD"],
  channels: [{name: "ticker"}]
}

client.on('connectFailed', function(error) {
  console.log('Connect Error:', error.toString());
});

client.on('connect', function(connection) {
  console.log('Websocket Client Connected');
  connection.on('error', function(error) {
    console.log('Connection Error', error.toString());
  });
  connection.on('close', function() {
    console.log('Connection Closed');
  });
  connection.on('message', function(message) {
    if (message.type === 'utf8') {
      // console.log('Received:', message.utf8Data);
      let data = JSON.parse(message.utf8Data);
      let type = data.type;
      switch (type) {
        case 'subscriptions':
          console.log('Subscriptions:', data.channels);
          break;
        case 'ticker':
          console.log(data.time, 'BTC-USD', data.side, data.price);
          break;
        default:
          console.log('UNIMPLEMENTED TYPE CASE:', type);
      }
    } else {
      console.log('Message received not utf8')
    }
  });
  connection.sendUTF(JSON.stringify(subscription));
  priceAlert.send();
});

client.connect(url);
