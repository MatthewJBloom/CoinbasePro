const Notification = require('./Notify').Notification;

let notif = new Notification({message: "test"});
notif.send();
