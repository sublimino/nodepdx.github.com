var demoContext = {
	circles: new Array(),
    totalCircles: 1000,
    interval: 8000,
    radius: 5,
    circleContext: null,
    textureContext: null,
    imagesLoaded:false,
    generalWindX:Math.sin(Math.random()*360)*3,
    generalWindY: Math.cos(Math.random()*360)*3,
    message: ['logo','num','n','o','d','e','-','p','d','x'],
    messageColors: ['#00FFFF','#FFFFFF','#4887A2','#4887A2','#4887A2','#4887A2','#FAEB24','#8A8A8A','#8A8A8A','#8A8A8A'],
    letters: {},
	messageIndex: 0,
    color: "",//"#0000FF",
    backgroundImages: new Array(),
    backgroundImagesIndex: 0,
    backgroundContext: null,
    currentImage: null,
    currentImage_alpha: .5,
    x_offset: 0,
    y_offset: 0,
    bg_index_mod: 1,
    rad: 5
};
for(var l=0; l<demoContext.message.length; l++){
    var img = new Image();
	img.src = demoContext.message[l]+".png";
	demoContext.letters[demoContext.message[l]]={ "img": img, color: demoContext.messageColors[l]};
}
for(var l=0; l<8; l++){
    var img = new Image();
	img.src =l+"_bg.png";
	demoContext.backgroundImages[l] =img;
}

function Circle(x,y,r){
	this.x=x;
	this.y=y;
	this.r=r;
	this.destX=-1;
	this.destY=-1;
	this.alpha=0;
	this.vx=Math.random()-.5*5;
	this.vy=Math.random()-.5*5;
	return true;
}
function init(){
	window.onload = window.onresize = function() {
		var C = 1.0;        // canvas width to viewport width ratio
		var W_TO_H = 2/1;   // canvas width to canvas height ratio

		// For IE compatibility http://www.google.com/search?q=get+viewport+size+js
		var viewportWidth = window.innerWidth;
		var viewportHeight = window.innerHeight;

		var canvasWidth = viewportWidth * C;
		var canvasHeight = viewportHeight; //canvasWidth / W_TO_H;

		var el = document.getElementById("circle_canvas");
		el.style.position = "fixed";
		el.setAttribute("width", canvasWidth);
		el.setAttribute("height", canvasHeight);
		el.style.top = (viewportHeight - canvasHeight) / 2;
		el.style.left = (viewportWidth - canvasWidth) / 2;

		el = document.getElementById("background_canvas");
		el.style.position = "fixed";
		el.setAttribute("width", canvasWidth);
		el.setAttribute("height", canvasHeight);
		el.style.top = (viewportHeight - canvasHeight) / 2;
		el.style.left = (viewportWidth - canvasWidth) / 2;
	}

	demoContext.circleContext =$('#circle_canvas')[0].getContext("2d");
	demoContext.textureContext=$('#circle_canvas_hidden')[0].getContext("2d");
	WIDTH=$("#circle_canvas").width();
	HEIGHT=$("#circle_canvas").height();
	
	TEXTURE_WIDTH=$("#circle_canvas_hidden").width();
	TEXTURE_HEIGHT=$("#circle_canvas_hidden").height();
	for(i=0; i<demoContext.totalCircles; i++)
		demoContext.circles[i]=new Circle(Math.floor(Math.random()*WIDTH),Math.floor(Math.random()*HEIGHT),demoContext.radius);
	
    demoContext.backgroundContext = $('#background_canvas')[0].getContext("2d");
	setInterval(cycleBG, 5000);
	return setInterval(draw,30)
}
function setLetter(c){

	var nIndex=0;
	if(c in demoContext.letters){
		if(Math.random() < .9)
			demoContext.currentImage = demoContext.letters[c]["img"];
		else
			demoContext.currentImage = null;
		demoContext.textureContext.fillStyle="#00000000";
		demoContext.textureContext.fillRect(0,0,TEXTURE_WIDTH,TEXTURE_HEIGHT);
		demoContext.textureContext.drawImage(demoContext.letters[c]["img"],0,0);
		//demoContext.color = demoContext.letters[c]["color"];
		var imageData=demoContext.textureContext.getImageData(0,0,TEXTURE_WIDTH,TEXTURE_HEIGHT);
		var sqWidth=8;
		demoContext.x_offset = (Math.random()* WIDTH) - (TEXTURE_WIDTH *1.5);
		if (demoContext.x_offset < 0) demoContext.x_offset = 0;
			
		demoContext.y_offset = (Math.random()* HEIGHT) - (TEXTURE_HEIGHT *1.5);
		if (demoContext.y_offset < 0) demoContext.y_offset = 0;
		
		for(j=0;j<Math.floor(imageData.height);j=j+sqWidth){
			for(i=0;i<Math.floor(imageData.width);i=i+sqWidth){
				var nAvg=0;
				for(ypos=j;ypos<j+sqWidth;ypos++){
					for(xpos=i;xpos<i+sqWidth;xpos++){
						var index=(xpos*4)*imageData.width+(ypos*4);
						var red=imageData.data[index];
						var green=imageData.data[index+1];
						var blue=imageData.data[index+2];
						var alpha=imageData.data[index+3];
						var average=(red+green+blue)/3;
						nAvg+=average/(sqWidth*sqWidth)
					}
				}
				if(nAvg>60&&nIndex<demoContext.circles.length){
					demoContext.circles[nIndex].destX=(j+Math.floor(sqWidth))*1.5 + demoContext.x_offset;
					demoContext.circles[nIndex].destY=(i+Math.floor(sqWidth))*1.5 + demoContext.y_offset;
					nIndex++
				}
			}
		}
	}
	for(i=nIndex+1;i<demoContext.circles.length;i++){
		demoContext.circles[i].destX=-1;
		demoContext.circles[i].destY=-1
	}
}

