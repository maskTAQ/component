function  turntable(options){
	this.options = options;
	this.isRotate = false;
	this.drawRouletteWheel();
	
}
turntable.prototype = {
	constructor:turntable,
	drawRouletteWheel:function(){
		$(this.options.ele).append('<canvas  id="turntable" width="'+$(this.options.ele).width()+'" height="'+$(this.options.ele).height()+'"></canvas>')
		var canvas = document.getElementById("turntable");    
		if (canvas.getContext) {
	  //根据奖品个数计算圆周角度
	  var arc = Math.PI / (this.options.restaraunts.length/2);
	  var ctx = canvas.getContext("2d");
	  //在给定矩形内清空一个矩形
	  ctx.clearRect(0,0,516,516);

	  
	  //font 属性设置或返回画布上文本内容的当前字体属性
	  ctx.font = 'bold 22px Microsoft YaHei';      
	  for(var i = 0; i < this.options.restaraunts.length; i++) {       
	  	var angle = this.options.startAngle + i * arc;
	  	ctx.fillStyle = this.options.colors[i];
	  	ctx.strokeStyle = this.options.fontcolors[i];
		   //strokeStyle 属性设置或返回用于笔触的颜色、渐变或模式  
		   ctx.beginPath();
		  //arc(x,y,r,起始角,结束角,绘制方向) 方法创建弧/曲线（用于创建圆或部分圆）    
		  ctx.arc(258, 258, this.options.outsideRadius, angle, angle + arc, false);    
		  ctx.arc(258, 258, this.options.insideRadius, angle + arc, angle, true);
		  ctx.stroke();  
		  ctx.fill();
		  //锁画布(为了保存之前的画布状态)
		  ctx.save();   
		  
		  //----绘制奖品开始----

		  ctx.fillStyle = this.options.fontcolors[i];
		  var text = this.options.restaraunts[i];
		  var line_height = 30;
		  //translate方法重新映射画布上的 (0,0) 位置
		  ctx.translate(258 + Math.cos(angle + arc / 2) * this.options.textRadius, 258 + Math.sin(angle + arc / 2) * this.options.textRadius);
		  
		  //rotate方法旋转当前的绘图
		  ctx.rotate(angle + arc / 2 + Math.PI / 2);
		  
		  /** 下面代码根据奖品类型、奖品名称长度渲染不同效果，如字体、颜色、图片效果。(具体根据实际情况改变) **/
		  if(text.indexOf("\n")>0){//换行
		  	var texts = text.split("\n");
		  	for(var j = 0; j<texts.length; j++){
		  		ctx.font = j == 0?'bold 22px Microsoft YaHei':'bold 22px Microsoft YaHei';
				  //ctx.fillStyle = j == 0?'#FFFFFF':'#FFFFFF';
				  if(j == 0){
					  //ctx.fillText(texts[j]+"M", -ctx.measureText(texts[j]+"M").width / 2, j * line_height);
					  ctx.fillText(texts[j], -ctx.measureText(texts[j]).width / 2, j * line_height);
					}else{
						ctx.fillText(texts[j], -ctx.measureText(texts[j]).width / 2, j * line_height);
					}
				}
		  }else if(text.indexOf("\n") == -1 && text.length>6){//奖品名称长度超过一定范围 
		  	text = text.substring(0,6)+"||"+text.substring(6);
		  	var texts = text.split("||");
		  	for(var j = 0; j<texts.length; j++){
		  		ctx.fillText(texts[j], -ctx.measureText(texts[j]).width / 2, j * line_height);
		  	}
		  }else{

			  //在画布上绘制填色的文本。文本的默认颜色是黑色
			  //measureText()方法返回包含一个对象，该对象包含以像素计的指定字体宽度
			  ctx.fillText(text, -ctx.measureText(text).width / 2, 0);
			}

		  //把当前画布返回（调整）到上一个save()状态之前 
		  ctx.restore();
		  //----绘制奖品结束----
		}     
	}},
	start:function(i,d,c){
		if(!i){
			alert('客官，你该吃药了！')
		}
		if(this.isRotate){
			console.log('客官慢一点')
			return
		}
		var angles =i * (360 / this.options.restaraunts.length) - (360 / (this.options.restaraunts.length*2)),_this = this;
		if(angles<270){
			angles = 270 - angles; 
		}else{
			angles = 360 - angles + 270;
		}
		this.isRotate = true;
		$('#turntable').stopRotate();
		$('#turntable').rotate({
			angle:0,
			animateTo:angles+1800,
			duration:(typeof d)==='number'?d*1000:6000,
			callback:function (){
				({}).toString.call(d) ==="[object Function]" && d();
				({}).toString.call(c) ==="[object Function]" && c();
				_this.isRotate = false;
			}
		});
	}
}