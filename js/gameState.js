var points={
	carro:  [
			/*[-4,-6,2,-6,3,-5,0,-5,1,-4,1,-3,2,-3,2,-4,3,-4,3,-1,2,-1,2,-2,1,-2,1,2,2,2,2,0,3,0,4,0,4,5,2,5,2,3,1,3,1,5,2,6,3,6,2,7,-4,7,-5,6,-4,6,-3,5,-3,3,-4,3,-4,5,-6,5,-6,0,-4,0,-4,2,-3,2,-3,-2,-4,-2,-4,-1,-5,-1,-5,-4,-4,-4,-4,-3,-3,-3,-3,-4,-2,-5,-5,-5,-4,-6],*/
			[-4,-3,3,-3,2,-2,2,0,3,0,3,-1,4,-1,4,2,3,2,3,1,2,1,2,5,3,5,3,4,4,4,4,7,3,7,3,6,2,6,2,8,1,9,-2,9,-3,8,-3,6,-4,6,-4,7,-5,7,-5,4,-4,4,-4,5,-3,5,-3,1,-4,1,-4,2,-5,2,-5,-1,-4,-1,-4,0,-3,0,-3,-2,-4,-3],
			[-4,-3,3,-3,2,-2,2,0,3,0,3,-1,4,-1,4,2,3,2,3,1,2,1,2,5,3,5,3,4,4,4,4,7,3,7,3,6,2,6,2,8,1,9,-2,9,-3,8,-3,6,-4,6,-4,7,-5,7,-5,4,-4,4,-4,5,-3,5,-3,1,-4,1,-4,2,-5,2,-5,-1,-4,-1,-4,0,-3,0,-3,-2,-4,-3]
			],
	ship:[-2,-3,1,-3,2,-2,2,0,3,0,3,-1,4,-1,4,2,3,2,3,1,2,1,2,5,3,5,3,4,4,4,4,7,3,7,3,6,2,6,2,8,3,9,-4,9,-3,8,-3,6,-4,6,-4,7,-5,7,-5,4,-4,4,-4,5,-3,5,-3,1,-4,1,-4,2,-5,2,-5,-1,-4,-1,-4,0,-3,0,-3,-2,-2,-3]
}


var record=0,anuncio,cond=false;
class gameState{
	constructor(game){

		this.carrosMulti=[];
		this.ship=new Ship(points.ship,8,300,500);
		this.ship.maxX=game.canvas.ctx.width-150;
		this.ship.maxY=game.canvas.ctx.height-100;
		this.score=0;
		this.sprite=new Sprite(0,0,543,600);
		this.sprite.cargarImagen();
		this.sprite.diseno(0,0);
		this.velocidad=0;
		this.sprite2=new Sprite(0,0,543,600);
		this.sprite2.cargarImagen();
		this.sprite2.diseno(0,-600);
		this.start=new Sprite(664,125,200,150);
		this.start.cargarImagen();
		this.level=0;
		this.end=new Sprite(543,125,121,162);
		this.end.cargarImagen();
		this.color=622;
		this.numeroCarro=0;
		this.contador=0;
		this.puntaje=0;
		this.estado=false;
		record=localStorage.getItem("record");
		if (record==null) {
			record=0;
		}
		anuncio="";
		this.rango=100;
		this.insertar();
	}

	insertar(){


		//multiples carros
		this.posicionSalida=100+Math.floor(320*Math.random());
		this.TiempoSalida=this.rango+Math.floor(40*Math.random());
		var n=Math.round(Math.random()*(points.carro.length - 1)),px=this.posicionSalida,py=-100;
		if (n===1) {
			this.color=544;
		}else{
			this.color=622;
		}
		this.card=new Cards(points.carro[n],8,px,py,this.color);
		this.card.maxX=game.canvas.ctx.width-160;
		this.card.maxY=game.canvas.ctx.height-80;
		this.canvasWidth = game.canvas.ctx.width;
		this.canvasHeight = game.canvas.ctx.height;
		this.x=this.card.vel.x;
		this.y=this.card.vel.y;
		this.pos=this.card.posicionY;
		this.enemigos=this.card.enemigo.diseno(px-40,py-40);
		if (this.estado==true) {
			this.numeroCarro++;
			if (this.numeroCarro%50==0) {
				this.level++;
				this.rango-=2;

			}

		}

		this.carrosMulti.push(this.card);

	}



	update(){

		if (this.TiempoSalida<=0) {
			this.aparicion();
			this.insertar();
		}else{
			this.TiempoSalida--;
			this.aparicion();

		}
		
		if (this.velocidad>=600) {
			this.velocidad=0;
		}
		this.velocidad+=6;
		this.sprite.diseno(0,this.velocidad);
		this.sprite2.diseno(0,-600+this.velocidad);


	}

	aparicion(){

		for(var i=0,tam=this.carrosMulti.length;i<tam;i++){
			var a=this.carrosMulti[i];
			a.update();
			if (this.ship.collide(a)) {
				this.ship.x=270;
				this.ship.y=this.canvasHeight-100;

				this.ship.car.diseno(230,460);
				this.ship.vel={
					x:0,
					y:0
				}
				this.ship.visible=false;
			}
			if (this.card.posicionY>600) {
				this.carrosMulti.splice(i,1);
				tam--;
				i--;
			}

			
		}
	}

		reset(){
			this.ship.visible=true;
			if (this.numeroCarro>record) {
				localStorage.setItem("record",this.numeroCarro);
				record=this.numeroCarro;

			}
			this.contador=1;
			this.numeroCarro=0;
			this.estado=true;
			this.rango=100;


		}
		handleInputs(input){
		if (!this.ship.visible) {
			this.start.diseno(230,250);
			this.end.diseno(230,80);
			this.level=0;
			this.rango=100;
			if (this.numeroCarro>record) {
				anuncio="!FELICIDADES PASASTES EL RECORD!";
				cond=true;
				
			}
			if (input.isPressed("spacebar")) {

				this.reset();

			}



			return;
		}


		if (input.isDown("down")) {
			this.ship.moveV(3,this.card);
		}
		if (input.isDown("up")) {
			this.ship.moveV(-3,this.card);

		}
		if (input.isDown("rigth")) {
			this.ship.moveH(3,this.card);
		}
		if (input.isDown("left")) {
			this.ship.moveH(-3,this.card);
		}
		if (input.isPressed("spacebar")) {
		}

	}



	render(ctx){

		ctx.clearAll();
		this.sprite.draw(ctx);
		this.sprite2.draw(ctx);
		
		for(var i=0;i<this.carrosMulti.length;i++){
			this.carrosMulti[i].draw(ctx);
			}


		if (!this.ship.visible) {
			this.start.draw(ctx);
			this.estado=false;
			if (this.contador==1) {
				this.end.draw(ctx);
				ctx.fillStyle="#000";
				ctx.font="20px Arial";
				ctx.fillText(this.numeroCarro,290,217);
				/*anuncio*/
				ctx.fillStyle="red";
				if (cond===true) {
					ctx.font="30px Arial";
					ctx.fillText(anuncio,30,60);
					cond=false;
				}
				
				/*cunado se bate el record*/
				ctx.font="20px Arial";
				ctx.fillText(record,290,236);

			}
			
		}

		this.ship.draw(ctx);
		ctx.fillStyle="#fff";
		ctx.font="28px Arial";
		ctx.fillText("Level:"+this.level,482,150);

		
		ctx.font="50px Arial";
		ctx.fillText(this.numeroCarro,520,68);
		
	}
}