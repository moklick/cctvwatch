;(function(window,document,$,undefined){

	'use strict';
	window.cctv = window.cctv || {};
	window.cctv.client = {
		url:'http://192.168.67.153:1337/cctv',

		getCamsInRect: function(bl, tr, callBack){
			$.ajax({
				url:this.url+'/within?bottomleft='+bl.lat+','+bl.long+'&topright='+tr.lat+','+tr.long,
				dataType:'json',
				type:'GET'
			})
			.done(callBack)
			.fail(callBack);
		},
		setNewCam:function(lat,long,callBack){
			$.ajax({
				url:this.url+'/create?'+lat+long,
				dataType:'json',
				type:'PUT'
			})
			.done(callBack)
			.fail(callBack);
		},
		addData: function(camId, data){
			$.ajax({
				url:this.url+'/update?'+id+long,
				dataType:'json',
				type:'PUT'
			})
			.done(callBack)
			.fail(callBack);
		},

		}
	};
}(window,document,jQuery));