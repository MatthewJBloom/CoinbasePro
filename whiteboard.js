const CoinbaseProFeed = require('./src/CoinbaseProFeed');
const Notification = require('./src/Notify').Notification;

// let notif = new Notification({message: "test"});
// notif.send();


let feed = new CoinbaseProFeed();
feed.startFeed();

let p1 = 32950;
let content = {title: "BTC Price", message: `BTC over ${p1}`};
let trigger = {price: p1, side: "high"};
let notif = new Notification(content, trigger);
notif.listen(feed.priceEvents);
