function Entity_Player()
{
	system.log("Constructing Player Entity...");
	var self = this;
	self.name = "player";
	self.x = 500;
	self.y = 0;
	self.speed = 300;
	self.heading = 0;//0=left, 1=right;
	//Values for Physics
	self.stepSize = 0.25;
	self.height = 128;
	self.width = 48;
	self.moving = false;
	self.lightInteraction = true;

	var animate = new Animation_Manager();
	this.addAllEntityAnimations = function()
	{
		animate.addAnimation('run','player'/*tex*/,16/*start*/,25/*end*/,75/*tile-ms-time*/,128/*tile-size*/,1024/*sheet-size*/, true);
		animate.addAnimation('idle','playerOld'/*tex*/,8/*start*/,11/*end*/,250/*tile-ms-time*/,128/*tile-size*/,1024/*sheet-size*/, true);
		animate.addAnimation('jump','playerOld'/*tex*/,24/*start*/,31/*end*/,50/*tile-ms-time*/,128/*tile-size*/,1024/*sheet-size*/, false);
	};self.addAllEntityAnimations();

	this.setPosition = function(X, Y)
	{
		self.x = X;
		self.y = Y;
	}

	this.jump = function()
	{
		self.velocity = -600;
	}

	this.setHeading = function(newHeading)
	{
		self.heading = newHeading;
		self.moving = true;
		return 0;
	}

	this.resetFunctionalVariables = function()
	{
		self.moving = false;
	}

	this.doInput = function()
	{
		self.resetFunctionalVariables();
		self.x += (input.key['right'] == 1) ? self.speed * clock.delta + self.setHeading(1) : 0;
		self.x -= (input.key['left'] == 1) ? self.speed * clock.delta + self.setHeading(0) : 0;
		((input.key['space'] == 1) && self.grounded) ? self.jump() : 0;
		if(!self.moving && self.grounded){animate.setAnimation('idle');} 
		else if(self.moving && self.grounded){animate.setAnimation('run');}
		else if(!self.grounded){animate.setAnimation('jump');}
		if(system.debug){ self.y -= (input.key['up'] == 1) ? self.speed * clock.delta : 0; self.y += (input.key['down'] == 1) ? self.speed * clock.delta : 0; }

		//Test Particles
		if(input.mouseLeft == 2){
			fx.addFX('explosion1', input.screenX, input.screenY, 3, 50, true, 'rgb(255,0,255)');
		}
	}

  this.update = function()
  {
		self.doInput();
		animate.updateAnimations();
  }

	this.draw = function()
	{canvas.fillStyle = "rgb(255,255,255)";
		if(self.heading == 1) {
			canvas.drawImage(asset.tex[animate.currentTexture()], animate.left(), animate.top(), 128, 128, h.X(self.x - 64), h.Y(self.y - 64), 128, 128);
		} else {
			canvas.scale(-1,1);
				canvas.drawImage(asset.tex[animate.currentTexture()], animate.left(), animate.top(), 128, 128, (h.X(self.x - 64) * -1) - 128, h.Y(self.y - 64), 128, 128);
			canvas.scale(-1,1);
		}
	}
}