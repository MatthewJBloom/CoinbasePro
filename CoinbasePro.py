'''
CoinbasePro.py
Class for integrating the Coinbase Pro API
Docs: https://docs.pro.coinbase.com/
'''

import requests
import logging


logging.basicConfig(level=logging.DEBUG)
BASE_URL = 'https://api.pro.coinbase.com'


class CoinbasePro():

    def get_products(self):
        '''Get a list of available currency pairs for trading.'''
        endpoint = '/products'
        r = requests.get(BASE_URL+endpoint)
        return r.json()

    def get_product(self, product='BTC-USD'):
        '''Get market data for a specific currency pair.'''
        endpoint = '/products/'+product
        r = requests.get(BASE_URL+endpoint)
        return r.json()

    def get_product_book(self, product='BTC-USD', level=None):
        '''Get a list of open orders for a product.
        The amount of detail shown can be customized with the level parameter.
        Level 1: (default) Only the best bid & ask
        Level 2: Top 50 bids & asks (aggregated)
        Level 3: Full order book (non aggregated)
        DO NOT POLL LEVEL 3. IT WILL GET YOU BLOCKED.
        '''
        endpoint = '/products/'+product+'/book'
        if level is not None:
            endpoint = endpoint+'?level='+level
        r = requests.get(BASE_URL+endpoint)
        return r.json()

    def get_product_ticker(self, product='BTC-USD'):
        '''Snapshot information about the last trade (tick), best bid/ask,
        and 24h volume.'''
        endpoint = '/products/'+product+'/ticker'
        r = requests.get(BASE_URL+endpoint)
        return r.json()

    def get_product_trades(self, product='BTC-USD'):
        '''List the latest trades for a product.'''
        endpoint = '/products/'+product+'/trades'
        r = requests.get(BASE_URL+endpoint)
        return r.json()

    def get_product_candles(self, product='BTC-USD',
            start=None, end=None, granularity=60):
        '''Historic rates for a product. Rates are returned in grouped buckets
        based on requested granularity.
        start: Start time in ISO 8601
        end: End time in ISO 8601
        granularity: Desired timeslice in seconds
        '''
        endpoint = '/products/'+product+'/candles?granularity='+str(granularity)
        if start is not None and end is not None:
            endpoint = endpoint+'&start='+start+'&end='+end
        r = requests.get(BASE_URL+endpoint)
        return r.json()

    def get_24h_stats(self, product='BTC-USD'):
        '''Get 24 hr stats for the product. Volume is in base currency units.
        Open, High, Low are in quote currency units.'''
        endpoint = '/products/'+product+'/stats'
        r = requests.get(BASE_URL+endpoint)
        return r.json()
