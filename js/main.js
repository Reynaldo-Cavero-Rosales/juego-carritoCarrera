var state={
			NO_CHANGE:0,
			GAME:2,
		};

var img=null;

class Game{
	constructor(){
		this.canvas=new Canvas(600,600);
		
		this.input = new InputHandeler({
			left:37,
			up:38,
			rigth:39,
			down:40,
			spacebar:32
		});
		this.canvas.ctx.strokeStyle="#000";
		this.currentState=null;
		this.nextState=state.GAME;
	}



	run(){
		var self=this;

		this.canvas.animate(function(){
			if (self.nextState!==state.NO_CHANGE) {
				switch(self.nextState){
					case state.GAME:self.currentState=new gameState(self);break;

				}

				self.nextState=state.NO_CHANGE;
			}
			self.currentState.handleInputs(self.input);
			self.currentState.update();
			self.currentState.render(self.canvas.ctx);
		});

	}
}