var tplSearch = require('../templates/show.string');

SPA.defineView('show', {
  html: tplSearch,

plugins: ['delegated', {
    name: 'avalon',
    options: function(vm) {
      vm.livelist = [];
    }
}],
init: {
  vm:null,
  livelistArray: [],
  homeSwiper: null,
  homeHotSwiper: null,
  formatData: function(arr) {
    var tempArr = [];
    for (var i = 0; i < Math.ceil(arr.length / 1); i++) {
      tempArr[i] = [];
      tempArr[i].push(arr[1 * i]);
      tempArr[i].push(arr[1 * i + 1]);
      tempArr[i].push(arr[1 * i + 2]);
    }
    return tempArr;
  }

},
bindEvents: {
  'show': function() {
    var runnavScroll = this.widgets['runnav-scroll'];
    runnavScroll.options.scrollX = true;
    runnavScroll.options.scrollY = false;
    }
  }

});
