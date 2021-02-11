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

  async newNotification(coin_id, price) {
    let notification_id = this.getNewID();
    let position = await this.getNewPosition(price);
    let notification = new Notification(notification_id, coin_id, price, position);
    this.notifications[notification_id] = notification;
    return { notification_id, notification };
  } // newNotification(price)

  getNewID() {
    // TODO: generate this from notifications.last +1 to string
    return "1";
  } // getNewID()

  getNewPosition(price) {
    return new Promise(resolve => {
      let position = "";
      this.priceEvents.once('price', (current) => {
        //console.log(current)
        if (current > price) {
          position = "below";
          resolve(position);
        } else if (current < price) {
          position = "above";
          resolve(position);
        } else {
          console.log('Tried to set price to current price...');
        } // if current > or < price ...
      }); // this.priceEvents.once('price', (current) => {...
    }); // return new Promise(resolve => {...
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
      //console.log(`${notification_id}: ${JSON.stringify(this.notifications[notification_id])}`);
      if (this.notifications[notification_id].position === "above") {
        if (price >= this.notifications[notification_id].price) {
          this.notifications[notification_id].send();
          //TODO: actually delete the notification not just the dict val
          delete this.notifications[notification_id];
        }
      } else if (this.notifications[notification_id].position === "below") {
        if (price <= this.notifications[notification_id].price) {
          this.notifications[notification_id].send();
          //TODO: actually delete the notification not just the dict val
          delete this.notifications[notification_id];
        }
      } else {
        //TODO: actually delete the notification not just the dict val
        delete this.notifications[notification_id];
      } // if position above (if price above), elif position low (if price low)
    } // for (const notification_id in this.notifications)
  } // priceEventHandler(price)

} // NotificationManager

module.exports = NotificationManager;
