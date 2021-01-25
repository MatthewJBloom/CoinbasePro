const WindowsToaster = require('node-notifier').WindowsToaster;

// var notifier = new WindowsToaster({
//   withFallback: false, // Fallback to Growl or Balloons?
//   customPath: undefined // Relative/Absolute path if you want to use your fork of SnoreToast.exe
// });
//
// notifier.notify(
//   {
//     title: undefined, // String. Required
//     message: undefined, // String. Required if remove is not defined
//     icon: undefined, // String. Absolute path to Icon
//     sound: false, // Bool | String (as defined by http://msdn.microsoft.com/en-us/library/windows/apps/hh761492.aspx)
//     id: undefined, // Number. ID to use for closing notification.
//     appID: undefined, // String. App.ID and app Name. Defaults to no value, causing SnoreToast text to be visible.
//     remove: undefined, // Number. Refer to previously created notification to close.
//     install: undefined // String (path, application, app id).  Creates a shortcut <path> in the start menu which point to the executable <application>, appID used for the notifications.
//   },
//   function (error, response) {
//     console.log(response);
//   }
// );


class Notification {
  constructor() {
    this.notifier = new WindowsToaster({withFallback: false, customPath: undefined});
  }
  notify() {
    this.notifier.notify(
      {
        title: "CoinbasePro Alert",
        message: "This is a price alert for CoinbasePro"
      },
      function (error, response) {
        console.log(response);
      }
    );
  }
}

exports.Notification = Notification;
