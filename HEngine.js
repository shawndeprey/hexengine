function HEngine()
{
  system.log("Constructing Hex Engine...");
  var self = this;
  this.running = true;

  this.run = function()
  {
    system.log("Initializing Game Loop...");
    setInterval(self.loop, 0);
		self.init();
  }

	this.init = function()
	{
		system.log("Initializing Hex Engine...");
		setTimeout(function(){ InitializeAllGameMenus();}, 0);
		asset.findSupportedFileTypesAndLoadAssets();	
	}

  this.loop = function()
  {
	  if(asset.allAssetsLoaded){
		   clock.update();
			 asset.update();
		   input.update();
		  system.update();
		   world.update();
		      ru.update();
		     gui.update();
		 graphic.update();
		}
  }
}