!function(){"use strict";function pad(str,max){return str=str.toString(),str.length<max?pad("0"+str,max):str}function css(element,property){var _property=window.getComputedStyle(element,null).getPropertyValue(property);return-1!=_property.indexOf("px")?parseInt(_property):_property}function Slice(elements){return Array.prototype.slice.call(elements)}function TSlider(){this._init()}window.requestAnimationFrame||(window.requestAnimationFrame=function(){return window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.oRequestAnimationFrame||window.msRequestAnimationFrame||function(callback){window.setTimeout(callback,1e3/60)}}()),TweenLite.defaultEase=Expo.easeOut,TSlider.prototype={_init:function(){this.isFF=!!navigator.userAgent.match(/firefox/i),this.evttype="click",this.Slider=document.getElementById("slider"),this.imagesCount=new Slice(this.Slider.querySelectorAll("img")).length,this.sldInterval=6e3,this.isAnimating=!1,this.current=0,this.minScale=.7,this._createSlider()},_createSlider:function(){var self=this;this.originalImgsEl=new Slice(this.Slider.querySelectorAll("img")),this.images=[];var _mainImagesEl=document.createElement("div");classie.addClass(_mainImagesEl,"mainImages"),this.Slider.appendChild(_mainImagesEl);var _backgroundImagesEl=document.createElement("div");classie.addClass(_backgroundImagesEl,"backgroundImages"),this.Slider.appendChild(_backgroundImagesEl);var _navigationEl=document.createElement("div");classie.addClass(_navigationEl,"navigation"),this.Slider.appendChild(_navigationEl),this.mainImages=this.Slider.querySelector(".mainImages"),this.backgroundImages=this.Slider.querySelector(".backgroundImages"),this.navigation=this.Slider.querySelector(".navigation"),this.navigation.innerHTML="<ul></ul>",this.originalImgsEl.forEach(function(el,i){var src=el.attributes.src.nodeValue,alt=el.attributes.alt.nodeValue,dataUrl=el.dataset.url;self.images.push({src:src,alt:alt,url:dataUrl,index:i}),self.Slider.removeChild(el)});for(var i=0;i<this.images.length;i++){var obj=this.images[i];this._createNewImgs(obj),this._createNavigation(obj)}this.sld=new Slice(this.Slider.querySelectorAll(".mi__img")),this.bgSld=new Slice(this.Slider.querySelectorAll(".bi__imgCont")),this.navItens=new Slice(this.navigation.querySelectorAll("li")),this._firstPosition()},_createNewImgs:function(obj){var _miImgEl=document.createElement("div"),_biContImgEl=document.createElement("div");classie.addClass(_miImgEl,"mi__img"),classie.addClass(_biContImgEl,"bi__imgCont"),_miImgEl.style.background="url("+obj.src+") no-repeat center center",_miImgEl.style.backgroundSize="cover",_miImgEl.style.zIndex=this.imagesCount-(obj.index+1),_biContImgEl.innerHTML='<div class="bi__imgCont-img bi-'+obj.index+'" />',this.mainImages.appendChild(_miImgEl),this.backgroundImages.appendChild(_biContImgEl);var bi=(obj.src.split(".jpg")[0],this.backgroundImages.querySelector(".bi__imgCont .bi-"+obj.index));bi.style.background="white no-repeat center top",bi.style.backgroundSize="cover",this.backgroundImages.style.display="none"},_createNavigation:function(obj){var a,liInfo,mask,ul=this.navigation.querySelector("ul"),_li=document.createElement("li"),number=pad(obj.index+1,2);classie.addClass(_li,"navItem-"+obj.index),_li.innerHTML='<a href=""></a><div class="li__info"></div><div class="li__info-mask"><div class="mask__infoContainer"></div></div><div class="li__hoverLine"><div class="l"></div></div>',ul.appendChild(_li),a=ul.querySelector(".navItem-"+obj.index+" a"),liInfo=ul.querySelector(".navItem-"+obj.index+" .li__info"),mask=ul.querySelector(".navItem-"+obj.index+" .mask__infoContainer"),a.setAttribute("href",obj.url);var info="<h5>"+number+"</h5><h4>"+obj.alt+"</h4>";liInfo.innerHTML=info,mask.innerHTML=info,mask.style.width=css(_li,"width")+"px",this.isFF&&(mask.style.width=css(_li,"width")+5+"px")},_firstPosition:function(){var self=this;TweenMax.set(this.navigation,{opacity:0,y:25}),this.sld.forEach(function(el,i){classie.addClass(el,"sld-"+i),0===i?TweenMax.set(el,{scale:1.3,opacity:0}):TweenMax.set(el,{scale:self.minScale,y:-window.innerHeight})}),this.bgSld.forEach(function(el,i){classie.addClass(el,"bg-"+i),TweenMax.set(el.querySelector(".bi__imgCont-img"),{scale:1.35,y:80}),el.style.zIndex=0,i===self.current&&(TweenMax.set(el.querySelector(".bi__imgCont-img"),{scale:1.5,y:0}),el.style.zIndex=self.current+2),i===self.current+1&&(el.style.zIndex=self.current+1)}),setTimeout(function(){self._enterAnimation()},1200)},_enterAnimation:function(){var self=this,t=new TimelineMax({paused:!0,onComplete:function(){self._startSlider(),self.backgroundImages.style.display="block"}});t.to(self.sld[self.current],2.5,{scale:1,opacity:1}),t.to(self.navigation,1.2,{opacity:1,y:0},.8),t.restart()},_startSlider:function(){function animateCurrNavItem(el){classie.addClass(el,"active"),el.querySelector(".li__info").style.opacity=.3,el.querySelector(".li__info-mask").style.opacity=1,TweenMax.to(el.querySelector(".li__info-mask"),self.sldInterval/1e3,{width:"100%",ease:Linear.easeNone,onComplete:function(){slidesTransitions()}})}function slidesTransitions(){var nextIndex=self.current<self.imagesCount-1?++self.current:0;classie.removeClass(currSlide,"active-slide"),classie.removeClass(currNavItem,"active"),TweenMax.set(currBgSlide,{top:0,bottom:"inherit"}),currNavItem.querySelector(".li__info").style.opacity=.7,TweenMax.to(currNavItem.querySelector(".li__info-mask"),.5,{opacity:0,onComplete:function(){currNavItem.querySelector(".li__info-mask").style.width="0%"}});var tm=new TimelineMax({onComplete:function(){TweenMax.killTweensOf(currSlide,currBgSlide),TweenMax.set(currSlide,{scale:self.minScale,y:-window.innerHeight}),TweenMax.set(currBgSlide,{height:"100%",top:"inherit",bottom:0}),TweenMax.set(currBgSldImage,{scale:1.35,y:80}),currBgSlide.style.zIndex=0,self.bgSld[nextIndex].style.zIndex=2,nextIndex+1>=self.imagesCount?self.bgSld[0].style.zIndex=1:self.bgSld[nextIndex+1].style.zIndex=1,self.current=nextIndex,self._startSlider()}});tm.to(currSlide,1.5,{scale:.8}),tm.to(currBgSldImage,1.2,{scale:1.35},.15),tm.to(currSlide,1.2,{y:window.innerHeight},.8),tm.to(currBgSlide,1.2,{height:"0%"},.8),tm.to(self.sld[nextIndex],1.2,{y:0},.8),tm.to(self.sld[nextIndex],1.5,{scale:1},1.8),tm.to(self.bgSld[nextIndex].querySelector(".bi__imgCont-img"),1.5,{y:0},1),tm.to(self.bgSld[nextIndex].querySelector(".bi__imgCont-img"),1.5,{scale:1.5},1.8)}var self=this,currSlide=this.sld[this.current],currNavItem=this.navItens[this.current],currBgSlide=this.bgSld[this.current],currBgSldImage=currBgSlide.querySelector(".bi__imgCont-img");animateCurrNavItem(currNavItem),classie.addClass(currSlide,"active-slide")}};new TSlider}();