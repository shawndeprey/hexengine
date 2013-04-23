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
}