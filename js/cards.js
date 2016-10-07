class Cards extends Polygon{
	constructor(p,scale,x,y,color){
		super(p);
		var maxX=null,maxY=null;
		this.x=x;
		this.y=y;
		this.scale(scale);
		this.posicionY=0;
		this.enemigo=new Sprite(color,295,78,118);
		this.enemigo.cargarImagen();
		this.valor=0;
		var	v=5 + (1+Math.random()*7);
		this.vel={
			x:v,
			y:v
		}
	}
	hasPoint2(x,y){
		return this.hasPoint(this.x,this.y,x,y);
	}

	update(){
		if (this.vel.y > 0 ) {

			this.y +=this.vel.y;
			this.enemigo.diseno(this.x-40,this.y-40);
		}
			this.posicionY=this.y;
	}
	draw(ctx){
		ctx.imagenPhoto(this.enemigo.x,this.enemigo.y,this.enemigo.largura,this.enemigo.ancho,this.enemigo.xcanvas,this.enemigo.ycanvas,this.enemigo.largura,this.enemigo.ancho);
	}
}