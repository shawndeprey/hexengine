function Checkpoint_Manager()
{
	system.log("Constructing Checkpoint Manager");
	var self = this;
	var current = "";
	self.checkpoint = {};

	this.addCheckpoint = function(NAME, X, Y, H, W, ACTIVE)
	{
		if( !self.checkpoint.hasOwnProperty(NAME) ) {
			self.checkpoint[NAME] = new Checkpoint(NAME, X, Y, H, W, ACTIVE);
			if(ACTIVE){ current = NAME; }
		} else {
			system.log("Tried to add multiple key in checkpoint: " + NAME);
		}
	}	

	this.onEnteredNode = function(NAME)
	{
		if(!self.checkpoint[NAME].entered)
		{
			self.checkpoint[current].active = self.checkpoint[current].entered = false;
			current = NAME;
			self.checkpoint[current].active = self.checkpoint[current].entered = true;
			system.log("New Active Checkpoint: " + self.checkpoint[current].name + " at x:" + self.checkpoint[current].x + " y:" + self.checkpoint[current].y);
		}
	}

	this.moveEntityToActiveCheckpoint = function(entity)
	{
		$.each(self.checkpoint, function(){
			if(this.active) {
				entity.x = this.x;
				entity.y = this.y;
			}
		});
	}

	this.popCheckpoint = function(e)
	{
		h.popEntityFromAssoc(self.checkpoint, e);
	}

	this.checkpointCount = function()
	{
		return Object.keys(self.checkpoint).length;
	}

	this.drawCheckpoints = function()
	{
		$.each(self.checkpoint, function(){
			this.draw();
		});
	}
}

function Checkpoint(NAME, X, Y, H, W, ACTIVE)
{
  system.log("Constructing Checkpoint: " + NAME);
  var self = this;
  self.name = NAME;
  self.type = 'checkpoint';
	self.x = X;
	self.y = Y;
	self.height = H;
	self.width = W;
	self.entered = false;
	self.active = ACTIVE;

	this.draw = function()
	{
		canvas.fillStyle = "rgb(255,255,0)";
		canvas.fillRect(h.X(self.x - self.width / 2), h.Y(self.y - self.height / 2), self.width, self.height);
	}

	this.update = function()
	{ }
}