function Event_Manager()
{
	system.log("Constructing Event Manager");
	var self = this;
	self.events = {};

	this.addEvent = function(NAME, X, Y, H, W, ACTIVE, ON_ENTER, ON_ACTION, ON_EXIT)
	{
		if( !self.events.hasOwnProperty(NAME) ) {
			self.events[NAME] = new Event_Area(NAME, X, Y, H, W, ACTIVE, ON_ENTER, ON_ACTION, ON_EXIT);
		} else {
			system.log("Tried to add multiple key in events: " + NAME);
		}
	}

	this.removeEvent = function(e)
	{
		h.popEntityFromAssoc(self.events, e);
	}

	this.onEnteredNode = function(NAME)
	{
		if(!self.events[NAME].entered) {
			self.events[NAME].entered = true;
			self.events[NAME].onEnter();
		}
		self.performActionCheck(NAME);
	}

	this.onExitNode = function(NAME)
	{
		if(self.events[NAME].entered) {
			self.events[NAME].entered = false;
			self.events[NAME].onExit();
		}
	}

	this.performActionCheck = function(NAME)
	{
		if(input.key['z'] == 2){
			self.events[NAME].onAction();
		}
	}

	this.getEvent = function(NAME)
	{
		return $.each(self.events, function(){
			if(this.name == NAME){ return this; }
		});
	}

	this.eventCount = function()
	{
		return Object.keys(self.events).length;
	}

	this.drawEventAreas = function()
	{
		$.each(self.events, function(){
			this.draw();
		});
	}
}

function Event_Area(NAME, X, Y, H, W, ACTIVE, ON_ENTER, ON_ACTION, ON_EXIT)
{
  system.log("Constructing Event Area: " + NAME);
  var self = this;
  self.name = NAME;
  self.type = 'event';
	self.x = X;
	self.y = Y;
	self.height = H;
	self.width = W;
	self.active = ACTIVE;

	self.entered = false;

	self.onEnterBase = ON_ENTER;
	self.onActionBase = ON_ACTION;
	self.onExitBase = ON_EXIT;

	self.onEnter = GAME_EVENT.get(ON_ENTER);
	self.onAction = GAME_EVENT.get(ON_ACTION);
	self.onExit = GAME_EVENT.get(ON_EXIT);

	this.toggleActive = function()
	{
		self.active = !self.active;
	}

	this.draw = function()
	{
		canvas.fillStyle = "rgb(0,255,255)";
		canvas.fillRect(h.X(self.x - self.width / 2), h.Y(self.y - self.height / 2), self.width, self.height);
	}

	this.update = function()
	{ }
}