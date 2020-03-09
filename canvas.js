var canvas=document.querySelector('canvas');
canvas.width=window.innerWidth;
canvas.height=window.innerHeight;

var c=canvas.getContext('2d');

// rectangle
//c.fillStyle='rgba(255,0,0,0.3)';
//c.fillRect(100,100,100,100);
//c.fillStyle='rgba(255,255,0,0.3)';
//c.fillRect(500,200,100,300);
//console.log(canvas);

// Line
//c.beginPath();
//c.moveTo(50,300);
//c.lineTo(300,100);
//c.stroke();

//c.beginPath();
//c.arc(200,200,30,0,Math.PI*2,false);
//c.strokeStyle='red';
//c.stroke();

var mouse = {
	x : undefined, 
	y : undefined
}


var colorArray =[
	'#ffaa33',
	'#99ffaa',
	'#00ff00',
	'#4411aa',
	'#ff1100'

]

var maxRadius = 80;
var minRadius = 2;

window.addEventListener('mousemove',
	function(event){
		mouse.x=event.x;
		mouse.y=event.y;
		console.log(mouse);
})


function Circle(x,y,dx, dy,radius) {
	this.x = x;
	this.y = y;
	this.radius = radius;
	this.dx = dx;
	this.dy = dy;
	this.color = colorArray[Math.floor(Math.random() * colorArray.length)];
	
	this.draw = function() {
	c.beginPath();
	c.arc(this.x,this.y, this.radius,0,Math.PI*2,false);
	c.strokeStyle='blue';
	c.fillStyle= this.color;
	c.fill();
	c.stroke();
	}
	
	this.update = function() {
		if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
			this.dx=-this.dx;
		}
	
		if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
			this.dy=-this.dy;
		}
		this.x +=this.dx;
		this.y +=this.dy;
		
		if ( mouse.x-this.x < 50 && mouse.x-this.x > -50 && mouse.y-this.y < 50 && mouse.y-this.y > -50 ){
			if ( this.radius < maxRadius )
				this.radius+=1;
		}
		else if(this.radius > minRadius) {
			this.radius -=1;
		}
		
		this.draw();
	}
}

var circleArray = [];

for (var i=0; i<100;i++){
	var radius = Math.random()*3 + 1;
	var x = Math.random()*( innerWidth - radius*2) + radius;;
	var y = Math.random()* (innerHeight - radius*2) + radius;;
	var dx = (Math.random() - 0.5);
	var dy = (Math.random() - 0.5);

	
	circleArray.push(new Circle(x,y,dx,dy,radius));
	
}


//var x = Math.random()*innerWidth;
//var y = Math.random()*innerHeight;
//var dx = (Math.random() - 0.5) *10;
//var dy = (Math.random() - 0.5) *10;
//var radius = 30;
function animate() {
	
	requestAnimationFrame(animate);
	c.clearRect(0,0, innerWidth,innerHeight);
	
	for (var i=0;i<circleArray.length;i++)
		circleArray[i].update();

	//circle.draw();
	//circle.update();

	//circle1.draw();
	//circle1.update();

//	c.beginPath();
//	c.arc(x,y, radius,0,Math.PI*2,false);
//	c.strokeStyle='blue';
//	c.stroke();
//	
//	if (x + radius > innerWidth || x - radius < 0) {
//		dx=-dx;
//	}
//	
//	if (y + radius > innerHeight || y - radius < 0) {
//		dy=-dy;
//	}
//	x +=dx;
//	y +=dy;
}

animate();
