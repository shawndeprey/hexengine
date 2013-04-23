g.add('move', function(objName, x, y){
	switch(objName){
		case 'player':{
			world.player.setPosition(x, y);
			break;
		}
		default:{
			system.log('move: unknown object: ' + objName);
		}
	}
});

g.add('load', function(objName, propName){
	switch(objName){
		case 'map':{
			map.load(propName);
			world.addPlayer();
			camera.setPosition(world.player.x, world.player.y);
			break;
		}
		default:{
			system.log('load: unknown object: ' + objName);
		}
	}
});

g.add('resetworld', function(){
	world.reset();
	fx = new Particle_Manager();
	lighting = new Lighting();
	physics = new Physics();
});

g.add('changelevel', function(levelName){
	gm.goToMenu('blackOverlay');
	overlay = gm.getElement('blackOverlay', 'menuBG');
	overlay.A = 0;
	text = gm.getElement('blackOverlay', 'loadingText');
	text.A = 0;
	overlay.faded = true;
	ru.addRU(function(){
		if(overlay.faded){
			overlay.A = (overlay.A < 1) ? overlay.A + (clock.delta) : 1;
			text.A = overlay.A;
			text.updateColor();
			overlay.updateColor();
			if(overlay.A == 1){
				g.get('load')('map', levelName);
				overlay.faded = false;
				overlay.timer = 3;
			}
		} else {
			overlay.timer -= clock.delta;
			if(overlay.timer < 0){
				gm.guiMode = false;
				overlay.A = (overlay.A > 0) ? overlay.A - (clock.delta) : 0;
				overlay.updateColor();
				text.A = overlay.A;
				text.updateColor();
				if(overlay.A <= 0){
					gm.closeMenu();
					return true;
				}
			}
		}
	});
});