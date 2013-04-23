function Entity_NPC(NAME, X, Y, SPEED, STEPSIZE, WIDTH, HEIGHT, FOREGROUND, START_AI, SECONDARY_AI)
{
	system.log("Constructing NPC Entity: " + NAME);
	var self = this;
	self.name = NAME;
	self.type = 'npc';
	self.x = X;
	self.y = Y;
	self.speed = SPEED;
	self.heading = 0;//0=left, 1=right;
	self.foreground = FOREGROUND;
	//Values for Physics
	self.stepSize = STEPSIZE;
	self.height = HEIGHT;
	self.width = WIDTH;
	self.moving = false;
	self.lightInteraction = false;
	self.applyPhysics = true;

	/*Navigation*/
	self.hasScriptedNavigation = true;
	self.enterNode = false;
	self.onEnterNode = false; //True for 1 frame is npc enters a navi node
	self.inNaviNode = false;
	self.navigateTo = false;

	self.ai_state = []
	self.startAI = START_AI;
	self.secondAI = SECONDARY_AI;
	self.secondaryAI = NPC.get(SECONDARY_AI);

	self.animate = new Animation_Manager();
	this.addAllEntityAnimations = function()
	{
		self.animate.addAnimation('run','playerOld'/*tex*/,16/*start*/,25/*end*/,75/*tile-ms-time*/,128/*tile-size*/,1024/*sheet-size*/, true);
		self.animate.addAnimation('idle','playerOld'/*tex*/,8/*start*/,11/*end*/,250/*tile-ms-time*/,128/*tile-size*/,1024/*sheet-size*/, true);
		self.animate.addAnimation('jump','playerOld'/*tex*/,24/*start*/,31/*end*/,50/*tile-ms-time*/,128/*tile-size*/,1024/*sheet-size*/, false);
	};self.addAllEntityAnimations();

	this.collidingWithNaviNode = function(NAME)
	{
		if(!self.enterNode) {
			self.enterNode = true;
			self.onEnterNode = true;
			self.inNaviNode = NAME;
		} else {
			self.onEnterNode = false;
		}
	}

	this.collidingWithNoNaviNodes = function()
	{
		self.enterNode = false;
		self.onEnterNode = false;
		self.inNaviNode = false;
	}

	this.setPosition = function(X, Y)
	{
		self.x = X;
		self.y = Y;
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

	this.branchAI = function(NEW_STATE)
	{
		self.ai_state.push(NEW_STATE);
		self.runScriptedAI = NPC.get(self.ai_state[self.ai_state.length - 1]);
	}

	this.convergeAI = function()
	{
		self.ai_state.pop();
		self.runScriptedAI = NPC.get(self.ai_state[self.ai_state.length - 1]);
	}

  this.update = function()
  {
  	self.secondaryAI();
  	self.runScriptedAI();
		self.animate.updateAnimations();
  }

	this.draw = function()
	{canvas.fillStyle = "rgb(255,255,255)";
		if(self.heading == 1) {
			canvas.drawImage(asset.tex[self.animate.currentTexture()], self.animate.left(), self.animate.top(), 128, 128, h.X(self.x - 64), h.Y(self.y - 64), 128, 128);
		} else {
			canvas.scale(-1,1);
				canvas.drawImage(asset.tex[self.animate.currentTexture()], self.animate.left(), self.animate.top(), 128, 128, (h.X(self.x - 64) * -1) - 128, h.Y(self.y - 64), 128, 128);
			canvas.scale(-1,1);
		}
	}

	self.branchAI(START_AI);
}