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
            input.value = response.data[0].price_usd * input.amount;
            return input.value;
          })
      });

      axios.all(promises)
        .then(function(response) {
          this.result =
            response.reduce(function(total, current) {
              return total + current
            }, 0).toFixed(4);
        });
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
