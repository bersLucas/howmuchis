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
      let promises = this.inputs.map(function(input) {
        return getCall(input.coin.id)
          .then(function(response) {
            input.value = response[0].price_usd * input.amount;
            return input.value;
          })
      });

      Promise.all(promises)
        .then(function(response) {
          console.log(response)
          howmuchis.result =
            response.reduce(function(total, current) {
              return total + current
            }, 0);
        });
    },
    decimalPlaces: function(value, places) {
      return value.toFixed(places);
    },
    remove: function(inputToDelete) {
      this.inputs = this.inputs.filter(function(input) {
        return inputToDelete !== input;
      });

      if (this.inputs.length == 0) {
        this.addCoin()
      }
    },
    checkInvalid: function() {
      return this.inputs.some(function(input) {
        return input === {
            coin: 'placeholder'
          } ||
          !input.amount;
      })
    },
    addCoin: function() {
      this.inputs.push({
        coin: 'placeholder'
      })
    }
  }
});

const API_CALL = 'https://api.coinmarketcap.com/v1/ticker/';

let getCall = function(id) {
  return fetch(API_CALL + id + '/')
  .then(res => res.json());
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
