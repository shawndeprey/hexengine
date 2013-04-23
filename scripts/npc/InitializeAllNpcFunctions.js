function NPC_SCRIPT_MANAGER()
{
	var ai = {};

	this.add = function(NAME, SCRIPT)
	{
		if( !ai.hasOwnProperty(NAME) ) {
			ai[NAME] = SCRIPT;
		} else {
			system.log("Tried to add multiple key in NPC_SCRIPTS: " + NAME);
		}
	}

	this.get = function(NAME)
	{
		if( ai.hasOwnProperty(NAME) ) {
			return ai[NAME];
		} else {
			system.log("Tried to get non-existent key in NPC_SCRIPTS: " + NAME);
			return function(){ system.log("System could not find npc script: " + NAME); }
		}
	}
}
var NPC = new NPC_SCRIPT_MANAGER();
NPC.add('null', function(){});
document.write('<script type="text/javascript" src="scripts/npc/Npcs.js"></script>');