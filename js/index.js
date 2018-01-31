let howmuchis = new Vue({
  el: '#app',
  data: {
    coinList: [],
    selected: {},
    test: 'data',
    result: '',
  },
  methods: {
    calc: function() {
      axios.get('https://api.coinmarketcap.com/v1/ticker/' + howmuchis.selected.coin + '/')
        .then(function(response) {
          howmuchis.coinList = howmuchis.coinList.map(function(coin){
            coin.price_usd = (coin.id === howmuchis.selected.coin) ?
              response.data[0].price_usd :
              null;
            return coin;
          });

          howmuchis.result = parseInt(response.data[0].price_usd) * howmuchis.selected.amount;
        })
    }
  }
});

howmuchis.coinList = [
  {
    id: 'bitcoin',
    desc: 'Bitcoin',
  },
  {
    id: 'monero',
    desc: 'Monero'
  },
  {
    id: 'ethereum',
    desc: 'Ethereum'
  },
  {
    id: 'raiblocks',
    desc: 'Raiblocks'
  }
];
