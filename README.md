lets make a coinbase pro api integration


versions:
1. cli app to set price alerts
2. electron app to see price candles and set price alerts
3. add feature to track portfolio progress


ideas:
* custom & default alerts for price changes (Win 10 notification?)
* chart trades locally
* fake trading portfolio
* electron app?


todo:
- [x] practice integration with coinbase pro api
- [x] practice writing unit tests
- [x] re-write in node.js
- [x] practice websocket feed
- [x] class-ify coinbasepro.js
- [x] implement ^ in whiteboard.js
- [x] probably rename the coinbasepro references (maybe CoinbaseProFeed?)
- [x] implement an EventEmitter with CoinbaseProFeed
- [x] pass the EventEmitter to Notify so the Notification will "listen" for prices, etc.
- [x] move event listening management outside of notification...
- [x] "notification manager/router" class that listens for coinbasepro events, checks for active notifications, and can trigger them
- [ ] make some unit tests 🙃 (the python ones were good, should be easy)
- [ ] make app.js to run as a server listening for notification creations? maybe?
- [x] auto-set position based on current price (NotificationManager #L36)
- [ ] implement JSDoc
- [ ] strip out BTC to whiteboard level, specifically from CoinbaseProFeed
- [ ] make a CoinbaseProFeed subscription setter that takes parameters
- [ ] make first attempt at electron app
