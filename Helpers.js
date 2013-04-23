function Helpers()
{
  system.log("Constructing Helper Object...");

	this.popArray = function(Array, popThis)
	{
		for(var i = popThis; i < Array.length - 1; i++) {
				Array[i] = Array[i + 1];
		}
		Array.pop();
	}

	this.X = function(x)
	{
		return (x - world.xOff) + system.width / 2;
	}
	
	this.Y = function(y)
	{
		return (y - world.yOff) + system.height / 2;
	}
	
	this.lightX = function(x)
	{
		return Math.ceil( (x - (world.xOff / lighting.resolution)) + ((system.width / 2) / lighting.resolution) );
	}
	
	this.lightY = function(y)
	{
		return Math.ceil( (y - (world.yOff / lighting.resolution)) + ((system.height / 2) / lighting.resolution) );
	}
}