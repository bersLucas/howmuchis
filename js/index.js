let howmuchis = new Vue({
  el: '#app',
  data: {
    coinList: [],
    inputs: [{
      coin: 'placeholder'
    }],
    test: 'data',
    result: '',
  },
  methods: {
    calc: function() {
      axios.get('https://api.coinmarketcap.com/v1/ticker/' + howmuchis.selected.coin + '/')
        .then(function(response) {
          howmuchis.coinList = howmuchis.coinList.map(function(coin) {
            coin.price_usd = (coin.id === howmuchis.selected.coin) ?
              response.data[0].price_usd :
              null;
            return coin;
          });

          howmuchis.result = parseInt(response.data[0].price_usd) * howmuchis.selected.amount;
        })
    },
    getIcon: function(coin) {
      return "node_modules/cryptocoins-icons/SVG/" + coin.icon;
    },
    checkValid: function() {

    },
    addCoin: function() {
      howmuchis.inputs.push({coin:'placeholder'})
    }
  }
});

howmuchis.coinList = [{
    id: 'bitcoin',
    desc: 'Bitcoin',
    icon: 'BTC.svg',
  },
  {
    id: 'monero',
    desc: 'Monero',
    icon: 'XMR.svg',
  },
  {
    id: 'ethereum',
    desc: 'Ethereum',
    icon: 'ETH.svg',
  }
];
