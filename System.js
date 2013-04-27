function System()
{
  var self = this;
  self.fullscreen = false;
	self.height = 600;
  self.width = 800;
  self.debug = false;
	self.collision = false;
	self.lights = true;
  self.logging = true;
  self.lightEntityInteraction = true;
  self.designMode = false;
	self.browser = BrowserDetect.browser;
	self.OS = BrowserDetect.OS;
	self.pauseWorld = true;
	self.particleLevel = 5;
	self.maxParticleLevel = 5;

  this.update = function()
  {
		self.checkScreenSizeChange();
		self.systemKeyCheck();
		self.updateGameState();
  }

  this.updateGameState = function()
  {
  	if(gm.guiMode){self.pauseWorld = true;} else {self.pauseWorld = false;}
  }

  this.systemKeyCheck = function()
  {
		if(input.key['f2'] == 2){self.debug = !self.debug;}
		if(input.key['f4'] == 2){self.collision = !self.collision;}
		if(input.key['f7'] == 2){self.lights = !self.lights;}
		if(input.key['f8'] == 2){self.lightEntityInteraction = !self.lightEntityInteraction;}
		if(input.key['f9'] == 2){self.designMode = !self.designMode;}
    if(!self.designMode){
    	if(input.key['0'] == 2){lighting.resChange = true; lighting.resolution++;}
	    if(input.key['9'] == 2){lighting.resChange = true; lighting.resolution -= lighting.resolution - 1 > 0 ? 1 : 0;}
	    if(input.key['8'] == 2){map.checkpoint.moveEntityToActiveCheckpoint(world.player);}
	    if(input.key['7'] == 2){ if(asset.allAssetsLoaded){asset.playRandomBGMFromMapList();} else {system.log('All assets not loaded. Not playing random song.');} }
			if(input.key['6'] == 2){ g.get('move')('player', 500, 0); }
    }
  }

  this.log = function(out)
  {
    if(self.logging) {
			console.log(out);
		}
  }

  this.initSystemWindow = function()
  {
    self.log("System Dimensions: " + self.width + " x " + self.height);
    document.write('<canvas id="canvas" width="' + self.width + '" height="' + self.height + '"></canvas>');
		self.initializeCanvas();
  }
	
  this.initializeCanvas = function()
  {
		system.log("Initializing 2d canvas context...");
		_canvas = document.getElementById('canvas');
		canvas = _canvas.getContext('2d');
  }
	
	this.checkScreenSizeChange = function()
	{
		if(self.width != window.innerWidth || self.height != window.innerHeight){ self.resize_canvas(); }
	}
	
	this.resize_canvas = function()
	{
		_canvas.height = self.height = window.innerHeight < 1 ? 600 : window.innerHeight;
		_canvas.width = self.width = window.innerWidth  < 1 ? 800 : window.innerWidth;
		canvas = _canvas.getContext('2d');
		lighting.resChange = true;
		self.log("Resizing Canvas to " + self.width + " x " + self.height);
	}
	
  self.log("Constructing System...");
	self.log("User Agent: " + BrowserDetect.browser + " v." + BrowserDetect.version + "  Operating System: " + BrowserDetect.OS);
}