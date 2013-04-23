function Prop_Manager()
{
	var prop = {};

	this.add = function(NAME, OBJ)
	{
		if( !prop.hasOwnProperty(NAME) ) {
			prop[NAME] = OBJ;
		} else {
			system.log("Tried to add multiple key in PROPS: " + NAME);
		}
	}

	this.get = function(NAME)
	{
		if( prop.hasOwnProperty(NAME) ) {
			return prop[NAME];
		} else {
			system.log("Tried to get non-existent key in PROPS: " + NAME);
			return function(){ system.log("System could not find prop: " + NAME); }
		}
	}
}
var PROPS = new Prop_Manager();
document.write('<script type="text/javascript" src="scripts/prop/Props.js"></script>');