lets make a coinbase pro api integration


versions/milestones:
0. building & testing
1. electron app
2. api


ideas/plans:
* notifications for price changes ✔
* coinbase pro clone in electron
* advanced order form (set stop loss AND sell target)
* trading portfolio performance stats
* api for separate (python) app (trading bot in the future)


todo:
- [x] practice integration with coinbase pro api
- [x] practice writing unit tests
- [x] re-write in node.js
- [x] practice websocket feed
- [x] class-ify coinbasepro.js
- [x] implement ^ in whiteboard.js
- [x] probably rename the coinbasepro references (maybe CoinbaseProFeed?)
- [x] implement an EventEmitter with CoinbaseProFeed
- [x] pass the EventEmitter to Notify so the Notification will "listen" for prices, etc
- [x] move event listening management outside of notification...
- [x] "notification manager/router" class that listens for coinbasepro events, checks for active notifications, and can trigger them
- [ ] make some unit tests 🙃 (the python ones were good, should be easy)
- [x] auto-set position based on current price (NotificationManager #L36)
- [ ] implement JSDoc
- [ ] strip out BTC to whiteboard level, specifically from CoinbaseProFeed
- [ ] make a CoinbaseProFeed subscription setter that takes parameters
- [x] make first attempt at electron app
- [ ] either rename repo or make a new one for the electron app
- [ ] investigate chrome os notification support
- [ ] replace node-notifier with electron notifications (https://www.electronjs.org/docs/tutorial/notifications)
- [ ] implement an add notification form
- [ ] display current/active notifications somewhere
