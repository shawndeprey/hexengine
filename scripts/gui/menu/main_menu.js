function Initialize_Main_Menu_Through_Api()
{
	gm.addMenu('main', new Gui_Menu(false/*Statless*/, -4096/*xOffset*/, -4096/*yOffset*/, function(){
		this.addBox(new Color_Box('menuBG', function(){return system.width / 2;}, function(){return system.height / 2;}, function(){return system.height;}, function(){return system.width;}, 0, 0, 0, 1));
		this.addText(new Text_Area('startGameText', function(){return system.width - 172;}, function(){return system.height - 110;}, function(){return 100;}, 18, 'Arial', '20px', 4, 255, 255, 255, 1, 
			"Start"
		));
		this.addButton(new Color_Button('startGameButton', function(){return system.width - 150;}, function(){return system.height - 100;}, function(){return 50;}, function(){return 150;}, 
		'rgb(50,50,50)', 'rgb(80,80,80)', function(){
			
//Load a new game here!
system.log("All assets loaded: " + asset.allAssetsLoaded);
world.init();

			gm.closeMenu();
		}));
		this.addText(new Text_Area('disclaimer', function(){return system.width / 2 - 100;}, function(){return system.height / 2 - 49;}, function(){return 200;}, 24, 'Arial', '14px', 4, 255, 255, 255, 1, 
			"The Hex Engine: Project Tone. This is a WIP game engine intended to testing purposes only. It is by no means a finished product. If you are interested in the project, follow me on Twitter. twitter.com/ShawnDeprey1"
		));
		this.addButton(new Image_Button('next',  function(){return system.width / 2 + 150;}, function(){return system.height / 2 + 55;}, function(){return 20;}, function(){return 20;}, 
		'next', 'nextHover', function(){
			gm.getElement('main', 'disclaimer').flipForward();
		}));
		this.addButton(new Image_Button('next',  function(){return system.width / 2 + 125;}, function(){return system.height / 2 + 55;}, function(){return 20;}, function(){return 20;}, 
		'previous', 'previousHover', function(){
			gm.getElement('main', 'disclaimer').flipBackward();
		}));
		this.addBox(new Color_Box('disclaimerBackground', function(){return system.width / 2 + 30;}, function(){return system.height / 2 + 7;}, function(){return 125;}, function(){return 275;}, 100, 100, 100, 1));
	}));
}