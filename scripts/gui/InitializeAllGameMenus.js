document.write('<script type="text/javascript" src="scripts/gui/Menus.js"></script>');
function InitializeAllGameMenus()
{
	/*
		Why is this scripting so much different that the other scriping systems? This is because
		I needed to take the gui system out of the standard page flow context. The gui system uses
		DOM elements and functions to achieve text pagination, which means I needed the dom to be
		fully initialized before I added any menus. To achieve this, I set a timeout for this function
		in HEngine.js.
	*/
	Initialize_Main_Menu_Through_Api();
	Initialize_System_Gui_Through_Api();
	Initialize_Designer_Menu_Through_Api();
	gm.goToMenu('main');
}