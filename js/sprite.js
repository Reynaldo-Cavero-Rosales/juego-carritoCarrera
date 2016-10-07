class Sprite{
	constructor(x,y,largura,ancho){
		this.x=x;
		this.y=y;
		this.largura=largura;
		this.ancho=ancho;
		this.xcanvas=0;
		this.ycanvas=0;

	}

	cargarImagen(){
		img=new Image();
		img.src="imagenes/juegoCarro01.png";
	}

	diseno(xcanvas,ycanvas){
		this.xcanvas=xcanvas;
		this.ycanvas=ycanvas;
	}

	draw(ctx){
		ctx.drawImage(img,this.x,this.y,this.largura,this.ancho,this.xcanvas,this.ycanvas,this.largura,this.ancho);
		
	}
}

