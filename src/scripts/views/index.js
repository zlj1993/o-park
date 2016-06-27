var tplIndex = require('../templates/index.string');

var util = require('../utils/fn.js');

SPA.defineView('index', {
  html: tplIndex,
  plugins:['delegated'],

  init: {
    'setFocus': function (e) {
      $(e.el).addClass('active').siblings().removeClass('active');
    }
  },

  modules:[{
      name:'content',
      views:['home','show','my'],
      defaultTag:'home',
      container:'.l-container'
  }],

  bindActions:{
    'switch-tabs':function(e,data){
      console.log(e);
       util.setFocus(e.el);
       this.modules.content.launch(data.tag);
    },
    'exit':function(e,data){
      util.setFocus(e.el);
      this.hide();
    }
  },
  bindEvents: {
    show: function () {
      var mySwiper = new Swiper('#guide-swiper', {
        loop: false
      })
    }
  }
});
