var oNavlist=document.getElementById("nav").children;
var slider=document.getElementById("slider");
var left=document.getElementById("left");
var right=document.getElementById("right");
var index=1;
var timer;
var isMoving=false;
var a=document.getElementsByClassName("text")[0];
animate2(a,{right:980},function(){});
setInterval(function(){
	a.style.right="-500px";
	animate2(a,{right:980},function(){});},10000);
//下一张图片
function next(){
	if(!isMoving){
		isMoving=true;
		index++;
		navchange();
		animate1(slider,{left:-1200*index},function(){
			if (index===6) {
				slider.style.left="-1200px";
				index=1;
			}
			isMoving=false;
		});
	}
}

var timer=setInterval(next,2000);
//鼠标滑入清除定时器
box.onmouseover=function(){
	animate1(left,{opacity:50});
	animate1(right,{opacity:50});
	clearInterval(timer);
}
//划出开始定时器；
box.onmouseout=function(){
	animate1(left,{opacity:0});
	animate1(right,{opacity:0});
	timer=setInterval(next,2000);
}
right.onclick=next;
left.onclick=pre;
//按钮点击
for (var i=0; i<oNavlist.length ; i++) {
	oNavlist[i].idx=i;//给对象加属性
	oNavlist[i].onclick=function(){
		index=this.idx+1;
		navchange();
		animate1(slider,{left:-1200*index});
	}
}
//前一张图片
function pre(){
	if (isMoving) {
		return;
	}
	isMoving=true;
	index--;
	navchange();
	animate1(slider,{left:-1200*index},function(){
		if (index===0) {
			slider.style.left="-6000px";
			index=5;
		}
		isMoving=false;
	});
}
//背景色
function navchange(){
	for (var i = 0; i < oNavlist.length; i++) {
		oNavlist[i].className="";
	}
	if (index==0) {
		oNavlist[4].className='active';
	}
	else if (index===6) {
		oNavlist[0].className='active';
	}else{
		oNavlist[index-1].className='active';
    }
}
function getStyle(obj, attr){
	if(obj.currentStyle){
		return obj.currentStyle[attr];
	} else {
		return getComputedStyle(obj, null)[attr];
	}
}
//变速滑动（图片轮播）
function animate1(obj,json,callback){
	clearInterval(obj.timer);
	obj.timer = setInterval(function(){
		var isStop = true;
		for(var attr in json){
			var now = 0;
			if(attr == 'opacity'){
				now = parseInt(getStyle(obj,attr)*100);
			}else{
				now = parseInt(getStyle(obj,attr));
			}
			var speed=(json[attr]-now)/8;
			speed=speed>0?Math.ceil(speed):Math.floor(speed);
			var cur = now + speed;
			if(attr == 'opacity'){
				obj.style[attr] = cur / 100;
			}else{
				obj.style[attr] = cur + 'px';
			}
			if(json[attr] !== cur){
				isStop = false;
			}
		}
		if(isStop){
			clearInterval(obj.timer);
			callback&&callback();
		}
	}, 10)
}
//匀速滑动
function animate2(obj,json,callback){
	clearInterval(obj.timer);
	obj.timer = setInterval(function(){
		var isStop = true;
		for(var attr in json){
			var now = 0;
			if(attr == 'opacity'){
				now = parseInt(getStyle(obj,attr)*100);
			}else{
				now = parseInt(getStyle(obj,attr));
			}
			var cur = now + 1;
			if(attr == 'opacity'){
				obj.style[attr] = cur / 100;
			}else{
				obj.style[attr] = cur + 'px';
			}
			if(json[attr] !== cur){
				isStop = false;
			}
		}
		if(isStop){
			clearInterval(obj.timer);
			callback&&callback();
		}
	}, 10)
}