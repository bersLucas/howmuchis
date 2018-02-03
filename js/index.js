let howmuchis = new Vue({
  el: '#app',
  data: {
    coinList: [],
    inputs: [{
      coin: 'placeholder'
    }],
    result: '',
  },
  methods: {
    calc: function() {
      let promises = howmuchis.inputs.map(function(input) {
        return getCall(input.coin.id)
          .then(function(response) {
            input.value = response.data[0].price_usd * input.amount;
            return input.value;
          })
      });

      axios.all(promises)
        .then(function(response) {
          howmuchis.result =
            response.reduce(function(total, current) {
              return total + current
            }, 0).toFixed(4);
        });
    },
    remove: function(inputToDelete) {
      howmuchis.inputs = howmuchis.inputs.filter(function(input) {
        return inputToDelete !== input;
      });

      if (howmuchis.inputs.length == 0) {
        howmuchis.addCoin()
      }
    },
    checkValid: function() {

    },
    addCoin: function() {
      howmuchis.inputs.push({
        coin: 'placeholder'
      })
    }
  }
});

const API_CALL = 'https://api.coinmarketcap.com/v1/ticker/';

let getCall = function(id) {
  return axios.get(API_CALL + id + '/');
}

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
