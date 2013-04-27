function FX_Manager()
{
	var effect = {};

	this.add = function(NAME, FX)
	{
		if( !effect.hasOwnProperty(NAME) ) {
			effect[NAME] = FX;
		} else {
			system.log("Tried to add multiple key in FX: " + NAME);
		}
	}

	this.get = function(NAME)
	{
		if( effect.hasOwnProperty(NAME) ) {
			return effect[NAME];
		} else {
			system.log("Tried to get non-existent key in FX: " + NAME);
			return function(){ system.log("System could not find event: " + NAME); }
		}
	}

	this.getFXList = function()
	{
		return Object.keys(effect)

	}
}
var fxmanager = new FX_Manager();
fxmanager.add('null', function(){});
document.write('<script type="text/javascript" src="scripts/particle/Effects.js"></script>');