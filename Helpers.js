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

	this.popEntity = function(array, entity)
	{
		var i = array.length;
		var index = -1;
		while(i--){
			if(array[i].x == entity.x && array[i].y == entity.y){
				index = i;
				break;
			}
		}
		if(index != -1){
			array.splice(index, 1);
		}
	}

	this.popEntityFromAssoc = function(associative_array, e)
	{
		key = null;
		$.each(associative_array, function(k){			
			if(this == e){
				key = k;
			}
		});
		if(key != null){
			delete associative_array[key];
		}
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

	this.clone = function(obj)
	{
    if(null == obj || "object" != typeof obj) return obj;
    var copy = obj.constructor();
    for(var attr in obj){
      if (obj.hasOwnProperty(attr)){ copy[attr] = obj[attr]; }
    }
    return copy;
  }
}