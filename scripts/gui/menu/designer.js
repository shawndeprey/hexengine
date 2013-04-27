function Initialize_Designer_Menu_Through_Api()
{ //Text_Area(NAME, X, Y, WIDTH, LINE_HEIGHT, FONT, FONT_SIZE, LINES_PER_PAGE, R, G, B, A, CONTENT)

//----------------------------------------------------------------//
//------------------------NPC's Menu------------------------------//
//----------------------------------------------------------------//
gm.addMenu('designer_npc', new Gui_Menu(false/*Statless*/, -4096/*xOffset*/, -4096/*yOffset*/, function(){
		var self = thisMenu = this;
		self.resetThisMenu = function(){
			if(input.iStream.isOpen()){ input.iStream.close(); }
			self.getElement('startAIdown').asset = 'volumeUp'; 
			self.getElement('startAIdown').hoverAsset = 'volumeUpHover';
			self.getElement('secondaryAIdown').asset = 'volumeUp';
			self.getElement('secondaryAIdown').hoverAsset = 'volumeUpHover';
		}
		this.addText(new Text_Area('finishedEditingCollisionText', function(){return system.width - 200;}, function(){return system.height - 110;}, function(){return 100;}, 18, 'Arial', '20px', 4, 255, 255, 255, 1, 
			"Finished   >"
		));
		this.addButton(new Color_Button('finishedEditingCollisionButton', function(){return system.width - 150;}, function(){return system.height - 100;}, function(){return 50;}, function(){return 150;}, 
		'rgb(50,50,50)', 'rgb(80,80,80)', function(){
			self.resetThisMenu();
			gm.closeMenu();
		}));

		this.addText(new Text_Area('displayName', function(){return 100;}, function(){return 80;}, function(){return 300;}, 32, 'Arial', '32px', 1, 255, 255, 255, 1, 
			'Object Name'
		));
//X Coordinate
		setX = system.width - 200; setY = 100;
		this.addButton(new Image_Button('xup', function(){return setX + 100;}, function(){return setY + 7;}, function(){return 20;}, function(){return 20;}, 
			'volumeUp', 'volumeUpHover', function(){ designer.edit.x += 1; self.getElement('posX').updateContent(''+designer.edit.x+''); }, 
			function(){ designer.edit.x += 1; self.getElement('posX').updateContent(''+designer.edit.x+''); }));
		this.addButton(new Image_Button('xdown', function(){return setX - 35;}, function(){return setY + 7;}, function(){return 20;}, function(){return 20;}, 
			'volumeDown', 'volumeDownHover', function(){ designer.edit.x -= 1; self.getElement('posX').updateContent(''+designer.edit.x+''); },
			function(){ designer.edit.x -= 1; self.getElement('posX').updateContent(''+designer.edit.x+''); }));
		this.addText(new Text_Area('posX_Title', function(){return setX - 85;}, function(){return setY - 8;}, function(){return 100;}, 24, 'Arial', '24px', 1, 255, 255, 255, 1, 
			'X:'));
		this.addText(new Text_Area('posX', function(){return setX;}, function(){return setY;}, function(){return 100;}, 15, 'Arial', '15px', 1, 255, 255, 255, 1, 
			'0'));
//End X Coordinate
//Y Coordinate
		setY2 = 130;
		this.addButton(new Image_Button('yup', function(){return setX + 100;}, function(){return setY2 + 7;}, function(){return 20;}, function(){return 20;}, 
			'volumeUp', 'volumeUpHover', function(){ designer.edit.y += 1; self.getElement('posY').updateContent(''+designer.edit.y+''); }, 
			function(){ designer.edit.y += 1; self.getElement('posY').updateContent(''+designer.edit.y+''); }));
		this.addButton(new Image_Button('ydown', function(){return setX - 35;}, function(){return setY2 + 7;}, function(){return 20;}, function(){return 20;}, 
			'volumeDown', 'volumeDownHover', function(){ designer.edit.y -= 1; self.getElement('posY').updateContent(''+designer.edit.y+''); },
			function(){ designer.edit.y -= 1; self.getElement('posY').updateContent(''+designer.edit.y+''); }));
		this.addText(new Text_Area('posY_Title', function(){return setX - 85;}, function(){return setY2 - 8;}, function(){return 100;}, 24, 'Arial', '24px', 1, 255, 255, 255, 1, 
			'Y:'));
		this.addText(new Text_Area('posY', function(){return setX;}, function(){return setY2;}, function(){return 100;}, 15, 'Arial', '15px', 1, 255, 255, 255, 1, 
			'0'));
//End Y Coordinate
//Height
		setY3 = 160;
		this.addButton(new Image_Button('hup', function(){return setX + 100;}, function(){return setY3 + 7;}, function(){return 20;}, function(){return 20;}, 
			'volumeUp', 'volumeUpHover', function(){ designer.edit.height += 1; self.getElement('height').updateContent(''+designer.edit.height+''); }, 
			function(){ designer.edit.height += 1; self.getElement('height').updateContent(''+designer.edit.height+''); }));
		this.addButton(new Image_Button('hdown', function(){return setX - 35;}, function(){return setY3 + 7;}, function(){return 20;}, function(){return 20;}, 
			'volumeDown', 'volumeDownHover', function(){ designer.edit.height -= 1; self.getElement('height').updateContent(''+designer.edit.height+''); },
			function(){ designer.edit.height -= 1; self.getElement('height').updateContent(''+designer.edit.height+''); }));
		this.addText(new Text_Area('H_Title', function(){return setX - 85;}, function(){return setY3 - 8;}, function(){return 100;}, 24, 'Arial', '24px', 1, 255, 255, 255, 1, 
			'H:'));
		this.addText(new Text_Area('height', function(){return setX;}, function(){return setY3;}, function(){return 100;}, 15, 'Arial', '15px', 1, 255, 255, 255, 1, 
			'0'));
//End Height
//Width
		setY4 = 190;
		this.addButton(new Image_Button('wup', function(){return setX + 100;}, function(){return setY4 + 7;}, function(){return 20;}, function(){return 20;}, 
			'volumeUp', 'volumeUpHover', function(){ designer.edit.width += 1; self.getElement('width').updateContent(''+designer.edit.width+''); }, 
			function(){ designer.edit.width += 1; self.getElement('width').updateContent(''+designer.edit.width+''); }));
		this.addButton(new Image_Button('wdown', function(){return setX - 35;}, function(){return setY4 + 7;}, function(){return 20;}, function(){return 20;}, 
			'volumeDown', 'volumeDownHover', function(){ designer.edit.width -= 1; self.getElement('width').updateContent(''+designer.edit.width+''); },
			function(){ designer.edit.width -= 1; self.getElement('width').updateContent(''+designer.edit.width+''); }));
		this.addText(new Text_Area('W_Title', function(){return setX - 85;}, function(){return setY4 - 8;}, function(){return 100;}, 24, 'Arial', '24px', 1, 255, 255, 255, 1, 
			'W:'));
		this.addText(new Text_Area('width', function(){return setX;}, function(){return setY4;}, function(){return 100;}, 15, 'Arial', '15px', 1, 255, 255, 255, 1, 
			'0'));
//End Width
//Foreground
		setY5 = 220;
		this.addButton(new Image_Button('foregrounddown', function(){return setX - 35;}, function(){return setY5 + 7;}, function(){return 20;}, function(){return 20;}, 
			'volumeDown', 'volumeDownHover', function(){ designer.edit.foreground = (designer.edit.foreground) ? false : true; self.getElement('foreground').updateContent(''+designer.edit.foreground+''); },
			function(){ designer.edit.foreground -= 1; self.getElement('foreground').updateContent(''+designer.edit.foreground+''); }));
		this.addText(new Text_Area('Foreground_Title', function(){return setX - 188;}, function(){return setY5 - 8;}, function(){return 100;}, 24, 'Arial', '24px', 1, 255, 255, 255, 1, 
			'Foreground:'));
		this.addText(new Text_Area('foreground', function(){return setX;}, function(){return setY5;}, function(){return 100;}, 15, 'Arial', '15px', 1, 255, 255, 255, 1, 
			'false'));
//End Foreground
//Speed
		setY6 = 250;
		this.addButton(new Image_Button('speedup', function(){return setX + 100;}, function(){return setY6 + 7;}, function(){return 20;}, function(){return 20;}, 
			'volumeUp', 'volumeUpHover', function(){ designer.edit.speed += 1; self.getElement('speed').updateContent(''+designer.edit.speed+''); }, 
			function(){ designer.edit.speed += 1; self.getElement('speed').updateContent(''+designer.edit.speed+''); }));
		this.addButton(new Image_Button('speeddown', function(){return setX - 35;}, function(){return setY6 + 7;}, function(){return 20;}, function(){return 20;}, 
			'volumeDown', 'volumeDownHover', function(){ designer.edit.speed -= 1; self.getElement('speed').updateContent(''+designer.edit.speed+''); },
			function(){ designer.edit.speed -= 1; self.getElement('speed').updateContent(''+designer.edit.speed+''); }));
		this.addText(new Text_Area('Speed_Title', function(){return setX - 130;}, function(){return setY6 - 8;}, function(){return 100;}, 24, 'Arial', '24px', 1, 255, 255, 255, 1, 
			'Speed:'));
		this.addText(new Text_Area('speed', function(){return setX;}, function(){return setY6;}, function(){return 100;}, 15, 'Arial', '15px', 1, 255, 255, 255, 1, 
			'0'));
//End Speed
//Step Size
		setY7 = 280;
		this.addButton(new Image_Button('stepup', function(){return setX + 100;}, function(){return setY7 + 7;}, function(){return 20;}, function(){return 20;}, 
			'volumeUp', 'volumeUpHover', function(){ designer.edit.stepSize = (designer.edit.stepSize + 0.01 > 1) ? 1 : designer.edit.stepSize + 0.01; self.getElement('stepsize').updateContent(''+designer.edit.stepSize+''); }, 
			function(){ designer.edit.stepSize = (designer.edit.stepSize + 0.01 > 1) ? 1 : designer.edit.stepSize + 0.01; self.getElement('stepsize').updateContent(''+designer.edit.stepSize+''); }));
		this.addButton(new Image_Button('stepdown', function(){return setX - 35;}, function(){return setY7 + 7;}, function(){return 20;}, function(){return 20;}, 
			'volumeDown', 'volumeDownHover', function(){ designer.edit.stepSize = (designer.edit.stepSize - 0.01 < 0) ? 0 : designer.edit.stepSize - 0.01; self.getElement('stepsize').updateContent(''+designer.edit.stepSize+''); },
			function(){ designer.edit.stepSize = (designer.edit.stepSize - 0.01 < 0) ? 0 : designer.edit.stepSize - 0.01; self.getElement('stepsize').updateContent(''+designer.edit.stepSize+''); }));
		this.addText(new Text_Area('Stepsize_Title', function(){return setX - 163;}, function(){return setY7 - 8;}, function(){return 100;}, 24, 'Arial', '24px', 1, 255, 255, 255, 1, 
			'Step Size:'));
		this.addText(new Text_Area('stepsize', function(){return setX;}, function(){return setY7;}, function(){return 100;}, 15, 'Arial', '15px', 1, 255, 255, 255, 1, 
			'0'));
//End Step
//Start_AI
		setX2 = setX - 100;
		setY8 = 310;
		this.addButton(new Image_Button('startAIdown', function(){return setX2 - 35;}, function(){return setY8 + 7;}, function(){return 20;}, function(){return 20;}, 
			'volumeUp', 'volumeUpHover', function(){
				if(input.iStream.isOpen()){ input.iStream.close(); input.iStream.onInput = function(){};
					self.getElement('startAIdown').asset = 'volumeUp'; self.getElement('startAIdown').hoverAsset = 'volumeUpHover';
				} else { input.iStream.open(); input.iStream.setStream(designer.edit.startAI);
					input.iStream.onInput = function(){
						designer.edit.startAI = input.iStream.in(); thisMenu.getElement('startai').updateContent(''+designer.edit.startAI+''); 
					}; self.getElement('startAIdown').asset = 'volumeDown'; self.getElement('startAIdown').hoverAsset = 'volumeDownHover';
				}
			}));
		this.addText(new Text_Area('StartAI_Title', function(){return setX2 - 139;}, function(){return setY8 - 8;}, function(){return 100;}, 24, 'Arial', '24px', 1, 255, 255, 255, 1, 
			'Start AI:'));
		this.addText(new Text_Area('startai', function(){return setX2;}, function(){return setY8;}, function(){return 100;}, 15, 'Arial', '15px', 1, 255, 255, 255, 1, 
			'null'));
//End Start_AI
//Secondary_AI
		setY9 = 340;
		this.addButton(new Image_Button('secondaryAIdown', function(){return setX2 - 35;}, function(){return setY9 + 7;}, function(){return 20;}, function(){return 20;}, 
			'volumeUp', 'volumeUpHover', function(){
				if(input.iStream.isOpen()){ input.iStream.close(); input.iStream.onInput = function(){};
					self.getElement('secondaryAIdown').asset = 'volumeUp'; self.getElement('secondaryAIdown').hoverAsset = 'volumeUpHover';
				} else { input.iStream.open(); input.iStream.setStream(designer.edit.secondAI);
					input.iStream.onInput = function(){
						designer.edit.secondAI = input.iStream.in(); thisMenu.getElement('secondaryai').updateContent(''+designer.edit.secondAI+''); 
					}; self.getElement('secondaryAIdown').asset = 'volumeDown'; self.getElement('secondaryAIdown').hoverAsset = 'volumeDownHover';
				}
			}));
		this.addText(new Text_Area('SecondaryAI_Title', function(){return setX2 - 202;}, function(){return setY9 - 8;}, function(){return 120;}, 24, 'Arial', '24px', 1, 255, 255, 255, 1, 
			'Secondary AI:'));
		this.addText(new Text_Area('secondaryai', function(){return setX2;}, function(){return setY9;}, function(){return 100;}, 15, 'Arial', '15px', 1, 255, 255, 255, 1, 
			'null'));
//End Secondary_AI
	}));

//----------------------------------------------------------------//
//---------------------Collisions Menu---------------------------//
//----------------------------------------------------------------//
	gm.addMenu('designer_collision', new Gui_Menu(false/*Statless*/, -4096/*xOffset*/, -4096/*yOffset*/, function(){
		var self = this;
		this.addText(new Text_Area('finishedEditingCollisionText', function(){return system.width - 200;}, function(){return system.height - 110;}, function(){return 100;}, 18, 'Arial', '20px', 4, 255, 255, 255, 1, 
			"Finished   >"
		));
		this.addButton(new Color_Button('finishedEditingCollisionButton', function(){return system.width - 150;}, function(){return system.height - 100;}, function(){return 50;}, function(){return 150;}, 
		'rgb(50,50,50)', 'rgb(80,80,80)', function(){
			gm.closeMenu();
		}));

		this.addText(new Text_Area('displayName', function(){return 100;}, function(){return 80;}, function(){return 300;}, 32, 'Arial', '32px', 1, 255, 255, 255, 1, 
			'Object Name'
		));
//X Coordinate
		setX = system.width - 200; setY = 100;
		this.addButton(new Image_Button('xup', function(){return setX + 100;}, function(){return setY + 7;}, function(){return 20;}, function(){return 20;}, 
			'volumeUp', 'volumeUpHover', function(){ designer.edit.x += 1; self.getElement('posX').updateContent(''+designer.edit.x+''); }, 
			function(){ designer.edit.x += 1; self.getElement('posX').updateContent(''+designer.edit.x+''); }));
		this.addButton(new Image_Button('xdown', function(){return setX - 35;}, function(){return setY + 7;}, function(){return 20;}, function(){return 20;}, 
			'volumeDown', 'volumeDownHover', function(){ designer.edit.x -= 1; self.getElement('posX').updateContent(''+designer.edit.x+''); },
			function(){ designer.edit.x -= 1; self.getElement('posX').updateContent(''+designer.edit.x+''); }));
		this.addText(new Text_Area('posX_Title', function(){return setX - 85;}, function(){return setY - 8;}, function(){return 100;}, 24, 'Arial', '24px', 1, 255, 255, 255, 1, 
			'X:'));
		this.addText(new Text_Area('posX', function(){return setX;}, function(){return setY;}, function(){return 100;}, 15, 'Arial', '15px', 1, 255, 255, 255, 1, 
			'0'));
//End X Coordinate
//Y Coordinate
		setY2 = 130;
		this.addButton(new Image_Button('yup', function(){return setX + 100;}, function(){return setY2 + 7;}, function(){return 20;}, function(){return 20;}, 
			'volumeUp', 'volumeUpHover', function(){ designer.edit.y += 1; self.getElement('posY').updateContent(''+designer.edit.y+''); }, 
			function(){ designer.edit.y += 1; self.getElement('posY').updateContent(''+designer.edit.y+''); }));
		this.addButton(new Image_Button('ydown', function(){return setX - 35;}, function(){return setY2 + 7;}, function(){return 20;}, function(){return 20;}, 
			'volumeDown', 'volumeDownHover', function(){ designer.edit.y -= 1; self.getElement('posY').updateContent(''+designer.edit.y+''); },
			function(){ designer.edit.y -= 1; self.getElement('posY').updateContent(''+designer.edit.y+''); }));
		this.addText(new Text_Area('posY_Title', function(){return setX - 85;}, function(){return setY2 - 8;}, function(){return 100;}, 24, 'Arial', '24px', 1, 255, 255, 255, 1, 
			'Y:'));
		this.addText(new Text_Area('posY', function(){return setX;}, function(){return setY2;}, function(){return 100;}, 15, 'Arial', '15px', 1, 255, 255, 255, 1, 
			'0'));
//End Y Coordinate
//Height
		setY3 = 160;
		this.addButton(new Image_Button('hup', function(){return setX + 100;}, function(){return setY3 + 7;}, function(){return 20;}, function(){return 20;}, 
			'volumeUp', 'volumeUpHover', function(){ designer.edit.h += 1; self.getElement('height').updateContent(''+designer.edit.h+''); }, 
			function(){ designer.edit.h += 1; self.getElement('height').updateContent(''+designer.edit.h+''); }));
		this.addButton(new Image_Button('hdown', function(){return setX - 35;}, function(){return setY3 + 7;}, function(){return 20;}, function(){return 20;}, 
			'volumeDown', 'volumeDownHover', function(){ designer.edit.h -= 1; self.getElement('height').updateContent(''+designer.edit.h+''); },
			function(){ designer.edit.h -= 1; self.getElement('height').updateContent(''+designer.edit.h+''); }));
		this.addText(new Text_Area('H_Title', function(){return setX - 85;}, function(){return setY3 - 8;}, function(){return 100;}, 24, 'Arial', '24px', 1, 255, 255, 255, 1, 
			'H:'));
		this.addText(new Text_Area('height', function(){return setX;}, function(){return setY3;}, function(){return 100;}, 15, 'Arial', '15px', 1, 255, 255, 255, 1, 
			'0'));
//End Height
//Width
		setY4 = 190;
		this.addButton(new Image_Button('wup', function(){return setX + 100;}, function(){return setY4 + 7;}, function(){return 20;}, function(){return 20;}, 
			'volumeUp', 'volumeUpHover', function(){ designer.edit.w += 1; self.getElement('width').updateContent(''+designer.edit.w+''); }, 
			function(){ designer.edit.w += 1; self.getElement('width').updateContent(''+designer.edit.w+''); }));
		this.addButton(new Image_Button('wdown', function(){return setX - 35;}, function(){return setY4 + 7;}, function(){return 20;}, function(){return 20;}, 
			'volumeDown', 'volumeDownHover', function(){ designer.edit.w -= 1; self.getElement('width').updateContent(''+designer.edit.w+''); },
			function(){ designer.edit.w -= 1; self.getElement('width').updateContent(''+designer.edit.w+''); }));
		this.addText(new Text_Area('W_Title', function(){return setX - 85;}, function(){return setY4 - 8;}, function(){return 100;}, 24, 'Arial', '24px', 1, 255, 255, 255, 1, 
			'W:'));
		this.addText(new Text_Area('width', function(){return setX;}, function(){return setY4;}, function(){return 100;}, 15, 'Arial', '15px', 1, 255, 255, 255, 1, 
			'0'));
//End Width

	}));


//----------------------------------------------------------------//
//---------------------Checkpoints Menu---------------------------//
//----------------------------------------------------------------//
gm.addMenu('designer_checkpoint', new Gui_Menu(false/*Statless*/, -4096/*xOffset*/, -4096/*yOffset*/, function(){
		var self = this;
		this.addText(new Text_Area('finishedEditingCollisionText', function(){return system.width - 200;}, function(){return system.height - 110;}, function(){return 100;}, 18, 'Arial', '20px', 4, 255, 255, 255, 1, 
			"Finished   >"
		));
		this.addButton(new Color_Button('finishedEditingCollisionButton', function(){return system.width - 150;}, function(){return system.height - 100;}, function(){return 50;}, function(){return 150;}, 
		'rgb(50,50,50)', 'rgb(80,80,80)', function(){
			gm.closeMenu();
		}));

		this.addText(new Text_Area('displayName', function(){return 100;}, function(){return 80;}, function(){return 300;}, 32, 'Arial', '32px', 1, 255, 255, 255, 1, 
			'Object Name'
		));
//X Coordinate
		setX = system.width - 200; setY = 100;
		this.addButton(new Image_Button('xup', function(){return setX + 100;}, function(){return setY + 7;}, function(){return 20;}, function(){return 20;}, 
			'volumeUp', 'volumeUpHover', function(){ designer.edit.x += 1; self.getElement('posX').updateContent(''+designer.edit.x+''); }, 
			function(){ designer.edit.x += 1; self.getElement('posX').updateContent(''+designer.edit.x+''); }));
		this.addButton(new Image_Button('xdown', function(){return setX - 35;}, function(){return setY + 7;}, function(){return 20;}, function(){return 20;}, 
			'volumeDown', 'volumeDownHover', function(){ designer.edit.x -= 1; self.getElement('posX').updateContent(''+designer.edit.x+''); },
			function(){ designer.edit.x -= 1; self.getElement('posX').updateContent(''+designer.edit.x+''); }));
		this.addText(new Text_Area('posX_Title', function(){return setX - 85;}, function(){return setY - 8;}, function(){return 100;}, 24, 'Arial', '24px', 1, 255, 255, 255, 1, 
			'X:'));
		this.addText(new Text_Area('posX', function(){return setX;}, function(){return setY;}, function(){return 100;}, 15, 'Arial', '15px', 1, 255, 255, 255, 1, 
			'0'));
//End X Coordinate
//Y Coordinate
		setY2 = 130;
		this.addButton(new Image_Button('yup', function(){return setX + 100;}, function(){return setY2 + 7;}, function(){return 20;}, function(){return 20;}, 
			'volumeUp', 'volumeUpHover', function(){ designer.edit.y += 1; self.getElement('posY').updateContent(''+designer.edit.y+''); }, 
			function(){ designer.edit.y += 1; self.getElement('posY').updateContent(''+designer.edit.y+''); }));
		this.addButton(new Image_Button('ydown', function(){return setX - 35;}, function(){return setY2 + 7;}, function(){return 20;}, function(){return 20;}, 
			'volumeDown', 'volumeDownHover', function(){ designer.edit.y -= 1; self.getElement('posY').updateContent(''+designer.edit.y+''); },
			function(){ designer.edit.y -= 1; self.getElement('posY').updateContent(''+designer.edit.y+''); }));
		this.addText(new Text_Area('posY_Title', function(){return setX - 85;}, function(){return setY2 - 8;}, function(){return 100;}, 24, 'Arial', '24px', 1, 255, 255, 255, 1, 
			'Y:'));
		this.addText(new Text_Area('posY', function(){return setX;}, function(){return setY2;}, function(){return 100;}, 15, 'Arial', '15px', 1, 255, 255, 255, 1, 
			'0'));
//End Y Coordinate
//Height
		setY3 = 160;
		this.addButton(new Image_Button('hup', function(){return setX + 100;}, function(){return setY3 + 7;}, function(){return 20;}, function(){return 20;}, 
			'volumeUp', 'volumeUpHover', function(){ designer.edit.height += 1; self.getElement('height').updateContent(''+designer.edit.height+''); }, 
			function(){ designer.edit.height += 1; self.getElement('height').updateContent(''+designer.edit.height+''); }));
		this.addButton(new Image_Button('hdown', function(){return setX - 35;}, function(){return setY3 + 7;}, function(){return 20;}, function(){return 20;}, 
			'volumeDown', 'volumeDownHover', function(){ designer.edit.height -= 1; self.getElement('height').updateContent(''+designer.edit.height+''); },
			function(){ designer.edit.height -= 1; self.getElement('height').updateContent(''+designer.edit.height+''); }));
		this.addText(new Text_Area('H_Title', function(){return setX - 85;}, function(){return setY3 - 8;}, function(){return 100;}, 24, 'Arial', '24px', 1, 255, 255, 255, 1, 
			'H:'));
		this.addText(new Text_Area('height', function(){return setX;}, function(){return setY3;}, function(){return 100;}, 15, 'Arial', '15px', 1, 255, 255, 255, 1, 
			'0'));
//End Height
//Width
		setY4 = 190;
		this.addButton(new Image_Button('wup', function(){return setX + 100;}, function(){return setY4 + 7;}, function(){return 20;}, function(){return 20;}, 
			'volumeUp', 'volumeUpHover', function(){ designer.edit.width += 1; self.getElement('width').updateContent(''+designer.edit.width+''); }, 
			function(){ designer.edit.width += 1; self.getElement('width').updateContent(''+designer.edit.width+''); }));
		this.addButton(new Image_Button('wdown', function(){return setX - 35;}, function(){return setY4 + 7;}, function(){return 20;}, function(){return 20;}, 
			'volumeDown', 'volumeDownHover', function(){ designer.edit.width -= 1; self.getElement('width').updateContent(''+designer.edit.width+''); },
			function(){ designer.edit.width -= 1; self.getElement('width').updateContent(''+designer.edit.width+''); }));
		this.addText(new Text_Area('W_Title', function(){return setX - 85;}, function(){return setY4 - 8;}, function(){return 100;}, 24, 'Arial', '24px', 1, 255, 255, 255, 1, 
			'W:'));
		this.addText(new Text_Area('width', function(){return setX;}, function(){return setY4;}, function(){return 100;}, 15, 'Arial', '15px', 1, 255, 255, 255, 1, 
			'0'));
//End Width
//Active
		setY5 = 220;
		this.addButton(new Image_Button('activedown', function(){return setX - 35;}, function(){return setY5 + 7;}, function(){return 20;}, function(){return 20;}, 
			'volumeDown', 'volumeDownHover', function(){ designer.edit.active = (designer.edit.active) ? false : true; self.getElement('active').updateContent(''+designer.edit.active+''); },
			function(){ designer.edit.active -= 1; self.getElement('active').updateContent(''+designer.edit.active+''); }));
		this.addText(new Text_Area('Active_Title', function(){return setX - 125;}, function(){return setY5 - 8;}, function(){return 100;}, 24, 'Arial', '24px', 1, 255, 255, 255, 1, 
			'Active:'));
		this.addText(new Text_Area('active', function(){return setX;}, function(){return setY5;}, function(){return 100;}, 15, 'Arial', '15px', 1, 255, 255, 255, 1, 
			'0'));
//End Active

	}));

//----------------------------------------------------------------//
//----------------------Navigation Menu---------------------------//
//----------------------------------------------------------------//
gm.addMenu('designer_navinode', new Gui_Menu(false/*Statless*/, -4096/*xOffset*/, -4096/*yOffset*/, function(){
		var self = this;
		this.addText(new Text_Area('finishedEditingCollisionText', function(){return system.width - 200;}, function(){return system.height - 110;}, function(){return 100;}, 18, 'Arial', '20px', 4, 255, 255, 255, 1, 
			"Finished   >"
		));
		this.addButton(new Color_Button('finishedEditingCollisionButton', function(){return system.width - 150;}, function(){return system.height - 100;}, function(){return 50;}, function(){return 150;}, 
		'rgb(50,50,50)', 'rgb(80,80,80)', function(){
			gm.closeMenu();
		}));

		this.addText(new Text_Area('displayName', function(){return 100;}, function(){return 80;}, function(){return 300;}, 32, 'Arial', '32px', 1, 255, 255, 255, 1, 
			'Object Name'
		));
//X Coordinate
		setX = system.width - 200; setY = 100;
		this.addButton(new Image_Button('xup', function(){return setX + 100;}, function(){return setY + 7;}, function(){return 20;}, function(){return 20;}, 
			'volumeUp', 'volumeUpHover', function(){ designer.edit.x += 1; self.getElement('posX').updateContent(''+designer.edit.x+''); }, 
			function(){ designer.edit.x += 1; self.getElement('posX').updateContent(''+designer.edit.x+''); }));
		this.addButton(new Image_Button('xdown', function(){return setX - 35;}, function(){return setY + 7;}, function(){return 20;}, function(){return 20;}, 
			'volumeDown', 'volumeDownHover', function(){ designer.edit.x -= 1; self.getElement('posX').updateContent(''+designer.edit.x+''); },
			function(){ designer.edit.x -= 1; self.getElement('posX').updateContent(''+designer.edit.x+''); }));
		this.addText(new Text_Area('posX_Title', function(){return setX - 85;}, function(){return setY - 8;}, function(){return 100;}, 24, 'Arial', '24px', 1, 255, 255, 255, 1, 
			'X:'));
		this.addText(new Text_Area('posX', function(){return setX;}, function(){return setY;}, function(){return 100;}, 15, 'Arial', '15px', 1, 255, 255, 255, 1, 
			'0'));
//End X Coordinate
//Y Coordinate
		setY2 = 130;
		this.addButton(new Image_Button('yup', function(){return setX + 100;}, function(){return setY2 + 7;}, function(){return 20;}, function(){return 20;}, 
			'volumeUp', 'volumeUpHover', function(){ designer.edit.y += 1; self.getElement('posY').updateContent(''+designer.edit.y+''); }, 
			function(){ designer.edit.y += 1; self.getElement('posY').updateContent(''+designer.edit.y+''); }));
		this.addButton(new Image_Button('ydown', function(){return setX - 35;}, function(){return setY2 + 7;}, function(){return 20;}, function(){return 20;}, 
			'volumeDown', 'volumeDownHover', function(){ designer.edit.y -= 1; self.getElement('posY').updateContent(''+designer.edit.y+''); },
			function(){ designer.edit.y -= 1; self.getElement('posY').updateContent(''+designer.edit.y+''); }));
		this.addText(new Text_Area('posY_Title', function(){return setX - 85;}, function(){return setY2 - 8;}, function(){return 100;}, 24, 'Arial', '24px', 1, 255, 255, 255, 1, 
			'Y:'));
		this.addText(new Text_Area('posY', function(){return setX;}, function(){return setY2;}, function(){return 100;}, 15, 'Arial', '15px', 1, 255, 255, 255, 1, 
			'0'));
//End Y Coordinate
//Height
		setY3 = 160;
		this.addButton(new Image_Button('hup', function(){return setX + 100;}, function(){return setY3 + 7;}, function(){return 20;}, function(){return 20;}, 
			'volumeUp', 'volumeUpHover', function(){ designer.edit.height += 1; self.getElement('height').updateContent(''+designer.edit.height+''); }, 
			function(){ designer.edit.height += 1; self.getElement('height').updateContent(''+designer.edit.height+''); }));
		this.addButton(new Image_Button('hdown', function(){return setX - 35;}, function(){return setY3 + 7;}, function(){return 20;}, function(){return 20;}, 
			'volumeDown', 'volumeDownHover', function(){ designer.edit.height -= 1; self.getElement('height').updateContent(''+designer.edit.height+''); },
			function(){ designer.edit.height -= 1; self.getElement('height').updateContent(''+designer.edit.height+''); }));
		this.addText(new Text_Area('H_Title', function(){return setX - 85;}, function(){return setY3 - 8;}, function(){return 100;}, 24, 'Arial', '24px', 1, 255, 255, 255, 1, 
			'H:'));
		this.addText(new Text_Area('height', function(){return setX;}, function(){return setY3;}, function(){return 100;}, 15, 'Arial', '15px', 1, 255, 255, 255, 1, 
			'0'));
//End Height
//Width
		setY4 = 190;
		this.addButton(new Image_Button('wup', function(){return setX + 100;}, function(){return setY4 + 7;}, function(){return 20;}, function(){return 20;}, 
			'volumeUp', 'volumeUpHover', function(){ designer.edit.width += 1; self.getElement('width').updateContent(''+designer.edit.width+''); }, 
			function(){ designer.edit.width += 1; self.getElement('width').updateContent(''+designer.edit.width+''); }));
		this.addButton(new Image_Button('wdown', function(){return setX - 35;}, function(){return setY4 + 7;}, function(){return 20;}, function(){return 20;}, 
			'volumeDown', 'volumeDownHover', function(){ designer.edit.width -= 1; self.getElement('width').updateContent(''+designer.edit.width+''); },
			function(){ designer.edit.width -= 1; self.getElement('width').updateContent(''+designer.edit.width+''); }));
		this.addText(new Text_Area('W_Title', function(){return setX - 85;}, function(){return setY4 - 8;}, function(){return 100;}, 24, 'Arial', '24px', 1, 255, 255, 255, 1, 
			'W:'));
		this.addText(new Text_Area('width', function(){return setX;}, function(){return setY4;}, function(){return 100;}, 15, 'Arial', '15px', 1, 255, 255, 255, 1, 
			'0'));
//End Width
//Node Number
		setY5 = 220;
		this.addButton(new Image_Button('nodeup', function(){return setX + 100;}, function(){return setY5 + 7;}, function(){return 20;}, function(){return 20;}, 
			'volumeUp', 'volumeUpHover', function(){ designer.edit.num += 1; self.getElement('navi').updateContent(''+designer.edit.num+''); }, 
			function(){ designer.edit.num += 1; self.getElement('navi').updateContent(''+designer.edit.num+''); }));
		this.addButton(new Image_Button('nodedown', function(){return setX - 35;}, function(){return setY5 + 7;}, function(){return 20;}, function(){return 20;}, 
			'volumeDown', 'volumeDownHover', function(){ designer.edit.num -= 1; self.getElement('navi').updateContent(''+designer.edit.num+''); },
			function(){ designer.edit.num -= 1; self.getElement('navi').updateContent(''+designer.edit.num+''); }));
		this.addText(new Text_Area('Node_Title', function(){return setX - 178;}, function(){return setY5 - 8;}, function(){return 100;}, 24, 'Arial', '24px', 1, 255, 255, 255, 1, 
			'Node Num:'));
		this.addText(new Text_Area('navi', function(){return setX;}, function(){return setY5;}, function(){return 100;}, 15, 'Arial', '15px', 1, 255, 255, 255, 1, 
			'0'));
//End Node Number
	}));

//----------------------------------------------------------------//
//----------------------Lighting Menu-----------------------------//
//----------------------------------------------------------------//
gm.addMenu('designer_light', new Gui_Menu(false/*Statless*/, -4096/*xOffset*/, -4096/*yOffset*/, function(){
		var self = this;
		this.addText(new Text_Area('finishedEditingCollisionText', function(){return system.width - 200;}, function(){return system.height - 110;}, function(){return 100;}, 18, 'Arial', '20px', 4, 255, 255, 255, 1, 
			"Finished   >"
		));
		this.addButton(new Color_Button('finishedEditingCollisionButton', function(){return system.width - 150;}, function(){return system.height - 100;}, function(){return 50;}, function(){return 150;}, 
		'rgb(50,50,50)', 'rgb(80,80,80)', function(){
			gm.closeMenu();
		}));
//Object Name
		this.addText(new Text_Area('displayName', function(){return 100;}, function(){return 80;}, function(){return 300;}, 32, 'Arial', '32px', 1, 255, 255, 255, 1, 
			'Object Name'
		));
//X Coordinate
		setX = system.width - 200; setY = 100;
		this.addButton(new Image_Button('xup', function(){return setX + 100;}, function(){return setY + 7;}, function(){return 20;}, function(){return 20;}, 
			'volumeUp', 'volumeUpHover', function(){ designer.edit.x += 1;designer.edit.worldX += lighting.resolution; self.getElement('posX').updateContent(''+designer.edit.x+''); }, 
			function(){ designer.edit.x += 1;designer.edit.worldX += lighting.resolution; self.getElement('posX').updateContent(''+designer.edit.x+''); }));
		this.addButton(new Image_Button('xdown', function(){return setX - 35;}, function(){return setY + 7;}, function(){return 20;}, function(){return 20;}, 
			'volumeDown', 'volumeDownHover', function(){ designer.edit.x -= 1;designer.edit.worldX -= lighting.resolution; self.getElement('posX').updateContent(''+designer.edit.x+''); },
			function(){ designer.edit.x -= 1;designer.edit.worldX -= lighting.resolution; self.getElement('posX').updateContent(''+designer.edit.x+''); }));
		this.addText(new Text_Area('posX_Title', function(){return setX - 85;}, function(){return setY - 8;}, function(){return 100;}, 24, 'Arial', '24px', 1, 255, 255, 255, 1, 
			'X:'));
		this.addText(new Text_Area('posX', function(){return setX;}, function(){return setY;}, function(){return 100;}, 15, 'Arial', '15px', 1, 255, 255, 255, 1, 
			'0'));
//End X Coordinate
//Y Coordinate
		setY2 = 130;
		this.addButton(new Image_Button('yup', function(){return setX + 100;}, function(){return setY2 + 7;}, function(){return 20;}, function(){return 20;}, 
			'volumeUp', 'volumeUpHover', function(){ designer.edit.y += 1;designer.edit.worldY += lighting.resolution; self.getElement('posY').updateContent(''+designer.edit.y+''); }, 
			function(){ designer.edit.y += 1;designer.edit.worldY += lighting.resolution; self.getElement('posY').updateContent(''+designer.edit.y+''); }));
		this.addButton(new Image_Button('ydown', function(){return setX - 35;}, function(){return setY2 + 7;}, function(){return 20;}, function(){return 20;}, 
			'volumeDown', 'volumeDownHover', function(){ designer.edit.y -= 1;designer.edit.worldY -= lighting.resolution; self.getElement('posY').updateContent(''+designer.edit.y+''); },
			function(){ designer.edit.y -= 1;designer.edit.worldY -= lighting.resolution; self.getElement('posY').updateContent(''+designer.edit.y+''); }));
		this.addText(new Text_Area('posY_Title', function(){return setX - 85;}, function(){return setY2 - 8;}, function(){return 100;}, 24, 'Arial', '24px', 1, 255, 255, 255, 1, 
			'Y:'));
		this.addText(new Text_Area('posY', function(){return setX;}, function(){return setY2;}, function(){return 100;}, 15, 'Arial', '15px', 1, 255, 255, 255, 1, 
			'0'));
//End Y Coordinate
//Red Amount
		setY3 = 160;
		this.addButton(new Image_Button('redup', function(){return setX + 100;}, function(){return setY3 + 7;}, function(){return 20;}, function(){return 20;}, 
			'volumeUp', 'volumeUpHover', function(){ designer.edit.r += designer.edit.r > 254 ? -255 : 1; self.getElement('red').updateContent(''+designer.edit.r+''); }, 
			function(){ designer.edit.r += designer.edit.r > 254 ? -255 : 1; self.getElement('red').updateContent(''+designer.edit.r+''); }));
		this.addButton(new Image_Button('reddown', function(){return setX - 35;}, function(){return setY3 + 7;}, function(){return 20;}, function(){return 20;}, 
			'volumeDown', 'volumeDownHover', function(){ designer.edit.r += designer.edit.r < 1 ? 255 : -1; self.getElement('red').updateContent(''+designer.edit.r+''); },
			function(){ designer.edit.r += designer.edit.r < 1 ? 255 : -1; self.getElement('red').updateContent(''+designer.edit.r+''); }));
		this.addText(new Text_Area('red_Title', function(){return setX - 85;}, function(){return setY3 - 8;}, function(){return 100;}, 24, 'Arial', '24px', 1, 255, 255, 255, 1, 
			'R:'));
		this.addText(new Text_Area('red', function(){return setX;}, function(){return setY3;}, function(){return 100;}, 15, 'Arial', '15px', 1, 255, 255, 255, 1, 
			'0'));
//End Red Amount
//Green Amount
		setY4 = 190;
		this.addButton(new Image_Button('greenup', function(){return setX + 100;}, function(){return setY4 + 7;}, function(){return 20;}, function(){return 20;}, 
			'volumeUp', 'volumeUpHover', function(){ designer.edit.g += designer.edit.g > 254 ? -255 : 1; self.getElement('green').updateContent(''+designer.edit.g+''); }, 
			function(){ designer.edit.g += designer.edit.g > 254 ? -255 : 1; self.getElement('green').updateContent(''+designer.edit.g+''); }));
		this.addButton(new Image_Button('greendown', function(){return setX - 35;}, function(){return setY4 + 7;}, function(){return 20;}, function(){return 20;}, 
			'volumeDown', 'volumeDownHover', function(){ designer.edit.g += designer.edit.g < 1 ? 255 : -1; self.getElement('green').updateContent(''+designer.edit.g+''); },
			function(){ designer.edit.g += designer.edit.g < 1 ? 255 : -1; self.getElement('green').updateContent(''+designer.edit.g+''); }));
		this.addText(new Text_Area('green_Title', function(){return setX - 85;}, function(){return setY4 - 8;}, function(){return 100;}, 24, 'Arial', '24px', 1, 255, 255, 255, 1, 
			'G:'));
		this.addText(new Text_Area('green', function(){return setX;}, function(){return setY4;}, function(){return 100;}, 15, 'Arial', '15px', 1, 255, 255, 255, 1, 
			'0'));
//End Green Amount
//Blue Amount
		setY5 = 220;
		this.addButton(new Image_Button('blueup', function(){return setX + 100;}, function(){return setY5 + 7;}, function(){return 20;}, function(){return 20;}, 
			'volumeUp', 'volumeUpHover', function(){ designer.edit.b += designer.edit.b > 254 ? -255 : 1; self.getElement('blue').updateContent(''+designer.edit.b+''); }, 
			function(){ designer.edit.b += designer.edit.b > 254 ? -255 : 1; self.getElement('blue').updateContent(''+designer.edit.b+''); }));
		this.addButton(new Image_Button('bluedown', function(){return setX - 35;}, function(){return setY5 + 7;}, function(){return 20;}, function(){return 20;}, 
			'volumeDown', 'volumeDownHover', function(){ designer.edit.b += designer.edit.b < 1 ? 255 : -1; self.getElement('blue').updateContent(''+designer.edit.b+''); },
			function(){ designer.edit.b += designer.edit.b < 1 ? 255 : -1; self.getElement('blue').updateContent(''+designer.edit.b+''); }));
		this.addText(new Text_Area('blue_Title', function(){return setX - 85;}, function(){return setY5 - 8;}, function(){return 100;}, 24, 'Arial', '24px', 1, 255, 255, 255, 1, 
			'B:'));
		this.addText(new Text_Area('blue', function(){return setX;}, function(){return setY5;}, function(){return 100;}, 15, 'Arial', '15px', 1, 255, 255, 255, 1, 
			'0'));
//End Blue Amount
//Radius
		setY6 = 250;
		this.addButton(new Image_Button('radiusup', function(){return setX + 100;}, function(){return setY6 + 7;}, function(){return 20;}, function(){return 20;}, 
			'volumeUp', 'volumeUpHover', function(){ designer.edit.setRadius(designer.edit.radius + 1); self.getElement('radius').updateContent(''+designer.edit.radius+''); }, 
			function(){ designer.edit.setRadius(designer.edit.radius + 1); self.getElement('radius').updateContent(''+designer.edit.radius+''); }));
		this.addButton(new Image_Button('radiusdown', function(){return setX - 35;}, function(){return setY6 + 7;}, function(){return 20;}, function(){return 20;}, 
			'volumeDown', 'volumeDownHover', function(){ designer.edit.setRadius((designer.edit.radius - 1 < 0) ? designer.edit.radius : designer.edit.radius - 1); self.getElement('radius').updateContent(''+designer.edit.radius+''); },
			function(){ designer.edit.setRadius((designer.edit.radius - 1 < 0) ? designer.edit.radius : designer.edit.radius - 1); self.getElement('radius').updateContent(''+designer.edit.radius+''); }));
		this.addText(new Text_Area('radius_Title', function(){return setX - 142;}, function(){return setY6 - 8;}, function(){return 100;}, 24, 'Arial', '24px', 1, 255, 255, 255, 1, 
			'Radius:'));
		this.addText(new Text_Area('radius', function(){return setX;}, function(){return setY6;}, function(){return 100;}, 15, 'Arial', '15px', 1, 255, 255, 255, 1, 
			'0'));
//End Radius
//Brightness
		setY7 = 280;
		this.addButton(new Image_Button('brightnessup', function(){return setX + 100;}, function(){return setY7 + 7;}, function(){return 20;}, function(){return 20;}, 
			'volumeUp', 'volumeUpHover', function(){ designer.edit.setBrightness(designer.edit.brightness + 1); self.getElement('brightness').updateContent(''+designer.edit.brightness+''); }, 
			function(){ designer.edit.setBrightness(designer.edit.brightness + 1); self.getElement('brightness').updateContent(''+designer.edit.brightness+''); }));
		this.addButton(new Image_Button('brightnessdown', function(){return setX - 35;}, function(){return setY7 + 7;}, function(){return 20;}, function(){return 20;}, 
			'volumeDown', 'volumeDownHover', function(){ designer.edit.setBrightness(designer.edit.brightness - 1); self.getElement('brightness').updateContent(''+designer.edit.brightness+''); },
			function(){ designer.edit.setBrightness(designer.edit.brightness - 1); self.getElement('brightness').updateContent(''+designer.edit.brightness+''); }));
		this.addText(new Text_Area('brightness_Title', function(){return setX - 180;}, function(){return setY7 - 8;}, function(){return 100;}, 24, 'Arial', '24px', 1, 255, 255, 255, 1, 
			'Brightness:'));
		this.addText(new Text_Area('brightness', function(){return setX;}, function(){return setY7;}, function(){return 100;}, 15, 'Arial', '15px', 1, 255, 255, 255, 1, 
			'0'));
//End Brightness
//Specular Factor
		setY8 = 310;
		this.addButton(new Image_Button('specularup', function(){return setX + 100;}, function(){return setY8 + 7;}, function(){return 20;}, function(){return 20;}, 
			'volumeUp', 'volumeUpHover', function(){ designer.edit.changeSpecFactor(0.01); self.getElement('specular').updateContent(''+Math.floor(designer.edit.specularFactor * 100) / 100+''); }, 
			function(){ designer.edit.changeSpecFactor(0.01); self.getElement('specular').updateContent(''+Math.floor(designer.edit.specularFactor * 100) / 100+''); }));
		this.addButton(new Image_Button('speculardown', function(){return setX - 35;}, function(){return setY8 + 7;}, function(){return 20;}, function(){return 20;}, 
			'volumeDown', 'volumeDownHover', function(){ designer.edit.changeSpecFactor(-0.01); self.getElement('specular').updateContent(''+Math.floor(designer.edit.specularFactor * 100) / 100+''); },
			function(){ designer.edit.changeSpecFactor(-0.01); self.getElement('specular').updateContent(''+Math.floor(designer.edit.specularFactor * 100) / 100+''); }));
		this.addText(new Text_Area('specular_Title', function(){return setX - 161;}, function(){return setY8 - 8;}, function(){return 100;}, 24, 'Arial', '24px', 1, 255, 255, 255, 1, 
			'Specular:'));
		this.addText(new Text_Area('specular', function(){return setX;}, function(){return setY8;}, function(){return 100;}, 15, 'Arial', '15px', 1, 255, 255, 255, 1, 
			'0'));
//End Specular Factor
//Shader
		setY9 = 340;
		this.addButton(new Image_Button('shaderbutton', function(){return setX + 100;}, function(){return setY9 + 7;}, function(){return 20;}, function(){return 20;}, 
			'volumeUp', 'volumeUpHover', function(){ designer.edit.changeShader(); self.getElement('shader').updateContent(''+self.edit.getShaderName()+''); }, 
			function(){ designer.edit.changeShader(); self.getElement('shader').updateContent(''+self.edit.getShaderName()+''); }));
		this.addText(new Text_Area('shader_Title', function(){return setX - 140;}, function(){return setY9 - 8;}, function(){return 100;}, 24, 'Arial', '24px', 1, 255, 255, 255, 1, 
			'Shader:'));
		this.addText(new Text_Area('shader', function(){return setX;}, function(){return setY9;}, function(){return 100;}, 15, 'Arial', '15px', 1, 255, 255, 255, 1, 
			'0'));
//End Shader
//Interaction
		setY10 = 370;
		this.addButton(new Image_Button('interactablebutton', function(){return setX + 100;}, function(){return setY10 + 7;}, function(){return 20;}, function(){return 20;}, 
			'volumeUp', 'volumeUpHover', function(){ designer.edit.toggleLightInteraction(); self.getElement('interactable').updateContent(''+self.edit.interact+''); }, 
			function(){ designer.edit.toggleLightInteraction(); self.getElement('interactable').updateContent(''+self.edit.interact+''); }));
		this.addText(new Text_Area('interactable_Title', function(){return setX - 200;}, function(){return setY10 - 8;}, function(){return 100;}, 24, 'Arial', '24px', 1, 255, 255, 255, 1, 
			'Interactable:'));
		this.addText(new Text_Area('interactable', function(){return setX;}, function(){return setY10;}, function(){return 100;}, 15, 'Arial', '15px', 1, 255, 255, 255, 1, 
			'0'));
//End Interaction
	}));

//----------------------------------------------------------------//
//----------------------Event Area Menu---------------------------//
//----------------------------------------------------------------//
gm.addMenu('designer_event_area', new Gui_Menu(false/*Statless*/, -4096/*xOffset*/, -4096/*yOffset*/, function(){
		var self = this;
		this.addText(new Text_Area('finishedEditingCollisionText', function(){return system.width - 200;}, function(){return system.height - 110;}, function(){return 100;}, 18, 'Arial', '20px', 4, 255, 255, 255, 1, 
			"Finished   >"
		));
		this.addButton(new Color_Button('finishedEditingCollisionButton', function(){return system.width - 150;}, function(){return system.height - 100;}, function(){return 50;}, function(){return 150;}, 
		'rgb(50,50,50)', 'rgb(80,80,80)', function(){
			gm.closeMenu();
		}));
		this.addText(new Text_Area('displayName', function(){return 100;}, function(){return 80;}, function(){return 300;}, 32, 'Arial', '32px', 1, 255, 255, 255, 1, 
			'Object Name'
		));
		this.addText(new Text_Area('onenter', function(){return 100;}, function(){return 130;}, function(){return 300;}, 32, 'Arial', '18px', 1, 255, 255, 255, 1, 
			'On Enter:'
		));
		this.addText(new Text_Area('onaction', function(){return 100;}, function(){return 160;}, function(){return 300;}, 32, 'Arial', '18px', 1, 255, 255, 255, 1, 
			'On Action:'
		));
		this.addText(new Text_Area('onexit', function(){return 100;}, function(){return 190;}, function(){return 300;}, 32, 'Arial', '18px', 1, 255, 255, 255, 1, 
			'On Exit:'
		));

//X Coordinate
		setX = system.width - 200; setY = 100;
		this.addButton(new Image_Button('xup', function(){return setX + 100;}, function(){return setY + 7;}, function(){return 20;}, function(){return 20;}, 
			'volumeUp', 'volumeUpHover', function(){ designer.edit.x += 1; self.getElement('posX').updateContent(''+designer.edit.x+''); }, 
			function(){ designer.edit.x += 1; self.getElement('posX').updateContent(''+designer.edit.x+''); }));
		this.addButton(new Image_Button('xdown', function(){return setX - 35;}, function(){return setY + 7;}, function(){return 20;}, function(){return 20;}, 
			'volumeDown', 'volumeDownHover', function(){ designer.edit.x -= 1; self.getElement('posX').updateContent(''+designer.edit.x+''); },
			function(){ designer.edit.x -= 1; self.getElement('posX').updateContent(''+designer.edit.x+''); }));
		this.addText(new Text_Area('posX_Title', function(){return setX - 85;}, function(){return setY - 8;}, function(){return 100;}, 24, 'Arial', '24px', 1, 255, 255, 255, 1, 
			'X:'));
		this.addText(new Text_Area('posX', function(){return setX;}, function(){return setY;}, function(){return 100;}, 15, 'Arial', '15px', 1, 255, 255, 255, 1, 
			'0'));
//End X Coordinate
//Y Coordinate
		setY2 = 130;
		this.addButton(new Image_Button('yup', function(){return setX + 100;}, function(){return setY2 + 7;}, function(){return 20;}, function(){return 20;}, 
			'volumeUp', 'volumeUpHover', function(){ designer.edit.y += 1; self.getElement('posY').updateContent(''+designer.edit.y+''); }, 
			function(){ designer.edit.y += 1; self.getElement('posY').updateContent(''+designer.edit.y+''); }));
		this.addButton(new Image_Button('ydown', function(){return setX - 35;}, function(){return setY2 + 7;}, function(){return 20;}, function(){return 20;}, 
			'volumeDown', 'volumeDownHover', function(){ designer.edit.y -= 1; self.getElement('posY').updateContent(''+designer.edit.y+''); },
			function(){ designer.edit.y -= 1; self.getElement('posY').updateContent(''+designer.edit.y+''); }));
		this.addText(new Text_Area('posY_Title', function(){return setX - 85;}, function(){return setY2 - 8;}, function(){return 100;}, 24, 'Arial', '24px', 1, 255, 255, 255, 1, 
			'Y:'));
		this.addText(new Text_Area('posY', function(){return setX;}, function(){return setY2;}, function(){return 100;}, 15, 'Arial', '15px', 1, 255, 255, 255, 1, 
			'0'));
//End Y Coordinate
//Height
		setY3 = 160;
		this.addButton(new Image_Button('hup', function(){return setX + 100;}, function(){return setY3 + 7;}, function(){return 20;}, function(){return 20;}, 
			'volumeUp', 'volumeUpHover', function(){ designer.edit.height += 1; self.getElement('height').updateContent(''+designer.edit.height+''); }, 
			function(){ designer.edit.height += 1; self.getElement('height').updateContent(''+designer.edit.height+''); }));
		this.addButton(new Image_Button('hdown', function(){return setX - 35;}, function(){return setY3 + 7;}, function(){return 20;}, function(){return 20;}, 
			'volumeDown', 'volumeDownHover', function(){ designer.edit.height -= 1; self.getElement('height').updateContent(''+designer.edit.height+''); },
			function(){ designer.edit.height -= 1; self.getElement('height').updateContent(''+designer.edit.height+''); }));
		this.addText(new Text_Area('H_Title', function(){return setX - 85;}, function(){return setY3 - 8;}, function(){return 100;}, 24, 'Arial', '24px', 1, 255, 255, 255, 1, 
			'H:'));
		this.addText(new Text_Area('height', function(){return setX;}, function(){return setY3;}, function(){return 100;}, 15, 'Arial', '15px', 1, 255, 255, 255, 1, 
			'0'));
//End Height
//Width
		setY4 = 190;
		this.addButton(new Image_Button('wup', function(){return setX + 100;}, function(){return setY4 + 7;}, function(){return 20;}, function(){return 20;}, 
			'volumeUp', 'volumeUpHover', function(){ designer.edit.width += 1; self.getElement('width').updateContent(''+designer.edit.width+''); }, 
			function(){ designer.edit.width += 1; self.getElement('width').updateContent(''+designer.edit.width+''); }));
		this.addButton(new Image_Button('wdown', function(){return setX - 35;}, function(){return setY4 + 7;}, function(){return 20;}, function(){return 20;}, 
			'volumeDown', 'volumeDownHover', function(){ designer.edit.width -= 1; self.getElement('width').updateContent(''+designer.edit.width+''); },
			function(){ designer.edit.width -= 1; self.getElement('width').updateContent(''+designer.edit.width+''); }));
		this.addText(new Text_Area('W_Title', function(){return setX - 85;}, function(){return setY4 - 8;}, function(){return 100;}, 24, 'Arial', '24px', 1, 255, 255, 255, 1, 
			'W:'));
		this.addText(new Text_Area('width', function(){return setX;}, function(){return setY4;}, function(){return 100;}, 15, 'Arial', '15px', 1, 255, 255, 255, 1, 
			'0'));
//End Width
//Active
		setY5 = 220;
		this.addButton(new Image_Button('activebutton', function(){return setX + 100;}, function(){return setY5 + 7;}, function(){return 20;}, function(){return 20;}, 
			'volumeUp', 'volumeUpHover', function(){ designer.edit.toggleActive(); self.getElement('active').updateContent(''+self.edit.active+''); }, 
			function(){ designer.edit.toggleActive(); self.getElement('active').updateContent(''+self.edit.active+''); }));
		this.addText(new Text_Area('active_Title', function(){return setX - 130;}, function(){return setY5 - 8;}, function(){return 100;}, 24, 'Arial', '24px', 1, 255, 255, 255, 1, 
			'Active:'));
		this.addText(new Text_Area('active', function(){return setX;}, function(){return setY5;}, function(){return 100;}, 15, 'Arial', '15px', 1, 255, 255, 255, 1, 
			'0'));
//End Active
	}));

//----------------------------------------------------------------//
//----------------------Particle Emitter Menu---------------------//
//----------------------------------------------------------------//
gm.addMenu('designer_particle_emitter', new Gui_Menu(false/*Statless*/, -4096/*xOffset*/, -4096/*yOffset*/, function(){
		var self = this;
		this.addText(new Text_Area('finishedEditingCollisionText', function(){return system.width - 200;}, function(){return system.height - 110;}, function(){return 100;}, 18, 'Arial', '20px', 4, 255, 255, 255, 1, 
			"Finished   >"
		));
		this.addButton(new Color_Button('finishedEditingCollisionButton', function(){return system.width - 150;}, function(){return system.height - 100;}, function(){return 50;}, function(){return 150;}, 
		'rgb(50,50,50)', 'rgb(80,80,80)', function(){
			gm.closeMenu();
		}));
		this.addText(new Text_Area('displayName', function(){return 100;}, function(){return 80;}, function(){return 300;}, 32, 'Arial', '32px', 1, 255, 255, 255, 1, 
			'Object Name'
		));
		this.addButton(new Image_Button('changeEmitterUp', function(){return 70;}, function(){return 80;}, function(){return 20;}, function(){return 20;}, 
			'volumeUp', 'volumeUpHover', function(){ designer.edit.changeFX(1); self.getElement('displayName').updateContent(''+designer.edit.name+''); }, 
			function(){ designer.edit.changeFX(1); self.getElement('displayName').updateContent(''+designer.edit.name+''); }));
		this.addButton(new Image_Button('changeEmitterDown', function(){return 50;}, function(){return 80;}, function(){return 20;}, function(){return 20;}, 
			'volumeDown', 'volumeDownHover', function(){ designer.edit.changeFX(-1); self.getElement('displayName').updateContent(''+designer.edit.name+''); }, 
			function(){ designer.edit.changeFX(-1); self.getElement('displayName').updateContent(''+designer.edit.name+''); }));
		
		this.addText(new Text_Area('asset', function(){return 100;}, function(){return 125;}, function(){return 300;}, 32, 'Arial', '18px', 1, 255, 255, 255, 1, 
			'Asset: '
		));
//X Coordinate
		setX = system.width - 200; setY = 100;
		this.addButton(new Image_Button('xup', function(){return setX + 100;}, function(){return setY + 7;}, function(){return 20;}, function(){return 20;}, 
			'volumeUp', 'volumeUpHover', function(){ designer.edit.x += 1; self.getElement('posX').updateContent(''+designer.edit.x+''); }, 
			function(){ designer.edit.x += 1; self.getElement('posX').updateContent(''+designer.edit.x+''); }));
		this.addButton(new Image_Button('xdown', function(){return setX - 35;}, function(){return setY + 7;}, function(){return 20;}, function(){return 20;}, 
			'volumeDown', 'volumeDownHover', function(){ designer.edit.x -= 1; self.getElement('posX').updateContent(''+designer.edit.x+''); },
			function(){ designer.edit.x -= 1; self.getElement('posX').updateContent(''+designer.edit.x+''); }));
		this.addText(new Text_Area('posX_Title', function(){return setX - 85;}, function(){return setY - 8;}, function(){return 100;}, 24, 'Arial', '24px', 1, 255, 255, 255, 1, 
			'X:'));
		this.addText(new Text_Area('posX', function(){return setX;}, function(){return setY;}, function(){return 100;}, 15, 'Arial', '15px', 1, 255, 255, 255, 1, 
			'0'));
//End X Coordinate
//Y Coordinate
		setY2 = 130;
		this.addButton(new Image_Button('yup', function(){return setX + 100;}, function(){return setY2 + 7;}, function(){return 20;}, function(){return 20;}, 
			'volumeUp', 'volumeUpHover', function(){ designer.edit.y += 1; self.getElement('posY').updateContent(''+designer.edit.y+''); }, 
			function(){ designer.edit.y += 1; self.getElement('posY').updateContent(''+designer.edit.y+''); }));
		this.addButton(new Image_Button('ydown', function(){return setX - 35;}, function(){return setY2 + 7;}, function(){return 20;}, function(){return 20;}, 
			'volumeDown', 'volumeDownHover', function(){ designer.edit.y -= 1; self.getElement('posY').updateContent(''+designer.edit.y+''); },
			function(){ designer.edit.y -= 1; self.getElement('posY').updateContent(''+designer.edit.y+''); }));
		this.addText(new Text_Area('posY_Title', function(){return setX - 85;}, function(){return setY2 - 8;}, function(){return 100;}, 24, 'Arial', '24px', 1, 255, 255, 255, 1, 
			'Y:'));
		this.addText(new Text_Area('posY', function(){return setX;}, function(){return setY2;}, function(){return 100;}, 15, 'Arial', '15px', 1, 255, 255, 255, 1, 
			'0'));
//End Y Coordinate
//Emitter Starting Size
		setY3 = 160;
		this.addButton(new Image_Button('sizeup', function(){return setX + 100;}, function(){return setY3 + 7;}, function(){return 20;}, function(){return 20;}, 
			'volumeUp', 'volumeUpHover', function(){ designer.edit.size += 1; self.getElement('size').updateContent(''+designer.edit.size+''); }, 
			function(){ designer.edit.size += 1; self.getElement('size').updateContent(''+designer.edit.size+''); }));
		this.addButton(new Image_Button('sizedown', function(){return setX - 35;}, function(){return setY3 + 7;}, function(){return 20;}, function(){return 20;}, 
			'volumeDown', 'volumeDownHover', function(){ designer.edit.size -= 1; self.getElement('size').updateContent(''+designer.edit.size+''); },
			function(){ designer.edit.size -= 1; self.getElement('size').updateContent(''+designer.edit.size+''); }));
		this.addText(new Text_Area('size_Title', function(){return setX - 205;}, function(){return setY3 - 8;}, function(){return 100;}, 24, 'Arial', '24px', 1, 255, 255, 255, 1, 
			'Starting Size:'));
		this.addText(new Text_Area('size', function(){return setX;}, function(){return setY3;}, function(){return 100;}, 15, 'Arial', '15px', 1, 255, 255, 255, 1, 
			'0'));
//End Emitter Starting Size
//Active
		setY4 = 190;
		this.addButton(new Image_Button('abovelightsbutton', function(){return setX + 100;}, function(){return setY4 + 7;}, function(){return 20;}, function(){return 20;}, 
			'volumeUp', 'volumeUpHover', function(){ designer.edit.toggleAboveLights(); self.getElement('abovelights').updateContent(''+self.edit.al+''); }, 
			function(){ designer.edit.toggleAboveLights(); self.getElement('abovelights').updateContent(''+self.edit.al+''); }));
		this.addText(new Text_Area('abovelights_Title', function(){return setX - 205;}, function(){return setY4 - 8;}, function(){return 100;}, 24, 'Arial', '24px', 1, 255, 255, 255, 1, 
			'Above Lights:'));
		this.addText(new Text_Area('abovelights', function(){return setX;}, function(){return setY4;}, function(){return 100;}, 15, 'Arial', '15px', 1, 255, 255, 255, 1, 
			'0'));
//End Active
	}));
//----------------------------------------------------------------//
//----------------------Particle Emitter Menu---------------------//
//----------------------------------------------------------------//
gm.addMenu('designer_prop', new Gui_Menu(false/*Statless*/, -4096/*xOffset*/, -4096/*yOffset*/, function(){
		var self = this;
		this.addText(new Text_Area('finishedEditingCollisionText', function(){return system.width - 200;}, function(){return system.height - 110;}, function(){return 100;}, 18, 'Arial', '20px', 4, 255, 255, 255, 1, 
			"Finished   >"
		));
		this.addButton(new Color_Button('finishedEditingCollisionButton', function(){return system.width - 150;}, function(){return system.height - 100;}, function(){return 50;}, function(){return 150;}, 
		'rgb(50,50,50)', 'rgb(80,80,80)', function(){
			gm.closeMenu();
		}));
		this.addText(new Text_Area('displayName', function(){return 100;}, function(){return 80;}, function(){return 300;}, 32, 'Arial', '32px', 1, 255, 255, 255, 1, 
			'Object Name'
		));
		this.addText(new Text_Area('displayName', function(){return 100;}, function(){return 125;}, function(){return 600;}, 32, 'Arial', '18px', 1, 255, 255, 255, 1, 
			'Remember! Props require an animation object and an update function.'
		));
//X Coordinate
		setX = system.width - 200; setY = 100;
		this.addButton(new Image_Button('xup', function(){return setX + 100;}, function(){return setY + 7;}, function(){return 20;}, function(){return 20;}, 
			'volumeUp', 'volumeUpHover', function(){ designer.edit.x += 1; self.getElement('posX').updateContent(''+designer.edit.x+''); }, 
			function(){ designer.edit.x += 1; self.getElement('posX').updateContent(''+designer.edit.x+''); }));
		this.addButton(new Image_Button('xdown', function(){return setX - 35;}, function(){return setY + 7;}, function(){return 20;}, function(){return 20;}, 
			'volumeDown', 'volumeDownHover', function(){ designer.edit.x -= 1; self.getElement('posX').updateContent(''+designer.edit.x+''); },
			function(){ designer.edit.x -= 1; self.getElement('posX').updateContent(''+designer.edit.x+''); }));
		this.addText(new Text_Area('posX_Title', function(){return setX - 85;}, function(){return setY - 8;}, function(){return 100;}, 24, 'Arial', '24px', 1, 255, 255, 255, 1, 
			'X:'));
		this.addText(new Text_Area('posX', function(){return setX;}, function(){return setY;}, function(){return 100;}, 15, 'Arial', '15px', 1, 255, 255, 255, 1, 
			'0'));
//End X Coordinate
//Y Coordinate
		setY2 = 130;
		this.addButton(new Image_Button('yup', function(){return setX + 100;}, function(){return setY2 + 7;}, function(){return 20;}, function(){return 20;}, 
			'volumeUp', 'volumeUpHover', function(){ designer.edit.y += 1; self.getElement('posY').updateContent(''+designer.edit.y+''); }, 
			function(){ designer.edit.y += 1; self.getElement('posY').updateContent(''+designer.edit.y+''); }));
		this.addButton(new Image_Button('ydown', function(){return setX - 35;}, function(){return setY2 + 7;}, function(){return 20;}, function(){return 20;}, 
			'volumeDown', 'volumeDownHover', function(){ designer.edit.y -= 1; self.getElement('posY').updateContent(''+designer.edit.y+''); },
			function(){ designer.edit.y -= 1; self.getElement('posY').updateContent(''+designer.edit.y+''); }));
		this.addText(new Text_Area('posY_Title', function(){return setX - 85;}, function(){return setY2 - 8;}, function(){return 100;}, 24, 'Arial', '24px', 1, 255, 255, 255, 1, 
			'Y:'));
		this.addText(new Text_Area('posY', function(){return setX;}, function(){return setY2;}, function(){return 100;}, 15, 'Arial', '15px', 1, 255, 255, 255, 1, 
			'0'));
//End Y Coordinate
//Height
		setY3 = 160;
		this.addButton(new Image_Button('hup', function(){return setX + 100;}, function(){return setY3 + 7;}, function(){return 20;}, function(){return 20;}, 
			'volumeUp', 'volumeUpHover', function(){ designer.edit.height += 1; self.getElement('height').updateContent(''+designer.edit.height+''); }, 
			function(){ designer.edit.height += 1; self.getElement('height').updateContent(''+designer.edit.height+''); }));
		this.addButton(new Image_Button('hdown', function(){return setX - 35;}, function(){return setY3 + 7;}, function(){return 20;}, function(){return 20;}, 
			'volumeDown', 'volumeDownHover', function(){ designer.edit.height -= 1; self.getElement('height').updateContent(''+designer.edit.height+''); },
			function(){ designer.edit.height -= 1; self.getElement('height').updateContent(''+designer.edit.height+''); }));
		this.addText(new Text_Area('H_Title', function(){return setX - 85;}, function(){return setY3 - 8;}, function(){return 100;}, 24, 'Arial', '24px', 1, 255, 255, 255, 1, 
			'H:'));
		this.addText(new Text_Area('height', function(){return setX;}, function(){return setY3;}, function(){return 100;}, 15, 'Arial', '15px', 1, 255, 255, 255, 1, 
			'0'));
//End Height
//Width
		setY4 = 190;
		this.addButton(new Image_Button('wup', function(){return setX + 100;}, function(){return setY4 + 7;}, function(){return 20;}, function(){return 20;}, 
			'volumeUp', 'volumeUpHover', function(){ designer.edit.width += 1; self.getElement('width').updateContent(''+designer.edit.width+''); }, 
			function(){ designer.edit.width += 1; self.getElement('width').updateContent(''+designer.edit.width+''); }));
		this.addButton(new Image_Button('wdown', function(){return setX - 35;}, function(){return setY4 + 7;}, function(){return 20;}, function(){return 20;}, 
			'volumeDown', 'volumeDownHover', function(){ designer.edit.width -= 1; self.getElement('width').updateContent(''+designer.edit.width+''); },
			function(){ designer.edit.width -= 1; self.getElement('width').updateContent(''+designer.edit.width+''); }));
		this.addText(new Text_Area('W_Title', function(){return setX - 85;}, function(){return setY4 - 8;}, function(){return 100;}, 24, 'Arial', '24px', 1, 255, 255, 255, 1, 
			'W:'));
		this.addText(new Text_Area('width', function(){return setX;}, function(){return setY4;}, function(){return 100;}, 15, 'Arial', '15px', 1, 255, 255, 255, 1, 
			'0'));
//End Width
//Foreground
		setY5 = 220;
		this.addButton(new Image_Button('foregrounddown', function(){return setX - 35;}, function(){return setY5 + 7;}, function(){return 20;}, function(){return 20;}, 
			'volumeDown', 'volumeDownHover', function(){ designer.edit.foreground = (designer.edit.foreground) ? false : true; self.getElement('foreground').updateContent(''+designer.edit.foreground+''); },
			function(){ designer.edit.foreground -= 1; self.getElement('foreground').updateContent(''+designer.edit.foreground+''); }));
		this.addText(new Text_Area('Foreground_Title', function(){return setX - 188;}, function(){return setY5 - 8;}, function(){return 100;}, 24, 'Arial', '24px', 1, 255, 255, 255, 1, 
			'Foreground:'));
		this.addText(new Text_Area('foreground', function(){return setX;}, function(){return setY5;}, function(){return 100;}, 15, 'Arial', '15px', 1, 255, 255, 255, 1, 
			'false'));
//End Foreground
	}));
}