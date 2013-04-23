function Map_Manager()
{
	var map = {};

	this.add = function(NAME, OBJ)
	{
		if( !map.hasOwnProperty(NAME) ) {
			map[NAME] = OBJ;
		} else {
			system.log("Tried to add multiple key in Map Store: " + NAME);
		}
	}

	this.get = function(NAME)
	{
		if( map.hasOwnProperty(NAME) ) {
			return map[NAME];
		} else {
			system.log("Tried to get non-existent key in Map Store: " + NAME);
			return function(){ system.log("System could not find map: " + NAME); }
		}
	}
}
var MAP_STORE = new Map_Manager();
document.write('<script type="text/javascript" src="res/map/Maps.js"></script>');