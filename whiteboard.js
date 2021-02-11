const CoinbaseProFeed = require('./src/CoinbaseProFeed');
const NotificationManager = require('./src/NotificationManager');
const Notification = require('./src/Notify');
// const CoinbaseProAPI = require('./src/CoinbaseProAPI');

let coin_id = "BTC";
let price = 44450;

let feed = new CoinbaseProFeed();
feed.startFeed();


let notificationManager = new NotificationManager();
notificationManager.listen(feed.priceEvents);
notificationManager.newNotification(coin_id, price).then(notification => {
  console.log('waiting for notification:', notification.id);
});
