class Ship extends Polygon{
	constructor(p,scale,x,y){
		super(p);
		this.car=new Sprite(544,0,78,118);
		this.car.cargarImagen();
		this.car.diseno(262,462);
		this.x=x;
		this.y=y;
		this.scale(scale);
		this.posicionY=0;
		this.visible=false;
		
		this.vel={
			x:0,
			y:0
		}
	}
	collide(astr){
		for(var i=0,len=this.points.length - 2;i<len;i+=2){
			var x=this.points[i]+this.x;
			var y=this.points[i+1]+this.y;
			if (astr.hasPoint2(x,y)) {
				return true;
			}
		}
		return false;
	}
	moveH(x,maxXX){
		
		if (this.x >= maxXX.maxX) {
			this.x=440;
			this.car.xcanvas=400;
			this.x+=x;
			this.car.xcanvas+=x;
			
		}else if(this.x < 100){
			this.x=103;
			this.car.xcanvas=60;
			this.x-=x;
			this.car.xcanvas-=x;


		}else if(this.x>=100 && this.x<maxXX.maxX){
			this.x+=x;
			this.car.xcanvas+=x;

		}

	}
	moveV(y,maxYY){
		this.y+=y;
		if (this.y >= maxYY.maxY) {
			this.y=520;
			this.car.ycanvas=480;
			this.y+=y;
			this.car.ycanvas+=y;
		}else if(this.y <= 40){
			this.y=40;
			this.car.ycanvas=0;
			this.y-=y;
			this.car.ycanvas-=y;
			this.y-=y;
		}else if(this.y>40 && this.y<maxYY.maxY){
			this.car.ycanvas+=y;
		}

	}

	draw(ctx){
		if (!this.visible) {
			return;
		}
		ctx.imagenPhoto(this.car.x,this.car.y,this.car.largura,this.car.ancho,this.car.xcanvas,this.car.ycanvas,this.car.largura,this.car.ancho);

	}
}