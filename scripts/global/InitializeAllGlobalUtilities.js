function GlobalUtilities()
{
	var script = {};

	this.add = function(NAME, FX)
	{
		if( !script.hasOwnProperty(NAME) ) {
			script[NAME] = FX;
		} else {
			system.log("Tried to add multiple key in Global Utilities: " + NAME);
		}
	}

	this.get = function(NAME)
	{
		if( script.hasOwnProperty(NAME) ) {
			return script[NAME];
		} else {
			system.log("Tried to get non-existent key in Global Utilities: " + NAME);
			return function(){ system.log("System could not find global utility: " + NAME); }
		}
	}
}
var g = new GlobalUtilities();
g.add('null', function(){});
document.write('<script type="text/javascript" src="scripts/global/Utilities.js"></script>');