function World()
{
  system.log("Constructing World...");
  var self = this;
	self.xOff = 0;
	self.yOff = 0;
	self.entity = [];
	self.player = new Entity_Player();
	self.initialized = false;

	this.init = function()
	{
		system.log("Initializing World...");
		self.initialized = true;
		g.get('load')('map', 'javabomb');
	}

	this.reset = function()
	{
		self.xOff = 0;
		self.yOff = 0;
		self.entity = [];
		self.player = new Entity_Player();
	}

	this.addPlayer = function()
	{
		map.checkpoint.moveEntityToActiveCheckpoint(self.player);
	}

	this.translateWorld = function()
	{
		if(system.designMode){camera.moveToPlayer(input.screenX, input.screenY);}else{camera.moveToPlayer(self.player.x, self.player.y);}
		self.xOff = camera.x;
		self.yOff = camera.y;
	}

	this.draw = function()
	{
		map.drawBackground();
		self.drawEntities();
		fx.drawBG();
		map.drawForeground();
		if(system.lights){ map.renderAndDrawLights(); }
		fx.drawFG();
	}

	this.addEntity = function(newEntity)
	{
		self.entity.push(newEntity);
	}

	this.removeEntity = function(e)
	{
		h.popEntity(self.entity, e);
	}

	this.drawEntities = function()
	{
		i = self.entity.length;while(i--){if(!self.entity[i].foreground){self.entity[i].draw();}}
		self.player.draw();
		i = self.entity.length;while(i--){if(self.entity[i].foreground){self.entity[i].draw();}}
	}

  this.update = function()
  {
  	if(!system.pauseWorld)
  	{
			self.translateWorld();
			self.player.update();
			i = self.entity.length;while(i--){ self.entity[i].update(); }
			if(!system.designMode){
				physics.applyGravity();
			} else {
				designer.update();
			}
			physics.calculateCollisions();
			fx.update();
			map.update();
		}
  }
}