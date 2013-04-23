function Animation_Manager()
{
	var animation = {};
	var currentAnimation = "idle";

	this.setAnimation = function(newAnimation)
	{
		if(currentAnimation != newAnimation)
		{
			currentAnimation = newAnimation;
			animation[currentAnimation].resetFull();
		}
	}

	this.updateAnimations = function()
	{
		$.each(animation, function(key, value) { 
		  this.update();
		});
	}

	this.addAnimation = function(NAME, TEX_NAME, START_TILE, END_TILE, TIME_PER_TILE, TILE_SIZE, SHEET_SIZE, REPEAT)
	{
		if( !animation.hasOwnProperty(NAME) ) {
			system.log("Adding Animation: " + NAME);
			animation[NAME] = new Animation(NAME, TEX_NAME, START_TILE, END_TILE, TIME_PER_TILE, TILE_SIZE, SHEET_SIZE, REPEAT);
		} else {
			system.log("Tried to add multiple key in Animation: " + NAME);
		}
	}

	this.addPreMadeAnimation = function(NAME, newAnimation)
	{
		if( !animation.hasOwnProperty(NAME) ) {
			system.log("Adding Animation: " + NAME);
			animation[NAME] = newAnimation;
		} else {
			system.log("Tried to add multiple key in Animation: " + NAME);
		}
	}

	this.currentTexture = function()
	{
		return animation[currentAnimation].texture;
	}

	this.top = function()
	{
		return animation[currentAnimation].topOffset();
	}

	this.left = function()
	{
		return animation[currentAnimation].leftOffset();
	}

	this.tileSize = function()
	{
		return animation[currentAnimation].size;
	}
}

function Animation(NAME, TEX_NAME, START_TILE, END_TILE, TIME_PER_TILE, TILE_SIZE, SHEET_SIZE, REPEAT)
{
	system.log("Constructing Animation " + NAME + "...");
	var self = this;
	self.name = NAME;
	self.texture = TEX_NAME;
	self.start = START_TILE;
	self.end = END_TILE;
	self.tpt = TIME_PER_TILE;
	self.size = TILE_SIZE;
	self.sheetSize = SHEET_SIZE;
	self.repeat = REPEAT;
	self.tile = self.start;
	self.inc = 0;
	var columns = (self.sheetSize / self.size);

	this.resetAnimationAndCheckRepeat = function()
	{
		self.inc = 0;
		if(self.repeat){return self.start;} else {return self.end;}
	}

	this.resetFull = function()
	{
		self.inc = 0;
		self.tile = self.start;
	}

	this.topOffset = function()
	{
		return Math.floor(self.tile / columns) * self.size;
	}

	this.leftOffset = function()
	{
		return ((self.tile / columns) - Math.floor(self.tile / columns)) * self.sheetSize;
	}

	this.changeTile = function()
	{
		self.tile = (self.tile == self.end) ? self.resetAnimationAndCheckRepeat() : self.tile + 1;
		return 0;
	}

  this.update = function()
  { 
  	self.inc = (self.inc >= self.tpt) ? self.changeTile() : self.inc + (clock.delta * 1000);
  }
}