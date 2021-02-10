const https = require('https');





class CoinbaseProAPI {
  constructor() {
    // ???
  } // constructor()

  getLastPrice(coin_id = "BTC") {
    return new Promise(resolve => {


      const options = {
        hostname: 'api.pro.coinbase.com',
        port: 443,
        path: `/products/${coin_id}-USD/stats`,
        method: 'GET',
        headers: {
          'User-Agent': 'Node.js'
        }
      };
      const req = https.request(options, res => {
        //console.log(`statusCode: ${res.statusCode}`);
        let body = '';
        res.setEncoding('utf8');
        res.on('data', d => {
          body += d;
        });
        res.on('end', () => {
          //console.log(body);
          resolve(JSON.parse(body)["last"]);
        });
      });
      req.on('error', error => {
        console.log(error);
      });
      req.end();
    }) // promise
  } // getLastPrice()
} // CoinbaseProAPI



new CoinbaseProAPI().getLastPrice().then(body => {console.log(body)})
