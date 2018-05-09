function initMap(){createMap(),setMapEvent(),addMapControl(),addMarker()}function createMap(){var map=new BMap.Map("dituContent"),point=new BMap.Point(121.555579,31.272825);map.centerAndZoom(point,17),window.map=map}function setMapEvent(){map.enableDragging(),map.enableScrollWheelZoom(),map.enableDoubleClickZoom(),map.enableKeyboard()}function addMapControl(){var ctrl_nav=new BMap.NavigationControl({anchor:BMAP_ANCHOR_TOP_LEFT,type:BMAP_NAVIGATION_CONTROL_LARGE});map.addControl(ctrl_nav);var ctrl_ove=new BMap.OverviewMapControl({anchor:BMAP_ANCHOR_BOTTOM_RIGHT,isOpen:1});map.addControl(ctrl_ove);var ctrl_sca=new BMap.ScaleControl({anchor:BMAP_ANCHOR_BOTTOM_LEFT});map.addControl(ctrl_sca)}function addMarker(){for(var i=0;i<markerArr.length;i++){var json=markerArr[i],p0=json.point.split("|")[0],p1=json.point.split("|")[1],point=new BMap.Point(p0,p1),iconImg=createIcon(json.icon),marker=new BMap.Marker(point,{icon:iconImg}),label=(createInfoWindow(i),new BMap.Label(json.title,{offset:new BMap.Size(json.icon.lb-json.icon.x+10,-20)}));marker.setLabel(label),map.addOverlay(marker),label.setStyle({borderColor:"#808080",color:"#333",cursor:"pointer"}),function(){var _iw=createInfoWindow(i),_marker=marker;_marker.addEventListener("click",function(){this.openInfoWindow(_iw)}),_iw.addEventListener("open",function(){_marker.getLabel().hide()}),_iw.addEventListener("close",function(){_marker.getLabel().show()}),label.addEventListener("click",function(){_marker.openInfoWindow(_iw)}),json.isOpen&&(label.hide(),_marker.openInfoWindow(_iw))}()}}function createInfoWindow(i){var json=markerArr[i],iw=new BMap.InfoWindow("<b class='iw_poi_title' title='"+json.title+"'>"+json.title+"</b><div class='iw_poi_content'>"+json.content+"</div>");return iw}function createIcon(json){var icon=new BMap.Icon("http://app.baidu.com/map/images/us_mk_icon.png",new BMap.Size(json.w,json.h),{imageOffset:new BMap.Size(-json.l,-json.t),infoWindowOffset:new BMap.Size(json.lb+5,1),offset:new BMap.Size(json.x,json.h)});return icon}var markerArr=[{title:"杨树浦路2525",content:"我的备注",point:"121.557761|31.274384",isOpen:0,icon:{w:21,h:21,l:0,t:0,x:6,lb:5}}];initMap();