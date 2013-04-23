function Camera()
{
  system.log("Constructing Hex World Camera...");
  var self = this;
  this.x = 0;
	this.y = 0;
	
	this.setPosition = function(X, Y)
	{
		self.x = X;
		self.y = Y;
	}
	
  this.moveToPlayer = function(X, Y)
  {
		DX = X - self.x; dx = Math.abs(DX);
		DY = Y - self.y; dy = Math.abs(DY);
		if(system.designMode){
			if(input.mouseLeft != 1 && input.key['ctrl'] != 1){
				self.x += (dx > 25) ? (DX * 2 * clock.delta) : 0;
				self.y += (dy > 25) ? (DY * 2 * clock.delta) : 0;
			}
		} else {
			self.x += (dx > 10) ? (DX * 2 * clock.delta) : 0;
			self.y += (dy > 10) ? (DY * 2 * clock.delta) : 0;
		}
  }
}