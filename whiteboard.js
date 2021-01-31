const CoinbaseProFeed = require('./src/CoinbasePro').CoinbaseProFeed;
const Notification = require('./src/Notify').Notification;

// let notif = new Notification({message: "test"});
// notif.send();


let feed = new CoinbaseProFeed();
feed.startFeed();

let p1 = 1;
let notif = new Notification({
    message: `BTC over ${p1}`
  },{
    price: p1,
    side: "high"
  });
notif.listen(feed.priceEvents);
