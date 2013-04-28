function Map()
{
  system.log("Constructing Map...");
  var self = this;
  self.bgm = {};
	this.reset = function()
	{
		g.get('resetworld')();
		self.lights = [];
		self.background = [];
		self.foreground = [];
		self.name = "";
		self.height = 0;
		self.width = 0;
		self.tileSize = 0;
		self.loaded = false;
		self.numAssets = 0;
		self.assetsLoaded = 0;
		self.checkpoint = new Checkpoint_Manager();
		self.em = new Event_Manager();
		self.navi = new Navigation_Manager();
	}

	this.load = function(mapName)
	{
		self.reset();
		var mapObj = MAP_STORE.get(mapName);
		self.name = mapObj.name;
		self.height = mapObj.height;
		self.width = mapObj.width;
		self.tileSize = mapObj.tileSize;
		system.log("Loading Map: " + self.name);
		self.loadBackgroundAndForegroundAssets(mapObj);
		mapObj.initialize(self);
		physics.addEntity(world.player);
		var i = world.entity.length;
		while(i--){
			if(world.entity[i].applyPhysics){
				physics.addEntity(world.entity[i]);
			}
		}
	}

	this.loadBackgroundAndForegroundAssets = function(mapObj)
	{
		for(var x = 0; x < mapObj.width; x++)
		{
			self.background[x] = [];
			self.foreground[x] = [];
			for(var y = 0; y < mapObj.height; y++)
			{
				self.background[x][y] = new Image();
				self.foreground[x][y] = new Image();
				self.background[x][y].src = ('res/map/' + mapObj.name + '/image/' + x + '-' + y + 'bg.png');
				self.foreground[x][y].src = ('res/map/' + mapObj.name + '/image/' + x + '-' + y + 'fg.png');
				self.background[x][y].addEventListener('load', self.loadedAsset, false);
				self.foreground[x][y].addEventListener('load', self.loadedAsset, false);
				self.numAssets += 2;
			}
		}
	}

	this.loadedAsset = function()
	{
		self.assetsLoaded += 1;
	}

	this.loadedAllAssets = function()
	{
		return (self.assetsLoaded >= self.numAssets);
	}

	this.drawBackground = function()
	{
		if(self.loadedAllAssets)
		{
			for(var x = 0; x < self.width; x++)
			{
				for(var y = 0; y < self.height; y++)
				{
					canvas.drawImage(self.background[x][y], h.X(x * self.tileSize), h.Y(y * self.tileSize), self.tileSize, self.tileSize);
				}
			}
		}
	}

	this.drawForeground = function()
	{
		if(self.loadedAllAssets)
		{
			for(var x = 0; x < self.width; x++)
			{
				for(var y = 0; y < self.height; y++)
				{
					canvas.drawImage(self.foreground[x][y], h.X(x * self.tileSize), h.Y(y * self.tileSize), self.tileSize, self.tileSize);
				}
			}
		}
	}

	this.renderAndDrawLights = function()
	{
		if(system.lights){ lighting.updateAndDraw(); }
	}

  this.update = function()
  { }
}