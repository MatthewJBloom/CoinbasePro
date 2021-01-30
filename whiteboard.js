// const Notification = require('./Notify').Notification;
//
// let notif = new Notification({message: "test"});
// notif.send();

const CoinbaseProFeed = require('./CoinbasePro').CoinbaseProFeed;

let feed = new CoinbaseProFeed();
feed.startFeed();
