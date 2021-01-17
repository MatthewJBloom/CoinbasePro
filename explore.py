'''
Scratchpad for exploration testing of CoinbasePro
'''


import json
import CoinbasePro


cb = CoinbasePro.CoinbasePro()

# products = cb.get_products()
# products_ids = []
# for p in products:
#     products_ids.append(p['id'])
# print(json.dumps(products_ids, indent=2))

# btc = cb.get_product()
# print(json.dumps(btc, indent=2))

btc_book = cb.get_product_book()
print(json.dumps(btc_book, indent=2))
