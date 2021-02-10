const Notification = require('./Notify');
const EventEmitter = require('events');

/**
 * Represents a handler/manager for Notifications
 *
 */
class NotificationManager {
  constructor() {
    this.notifications = {};
    this.priceEvents = undefined;
  } // constructor()

  newNotification(coin_id, price) {
    let notification_id = this.getNewID();
    let content = this.getNewContent(coin_id, price);
    let position = this.getNewPosition();
    let notification = new Notification(notification_id, coin_id, price, position, content);
    this.notifications[notification_id] = notification;
    return { notification_id, notification };
  } // newNotification(price)

  getNewID() {
    // TODO: generate this from notifications.last +1 to string
    return "1";
  } // getNewID()

  getNewContent(coin_id, price) {
    let content = {};
    content["title"] = "Price Alert";
    content["message"] = `${coin_id} at ${price}`;
    content["sound"] = true;
    return content;
  } // getNewContent(coin_id, price)

  getNewPosition() {
    if (true) {
      return "above";
    } else if (false) {
      return "below";
    } // if (TODO: compare to current price via coinbaseproapi)
  } // getNewPosition()

  listen(priceEvents) {
    if (priceEvents) {
      this.priceEvents = priceEvents;
      this.priceEvents.on('price', this.priceEventHandler.bind(this));
      return true;
    } else {
      return false;
    } // if (priceEvents)
  } // listen(priceEvents)

  priceEventHandler(price) {
    for (const notification_id in this.notifications) {
      console.log(`${notification_id}: ${JSON.stringify(this.notifications[notification_id])}`);
      if (this.notifications[notification_id].position === "above") {
        if (price >= this.notifications[notification_id].price) {
          this.notifications[notification_id].send();
          delete this.notifications[notification_id];
        }
      } else if (this.notifications[notification_id].position === "below") {
        if (price <= this.notifications[notification_id].price) {
          this.notifications[notification_id].send();
          delete this.notifications[notification_id];
        }
      } // if position above (if price above), elif position low (if price low)
    } // for (const notification_id in this.notifications)
  } // priceEventHandler(price)

} // NotificationManager

module.exports = NotificationManager;
