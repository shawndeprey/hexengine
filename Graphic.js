function Graphic()
{
  system.log("Constructing Graphics Engine...");
  var self = this;

  this.clearCanvas = function()
  {
		canvas.clearRect(0, 0, system.width, system.height);
		canvas.fillStyle = "rgb(0, 0, 0)";
    canvas.fillRect(0, 0, system.width, system.height);
  }

  this.update = function()
  {
		self.clearCanvas();
		if(world.initialized){ 
      world.draw();
      if(system.collision){ physics.draw(); }
    }
		gui.draw();
    canvas.drawImage(_canvas, 0, 0);
  }

  this.drawLoadMessages = function(){
    self.clearCanvas();
    canvas.clearRect(0, 0, system.width, system.height);
    canvas.fillStyle = "rgb(0, 0, 0)";
    canvas.fillRect(0, 0, system.width, system.height);
    canvas.fillStyle = "rgb(255, 255, 255)";
    canvas.font = "18px Helvetica";
    canvas.textAlign = "left";
    canvas.textBaseline = "top";
    //canvas.fillText("Assets Loaded: "+asset.loadedAssets+"/"+asset.numberOfAssets+" - "+Math.round(asset.getPercentOfLoadedAssets() * 100)+"%",window.innerHeight / 2, window.innerWidth / 2);
    canvas.fillText("Assets Loaded: "+asset.loadedAssets+"/"+asset.numberOfAssets+" - "+Math.round(asset.getPercentOfLoadedAssets() * 100)+"%",50, 50);
    canvas.drawImage(_canvas, 0, 0);
  }
}