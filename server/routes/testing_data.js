const express = require('express');

const router = express.Router();


router.get("", (req, res) => {
    res.status(200).json({
        "listings":{
           "BANANAS":{
              "denomination":1,
              "product":"BANANAS",
              "symbol":"BANANAS"
           },
           "PEARLS":{
              "denomination":1,
              "product":"PEARLS",
              "symbol":"PEARLS"
           }
        },
        "market_trades":{
           "BANANAS":[
              {
                 "buyer":"",
                 "price":4945.0,
                 "quantity":1,
                 "seller":"",
                 "symbol":"BANANAS",
                 "timestamp":1400
              }
           ],
           "PEARLS":[
              {
                 "buyer":"",
                 "price":10004.0,
                 "quantity":1,
                 "seller":"",
                 "symbol":"PEARLS",
                 "timestamp":500
              },
              {
                 "buyer":"",
                 "price":10002.0,
                 "quantity":1,
                 "seller":"",
                 "symbol":"PEARLS",
                 "timestamp":500
              }
           ]
        },
        "observations":{
           
        },
        "order_depths":{
           "BANANAS":{
              "buy_orders":{
                 "4944":20,
                 "4945":2,
                 "4950":1
              },
              "sell_orders":{
                 "4951":-22
              }
           },
           "PEARLS":{
              "buy_orders":{
                 "9995":20,
                 "9996":2,
                 "10002":1
              },
              "sell_orders":{
                 "10004":-2,
                 "10005":-20
              }
           }
        },
        "own_trades":{
           "BANANAS":[
              {
                 "buyer":"SUBMISSION",
                 "price":4950.0,
                 "quantity":2,
                 "seller":"",
                 "symbol":"BANANAS",
                 "timestamp":1000
              }
           ]
        },
        "position":{
           "BANANAS":19
        },
        "timestamp":1500
     });
});

module.exports = router;
