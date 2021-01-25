'''
Testing suite for CoinbasePro
'''


import logging
import CoinbasePro


logging.basicConfig(level=logging.DEBUG)

'''Test CoinbasePro----------------------------------------------------------'''

logging.info('Testing CoinbasePro()')
cb = CoinbasePro.CoinbasePro()

'''Test get_products()-------------------------------------------------------'''

logging.info('Testing get_products()')
products = cb.get_products()

# get_products() should return a list
assert isinstance(products, list)
logging.info('get_products() returned list')

# get_products() returned list should contain only dicts
for product in products:
    assert isinstance(product, dict)
logging.info('get_products() list contains only dicts')

# get_products() should include a dict with "id": "BTC-USD"
products_ids = []
for product in products:
    products_ids.append(product['id'])
assert 'BTC-USD' in products_ids
logging.info('get_products() includes BTC-USD')

'''Test get_product()--------------------------------------------------------'''

logging.info('Testing get_product()')
product = cb.get_product()

# get_product() should return a dict
assert isinstance(product, dict)
logging.info('get_product() returned dict')

# get_product() should return BTC-USD by default
assert product['id'] == 'BTC-USD'
logging.info('get_product() returned BTC-USD')

'''Test get_product_book()---------------------------------------------------'''

logging.info('Testing get_product_book()')
product_book = cb.get_product_book()

# get_product_book() should return a dict
assert isinstance(product_book, dict)
logging.info('get_product_book() returned dict')

# get_product_book() dict should contain bids, asks, & sequence
assert 'bids' in product_book
assert 'asks' in product_book
assert 'sequence' in product_book
logging.info('get_product_book() returned bids, asks, & sequence')

'''Test get_product_ticker()-------------------------------------------------'''

logging.info('Testing get_product_ticker()')
ticker = cb.get_product_ticker()

# get_product_ticker() should return a dict
assert isinstance(ticker, dict)
logging.info('get_product_ticker() returned dict')

# get_product_ticker() should return info about the last trade
assert 'price' in ticker
assert 'size' in ticker
logging.info('get_product_ticker() included trade info')

'''Test get_product_trades()-------------------------------------------------'''

logging.info('Testing get_product_trades()')
trades = cb.get_product_trades()

# get_product_trades() should return a list
assert isinstance(trades, list)
# get_product_trades() should return dicts containing prices and sizes
for trade in trades:
    assert isinstance(trade, dict)
    assert 'price' in trade
    assert 'size' in trade
logging.info('get_product_trades() returned a list of dicts containing price')

'''Test get_product_candles()------------------------------------------------'''

logging.info('Testing get_product_candles()')
candles = cb.get_product_candles()

# get_product_candles() should return a list of lists
assert isinstance(candles, list)
# get_product_candles() should return 6 items per list
# [ time, low, high, open, close, volume ]
for candle in candles:
    assert isinstance(candle, list)
    assert len(candle) == 6
logging.info('get_product_candles() returned list of 6 item lists')

'''Test get_24h_stats()------------------------------------------------------'''

logging.info('Testing get_24h_stats()')
stats = cb.get_24h_stats()

# get_24h_stats() should return a dict with high, low, volume, etc.
assert isinstance(stats, dict)
assert 'volume' in stats
assert 'high' in stats
assert 'low' in stats
logging.info('get_24h_stats() returned dict with appropriate info')


'''--------------------------------------------------------------------------'''

logging.info('All tests passed!')
