const CoinbaseProFeed = require('./src/CoinbaseProFeed');
const NotificationManager = require('./src/NotificationManager');
const Notification = require('./src/Notify');
// const CoinbaseProAPI = require('./src/CoinbaseProAPI');

let coin_id = "BTC";
let price = 46000;

let feed = new CoinbaseProFeed();
feed.startFeed();


let notificationManager = new NotificationManager();
notificationManager.listen(feed.priceEvents);
let { notification_id, notification } = notificationManager.newNotification(coin_id, price);
