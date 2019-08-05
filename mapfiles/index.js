$(function(){
	
	//设置地图显示区域大小。（为浏览器打开大小）
    $("#googleMap").css({
    	"width":$(window).width(),
    	"height":$(window).height()
    });
	
	//设置浏览器加载完成后执行事件
    window.onload = function(){
		initialize();
	};
	  
	function initialize() {
		
		var map;
		//初始化本地地图
		function LocalMapType() {}
		LocalMapType.prototype.tileSize = new google.maps.Size(256, 256);
		LocalMapType.prototype.maxZoom = 21;   //地图显示最大级别
		LocalMapType.prototype.minZoom = 3;    //地图显示最小级别
		LocalMapType.prototype.getTile = function(coord, zoom, ownerDocument) {
			var img = ownerDocument.createElement("img");
			img.style.width = this.tileSize.width + "px";
			img.style.height = this.tileSize.height + "px";
			//地图存放路径
			mapPicDir = " maptile/roadmap/";		
			var curSize = Math.pow(2,zoom);
			strURL = mapPicDir + zoom + "/" + (coord.x % curSize )+ "/" + (coord.y % curSize)+ ".png";
			img.src = strURL;
			return img;
		};

		function Electronics(){
			LocalMapType.prototype.getTile = function(coord, zoom, ownerDocument) {
				var img = ownerDocument.createElement("img");
				img.style.width = this.tileSize.width + "px";
				img.style.height = this.tileSize.height + "px";
				mapPicDir = " maptile/roadmap/";	
				var curSize = Math.pow(2,zoom);
				strURL = mapPicDir + zoom + "/" + (coord.x % curSize )+ "/" + (coord.y % curSize)+ ".png";
				img.src = strURL;
				return img;
			};
			var localMapType = new LocalMapType();
			map.mapTypes.set('localMap', localMapType);   //绑定本地地图类型
        	map.setMapTypeId('localMap');    //指定显示本地地图
		}
		
		function Satellite(){
			LocalMapType.prototype.getTile = function(coord, zoom, ownerDocument) {
				var img = ownerDocument.createElement("img");
				img.style.width = this.tileSize.width + "px";
				img.style.height = this.tileSize.height + "px";
				mapPicDir = " maptile/mapabc/";
				var curSize = Math.pow(2,zoom);
				strURL = mapPicDir + zoom + "/" + (coord.x % curSize )+ "/" + (coord.y % curSize)+ ".jpg";
				img.src = strURL;
				return img;
			};
			var localMapType = new LocalMapType();
			map.mapTypes.set('localMap', localMapType);   //绑定本地地图类型
        	map.setMapTypeId('localMap');    //指定显示本地地图
		}
		
		$(".btn_switch").click(function(){
			if($(this).attr("title")=="electronics"){
				$(this).addClass("selected")
				$(".satellite").removeClass("selected")
				Electronics();
			}else if($(this).attr("title")=="satellite"){
				$(this).addClass("selected")
				$(".electronics").removeClass("selected")
				Satellite();
			}
		})
		
  
		var localMapType = new LocalMapType();
		
		
        var myLatlng = new google.maps.LatLng(30.587, 114.312);
        var mapOptions = {
			center:myLatlng,
			zoom:1,
	        //初始化地图视图。
	        /*
        		可用参数及说明如下
        		ROADMAP：用于显示默认的道路地图视图
	        	SATELLITE：显示 Google 地球卫星图片
	        	HYBRID：同时显示普通视图和卫星视图
	        	TERRAIN：用于根据地形信息显示实际地图
	        */
	        mapTypeId:google.maps.MapTypeId.ROADMAP,
	        //初始化地图控件
			panControl: false,
			zoomControl: true,
			mapTypeControl: false,
			scaleControl: false,
			streetViewControl: false,
			overviewMapControl: false,
			rotateControl:false,
	        //修改地图切换控件
		    mapTypeControlOptions: {
		    	//修改地图切换控件为下拉列表
		    	//style:google.maps.MapTypeControlStyle.DROPDOWN_MENU,
		    	//修改地图切换空间位置为居中
		    	//position:google.maps.ControlPosition.TOP_CENTER,
		    },
		    zoomControlOptions: {
			  	//style:google.maps.ZoomControlStyle.SMALL,
			},
        }


		
		
        map = new google.maps.Map(document.getElementById('googleMap'), mapOptions);
		map.mapTypes.set('localMap', localMapType);   //绑定本地地图类型
        map.setMapTypeId('localMap');    //指定显示本地地图
//		map.setOptions({draggable: true});
		
		//点击地图获取经纬度
//	    google.maps.event.addListener(map,"click",function(event){
//	    	var a = event.latLng.toString().replace(/\)/,"").replace(/\(/,"当前经纬度为：")
//			alert(a)
//	    })
//		
		var center = new google.maps.LatLng(31.2785055728,86.2206398078);
		
	    var myCity = new google.maps.Circle({
			center:center,
			radius:200000,
			strokeColor:"#0000FF",
			strokeOpacity:0.8,
			strokeWeight:2,
			fillColor:"#0000FF",
			fillOpacity:0.4,
			editable:false,
		});
		myCity.setMap(map);
		
	}
	
})