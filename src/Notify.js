const WindowsToaster = require('node-notifier').WindowsToaster;

/**
 * DOCUMENTATION FOR WINDOWSTOASTER
 *
 * var notifier = new WindowsToaster({
 *   withFallback: false, // Fallback to Growl or Balloons?
 *   customPath: undefined // Relative/Absolute path if you want to use your fork of SnoreToast.exe
 * });
 *
 * notifier.notify(
 *   {
 *     title: undefined, // String. Required
 *     message: undefined, // String. Required if remove is not defined
 *     icon: undefined, // String. Absolute path to Icon
 *     sound: false, // Bool | String (as defined by http://msdn.microsoft.com/en-us/library/windows/apps/hh761492.aspx)
 *     id: undefined, // Number. ID to use for closing notification.
 *     appID: undefined, // String. App.ID and app Name. Defaults to no value, causing SnoreToast text to be visible.
 *     remove: undefined, // Number. Refer to previously created notification to close.
 *     install: undefined // String (path, application, app id).  Creates a shortcut <path> in the start menu which point to the executable <application>, appID used for the notifications.
 *   },
 *   function (error, response) {
 *     console.log(response);
 *   }
 * );
 */

/**
 * Represents a notification
 * @param {string} id - The ID of the Notification
 * @param {string} coin_id - The name of the coin, sets notification details
 * @param {float} price - The USD amount at which to notify
 * @param {string} position - "above" or "below" TODO: calc this from live price
 *
 */
class Notification {
  constructor(id, coin_id, price, position) {
    this.windowsToaster = new WindowsToaster({withFallback: false});
    this.id = id;
    this.hasBeenSent = false;
    this.singleUse = true;
    this.price = price;
    this.position = position;
    this.content = {
      title: "Price Alert",
      message: `${coin_id} ${position} ${price}`,
      icon: `./assets/${coin_id}.png`,
      sound: true
    };
    console.log('new notification created', this)
  } // constructor(id, coin_id, price, content)

  send() {
    // console.log(this)
    if (!this.hasBeenSent) {
      this.windowsToaster.notify(
        this.content,
        (error, response) => {
          console.log(error || response);
        }
      );
      if (this.singleUse) {
        this.hasBeenSent = true;
      }
    } else {
      // console.log('Notification already sent');
    } // if (!this.hasBeenSent)
  } // send()

} // Notification

module.exports = Notification;
