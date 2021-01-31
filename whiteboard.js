const Notification = require('./src/Notify').Notification;

let notif = new Notification({message: "test"});
notif.send();

const CoinbaseProFeed = require('./src/CoinbasePro').CoinbaseProFeed;

let feed = new CoinbaseProFeed();
feed.startFeed();
