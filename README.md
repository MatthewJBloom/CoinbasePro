lets make a coinbase pro api integration


versions:
1. cli app to set price alerts
2. electron app to see price candles and set price alerts
3. add feature to track portfolio progress


todo:
- [x] practice integration with coinbase pro api
- [x] practice writing unit tests
- [x] re-write in node.js
- [x] practice websocket feed
- [x] class-ify coinbasepro.js
- [x] implement ^ in whiteboard.js
- [ ] probably rename the coinbasepro references (maybe CoinbaseProFeed?)
- [ ] implement an EventEmitter with CoinbaseProFeed
- [ ] pass the EventEmitter to Notify so the Notification will "listen" for prices, etc.


ideas:
* custom & default alerts for price changes (Win 10 notification?)
* chart trades locally
* fake trading portfolio
* electron app?
