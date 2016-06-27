var tplHome = require('../templates/home.string');
// 引用公共方法
var util = require('../utils/fn.js');
SPA.defineView('home', {
	html: tplHome,

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
			for (var i = 0; i < Math.ceil(arr.length / 3); i++) {
				tempArr[i] = [];
				tempArr[i].push(arr[3 * i]);
				tempArr[i].push(arr[3 * i + 1]);
				tempArr[i].push(arr[3 * i + 2]);
			}
			return tempArr;
		}

	},
	bindEvents: {
		'beforeShow': function() {
      var that = this;
			that.vm = that.getVM();
			$.ajax({
				url: '/api/getLivelist.php',
				type: 'get',
				data: {
					rtype: 'origin'
				},
				success: function(rs) {
					that.livelistArray = rs.data;
					that.vm.livelist = that.formatData(rs.data);
				}
			});
		},
		'show': function() {
			var lifenavScroll = this.widgets['lifenav-scroll'];
			lifenavScroll.options.scrollX = true;
			lifenavScroll.options.scrollY = false;

			var that = this;
			var scrollSize = 30;
			var myScroll = this.widgets.homeHotScroll;
			myScroll.scrollBy(0, -scrollSize);
			console.log(myScroll);
			var head = $('.head img'),
				topImgHasClass = head.hasClass('up');
			var foot = $('foot img'),
				bottomImgHasClass = head.hasClass('down');
			myScroll.on('scroll', function() {

				var y = this.y,
					maxY = this.maxScrollY - y;
				if (y >= 0) {
					!topImgHasClass && head.addClass('up');
					return '';
				}
				if (maxY >= 0) {
					!topImgHasClass && foot.addClass('down');
					return '';
				}
			});
			myScroll.on('scrollEnd', function() {

				if (this.y >= -scrollSize && this.y < 0) {
					myScroll.scrollTo(0, -scrollSize);
					head.removeClass('up');
				} else if (this.y >= 0) {
					// head.attr('src', '/ox-park/img/ajax-loader.gif');
					//ajax 下拉刷新数据
					// $.ajax({
					// 	url: '/api/getLivelist.php',
					// 	data: {
					// 		rtype: 'refresh'
					// 	},
					// 	success: function(rs) {
					// 		var newArray = rs.data.concat(that.livelistArray);
					// 		that.vm.livelist = that.formatData(newArray);
					// 		that.livelistArray = newArray;
					//
					// 		myScroll.scrollTo(0, -scrollSize);
					// 		head.removeClass('up');
					// 		head.attr('src', '/ox-park/img/arrow.png');
					// 	}
					// })
				}
				var maxY = this.maxScrollY - this.y;
				var self = this;
				if (maxY > -scrollSize && maxY < 0) {
					myScroll.scrollTo(0, self.maxScrollY + scrollSize);
					foot.removeClass('down')
				} else if (maxY >= 0) {

					//ajax上拉加载
					$.ajax({
						url: '/api/getLivelist.php',
						data: {
							rtype: 'more'
						},
						success: function(rs) {
							console.log(rs);
							var newArray = that.livelistArray.concat(rs.data);
							that.vm.livelist = that.formatData(newArray);
							that.livelistArray = newArray;
							myScroll.refresh();
							myScroll.scrollTo(0, self.y + scrollSize);
							// foot.removeClass('down');
							// foot.attr('src', '/ox-park/img/arrow.png');
						}
					});
        }
			})
		}
	},
	bindActions: {
		'tap.slide': function(e, data) {
			this.mySwiper.slideTo($(e.el).index())
		}
	}
});