function cycleBG(){
    demoContext.backgroundContext.drawImage(demoContext.backgroundImages[demoContext.backgroundImagesIndex], 0, 0, WIDTH, HEIGHT);
	demoContext.backgroundImagesIndex += demoContext.bg_index_mod;
	if (demoContext.backgroundImagesIndex == demoContext.backgroundImages.length-1) demoContext.bg_index_mod = -1;
		
	if (demoContext.backgroundImagesIndex == 0) demoContext.bg_index_mod = 1;
}
function setNextLetter(){
	demoContext.currentImage_alpha = .5;
	demoContext.rad = 3 + (Math.random() * demoContext.radius-2);	
	setLetter(demoContext.message[demoContext.messageIndex]);
	demoContext.color = demoContext.messageColors[demoContext.messageIndex];
	
	demoContext.messageIndex++;
	demoContext.messageIndex=demoContext.messageIndex%demoContext.message.length
}
function clearCircles(){
	demoContext.generalWindX=Math.sin(Math.random()*360)*10;
	demoContext.generalWindY=Math.cos(Math.random()*360)*10;
	for(i=0;i<demoContext.circles.length;i++){
		var nang=Math.random()*360;
		demoContext.circles[i].vx=Math.sin(nang)*5;
		demoContext.circles[i].vy=Math.cos(nang)*5;
		demoContext.circles[i].destX=-1;
		demoContext.circles[i].destY=-1
	}
}
function startClearCircles(){
	setInterval(clearCircles,demoContext.interval)
}
function draw(){
	WIDTH=$("#circle_canvas").width();
	HEIGHT=$("#circle_canvas").height();
	
	if(!demoContext.imagesLoaded){
		demoContext.imagesLoaded=imagesLoaded();
		return;
	}
	clear();

	if(demoContext.currentImage !=null)//&& demoContext.currentImage ==demoContext.letters['logo']['img'])
		{
		demoContext.circleContext.globalAlpha = demoContext.currentImage_alpha;
		demoContext.circleContext.drawImage(demoContext.currentImage, demoContext.x_offset, demoContext.y_offset);
//		return;
          demoContext.currentImage_alpha -= .004;
		}
		if(demoContext.currentImage ==demoContext.letters['logo']['img'])
		{
		//rad = 2;
		}
	var i;
	for (i=0;i<demoContext.circles.length;i++){
		var C=demoContext.circles[i];
		if(C.destX>-1){
			C.x+=(C.destX-C.x)/4+((C.destX-C.x)/90 * C.vx)+demoContext.generalWindX;
			C.y+=(C.destY-C.y)/4+((C.destY-C.y)/90 * C.vy)+demoContext.generalWindY;
			C.alpha+=((.1 +Math.random()*.8)-C.alpha)/2;
		}
		else{		
			C.x+=C.vx+demoContext.generalWindX;
			C.y+=C.vy+demoContext.generalWindY;
			// gravity
			C.vy+=1.0;
			
			if(C.alpha<0)
				C.alpha=0;
		}
		demoContext.generalWindX*=.9999;
		demoContext.generalWindY*=.9999;
		
		if(C.x<0){
			C.x=-C.x;
			C.vx=-C.vx;
		}
		if(C.y<0){
			C.y=-C.y;
		C.vy=-C.vy;
		};

		if(C.x>WIDTH){
			C.x=WIDTH-(C.x-WIDTH);
			C.vx=-C.vx;
		}
		if(C.y>HEIGHT){
			C.y=HEIGHT-(C.y-HEIGHT);
			C.vy=-C.vy*.45;
		}
		demoContext.circleContext.globalAlpha=C.alpha;
		demoContext.circleContext.beginPath();
		demoContext.circleContext.fillStyle = demoContext.color;
		demoContext.circleContext.arc(C.x, C.y, demoContext.rad, 0, Math.PI*2, true);
		demoContext.circleContext.closePath();

		demoContext.circleContext.fill();
	}
}
	function imagesLoaded(){
		for(var letter in demoContext.letters){
			if(!demoContext.letters[letter]["img"].complete)
				return false
		}
		setTimeout(startClearCircles, demoContext.interval/2);
		setInterval(setNextLetter, demoContext.interval);
		return true
	}
	function clear(){
		//demoContext.circleContext.globalAlpha=0.1;
		//demoContext.circleContext.fillStyle="#000000";
		//demoContext.circleContext.fillRect(0,0,WIDTH,HEIGHT)
		demoContext.circleContext.clearRect(0,0,WIDTH, HEIGHT);
	}
		
$(document).ready(function(){init()});
