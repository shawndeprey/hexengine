function Game_Event_Manager()
{
	var events = {};

	this.add = function(NAME, EVENT)
	{
		if( !events.hasOwnProperty(NAME) ) {
			events[NAME] = EVENT;
		} else {
			system.log("Tried to add multiple key in GAME_EVENTS: " + NAME);
		}
	}

	this.get = function(NAME)
	{
		if( events.hasOwnProperty(NAME) ) {
			return events[NAME];
		} else {
			system.log("Tried to get non-existent key in GAME_EVENTS: " + NAME);
			return function(){ system.log("System could not find event: " + NAME); }
		}
	}
}
var GAME_EVENT = new Game_Event_Manager();
GAME_EVENT.add('null', function(){});
document.write('<script type="text/javascript" src="scripts/event/GameEvents.js"></script>');