const CoinbaseProFeed = require('./src/CoinbaseProFeed')
const NotificationManager = require('./src/NotificationManager')
// const Notification = require('./src/Notify')
// const CoinbaseProAPI = require('./src/CoinbaseProAPI')

let coin_id = "BTC"

let feed = new CoinbaseProFeed()
feed.startFeed()

let notificationManager = new NotificationManager()
notificationManager.listen(feed.priceEvents)
feed.priceEvents.once('price', (price) => {
  console.log(`current price is $${price}`)
  notificationManager.newNotification(coin_id, price-10).then(notification => {
    console.log(`notification waiting for ${price-10}`)
  })
  notificationManager.newNotification(coin_id, price+10).then(notification => {
    console.log(`notification waiting for ${price+10}`)
  })
})
