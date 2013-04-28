function Initialize_System_Gui_Through_Api()
{
	gm.addMenu('blackOverlay', new Gui_Menu(false/*Statless*/, 0/*xOffset*/, 0/*yOffset*/, function(){
		this.addBox(new Color_Box('menuBG', function(){return system.width / 2;}, function(){return system.height / 2;}, function(){return system.height;}, function(){return system.width;}, 0, 0, 0, 0));
		this.addText(new Text_Area('loadingText', function(){return system.width - 172;}, function(){return system.height - 110;}, function(){return 100;}, 18, 'Arial', '20px', 4, 255, 255, 255, 0, 
			"Loading..."
		));
	}));

	gm.addMenu('system', new Gui_Menu(true/*Statless*/, 0/*xOffset*/, 0/*yOffset*/, function(){
		/*this.addText(new Text_Area('assetsLoaded', function(){return 100;}, function(){return 100;}, function(){return 300;}, 18, 'Arial', '20px', 4, 255, 255, 255, 1, 
			"Loading..."
		));*/
		this.addButton(new Image_Button('volumeUp', function(){return system.width - 50;}, function(){return this.h();}, function(){return 20;}, function(){return 20;}, 
		'volumeUp', 'volumeUpHover', function(){
			if(asset.masterVolume == 0) {
				gm.getElement('system', 'toggleMute').asset = 'muteOn'; 
				gm.getElement('system', 'toggleMute').hoverAsset = 'muteOnHover';
			}
			asset.increaseVolume();
		}));
		this.addButton(new Image_Button('toggleMute', function(){return system.width - 75;}, function(){return this.h();}, function(){return 20;}, function(){return 20;}, 
		'muteOn', 'muteOnHover', function(){
			asset.toggleMute();
			if(asset.masterVolume == 0) {
				this.asset = 'muteOff'; this.hoverAsset = 'muteOffHover';
			} else {
				this.asset = 'muteOn'; this.hoverAsset = 'muteOnHover';
			}
		}));
		this.addButton(new Image_Button('volumeDown', function(){return system.width - 100;}, function(){return this.h();}, function(){return 20;}, function(){return 20;}, 
		'volumeDown', 'volumeDownHover', function(){
			asset.decreaseVolume();
			if(asset.masterVolume == 0.0) {
				gm.getElement('system', 'toggleMute').asset = 'muteOff'; 
				gm.getElement('system', 'toggleMute').hoverAsset = 'muteOffHover';
			}
		}));
		this.addBox(new Color_Box('showVolume', function(){return system.width - 75;}, function(){return 35;}, function(){return 5;}, function(){
			return asset.masterVolume * 100;
		},  100, 100, 100, 1));
	}));
	gm.menu['system'].active = true;
}