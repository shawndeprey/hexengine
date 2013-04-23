//Hex Engine Objects. Objects must be included in order of use with the last object being the HEngine base.
document.write('<script type="text/javascript" src="jquery.js"></script>');
document.write('<script type="text/javascript" src="System.js"></script>');
document.write('<script type="text/javascript" src="Clock.js"></script>');
document.write('<script type="text/javascript" src="Input.js"></script>');
document.write('<script type="text/javascript" src="World.js"></script>');
document.write('<script type="text/javascript" src="Map.js"></script>');
document.write('<script type="text/javascript" src="RandomUpdateObject.js"></script>');
document.write('<script type="text/javascript" src="Map_Designer.js"></script>');

//Gui and Graphics Objects
document.write('<script type="text/javascript" src="Asset_Manager.js"></script>');
document.write('<script type="text/javascript" src="Animation.js"></script>');
document.write('<script type="text/javascript" src="Lighting.js"></script>');
document.write('<script type="text/javascript" src="Physics.js"></script>');
document.write('<script type="text/javascript" src="Camera.js"></script>');
document.write('<script type="text/javascript" src="Gui.js"></script>');
document.write('<script type="text/javascript" src="Gui_Menu.js"></script>');
document.write('<script type="text/javascript" src="Gui_Debug.js"></script>');
document.write('<script type="text/javascript" src="Graphic.js"></script>');
document.write('<script type="text/javascript" src="Helpers.js"></script>');

//Game World Components
document.write('<script type="text/javascript" src="Entity_Player.js"></script>');
document.write('<script type="text/javascript" src="Entity_NPC.js"></script>');
document.write('<script type="text/javascript" src="Checkpoint.js"></script>');
document.write('<script type="text/javascript" src="Event_Area.js"></script>');
document.write('<script type="text/javascript" src="Prop.js"></script>');
document.write('<script type="text/javascript" src="Navi_Node.js"></script>');
document.write('<script type="text/javascript" src="Particle.js"></script>');

//Misc Libraries
document.write('<script type="text/javascript" src="Browser_Detect.js"></script>'); //Auto init

//Scripts
document.write('<script type="text/javascript" src="scripts/global/InitializeAllGlobalUtilities.js"></script>');
document.write('<script type="text/javascript" src="scripts/gui/InitializeAllGameMenus.js"></script>');
document.write('<script type="text/javascript" src="scripts/event/InitializeAllGameEvents.js"></script>');
document.write('<script type="text/javascript" src="scripts/npc/InitializeAllNpcFunctions.js"></script>');
document.write('<script type="text/javascript" src="scripts/particle/InitializeAllFX.js"></script>');
document.write('<script type="text/javascript" src="scripts/prop/InitializeAllProps.js"></script>');

//Maps
document.write('<script type="text/javascript" src="res/map/Map_Manager.js"></script>');

//Hex Engine
document.write('<script type="text/javascript" src="HEngine.js"></script>');

var system, clock, input, world, gui, debug, gm, em, fx, ru, designer, asset, lighting, physics, camera, graphic, h, map, canvas, _canvas, he;
function InitializeObjectsAndRunEngine()
{
  system = new System();
  system.log("Initializing game objects and starting Hex Engine...");
  clock = new Clock();
  input = new Input();
  gm = new Gui_Manager();
  gui = new Gui();
	h = new Helpers();
  fx = new Particle_Manager();
  ru = new RUO_Manager();
  debug = new Gui_Debug();
	map = new Map();
	asset = new Asset_Manager();
	lighting = new Lighting();
	physics = new Physics();
	camera = new Camera();
  world = new World();
  graphic = new Graphic();
  designer = new Map_Designer();
  he = new HEngine();
  he.run();
}

function PreparePageForCanvas()
{
	$("body").css("overflow", "hidden");
}