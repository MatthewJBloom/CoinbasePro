const { Notification } = require('electron')

/**
 * Represents a notification
 * @param {string} id - The ID of the Notification, e.g. "1"
 * @param {string} coin_id - The name of the coin, e.g. "BTC"
 * @param {float} price - The USD amount at which to notify, e.g. 50000.00
 * @param {string} position - The target side of the current price, "above" or "below"
 *
 */
class Alert {
  constructor(id, coin_id, price, position) {
    this.id = id
    this.hasBeenSent = false
    this.singleUse = true
    this.price = price
    this.position = position
    this.content = {
      title: "Price Alert",
      body: `${coin_id} ${position} ${price}`,
      icon: `./assets/${coin_id}.png`,
      silent: false
    }
    this.notification = new Notification(this.content)
    // For other options consult https://www.electronjs.org/docs/api/notification
    // console.log('new notification created', this)
  } // constructor(id, coin_id, price, content)


  /**
   * Send the notification.
   * Also, mark it as sent if it is single use.
   */
  send() {
    if (!this.hasBeenSent) {
      this.notification.show()
      if (this.singleUse) {
        this.hasBeenSent = true
      }
    } else {
      // console.log('Notification already sent')
    } // if (!this.hasBeenSent)
  } // send()

} // Notification

module.exports = Alert
