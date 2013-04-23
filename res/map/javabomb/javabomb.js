function map_javabomb()
{
	var self = this;
	self.name = 'javabomb';
	self.height = 1;
	self.width = 2;
	self.tileSize = 1024;

	this.loadMapBGM = function(theMap)
	{
		theMap.bgm["erubescent"] = true;
		theMap.bgm["tenebrous"] = true;
		theMap.bgm["virescent"] = true;
	}

	this.loadParticleEmitters = function(theMap)
	{
		fx.addFXEmitter('explosion1', 500, 150, -1/*emitter*/, 50, true, 'rgb(255,0,0)', 'explosion-emitter');
	}

	this.loadPhysics = function(theMap)
	{
		physics.addEntity(world.player);
		var i = world.entity.length;
		while(i--){
			if(world.entity[i].applyPhysics){
				physics.addEntity(world.entity[i]);
			}
		}
		physics.addCollisionArea('col1', 450, 290, 15, 900);
		physics.addCollisionArea('col2', 867, 302, 10, 100);
		physics.addCollisionArea('col3', 887, 312, 10, 100);
		physics.addCollisionArea('col4', 907, 327, 10, 100);
		physics.addCollisionArea('col5', 927, 340, 10, 100);
		physics.addCollisionArea('col6', 947, 353, 10, 100);
		physics.addCollisionArea('col7', 967, 366, 10, 100);
		physics.addCollisionArea('col8', 0, 198, 200, 15);
		physics.addCollisionArea('col9', 1450, 382, 15, 1050);
		physics.addCollisionArea('col10', 1970, 288, 200, 15);
		physics.addCollisionArea('col11', 1108, 130, 200, 25);
	}

	this.loadNPCs = function(theMap)
	{
		world.addEntity( new Entity_NPC('test1', 1425/*X*/, 150/*Y*/, 300/*speed*/, 0.25/*step size*/, 48/*W*/, 128/*H*/, false/*Foreground*/, 'base_idle'/*Script*/, 'base_secondary_update') );
	}

	this.loadNavis = function(theMap)
	{
		theMap.navi.addNode('start', 250, 219, 32, 32, 0);
		theMap.navi.addNode('node2', 500, 219, 32, 32, 1);
		theMap.navi.addNode('node3', 800, 219, 32, 32, 2);
		theMap.navi.addNode('node4', 1200, 300, 32, 32, 3);
		theMap.navi.addNode('node5', 1450, 350, 32, 32, 4);
	}

	this.loadLights = function(theMap)
	{
		system.log("Initializing World Lights...");
		theMap.lights.push(new Light('Light1', 1000/*x*/, 400/*Y*/, 0/*R*/, 0/*G*/, 0/*B*/, 90/*brightness*/, 300/*radius*/, 0/*shader*/, 0.0/*specFactor*/, true/*interraction*/));
		theMap.lights.push(new Light('Light2', 76/*x*/, 165/*Y*/, 150/*R*/, 10/*G*/, 0/*B*/, 50/*brightness*/, 250/*radius*/, 1/*shader*/, 0.5/*specFactor*/, true/*interraction*/));
		theMap.lights.push(new Light('Light3', 210/*x*/, 165/*Y*/, 150/*R*/, 150/*G*/, 10/*B*/, 50/*brightness*/, 250/*radius*/, 1/*shader*/, 0.5/*specFactor*/, true/*interraction*/));
		theMap.lights.push(new Light('Light4', 366/*x*/, 165/*Y*/, 10/*R*/, 150/*G*/, 150/*B*/, 50/*brightness*/, 250/*radius*/, 1/*shader*/, 0.5/*specFactor*/, true/*interraction*/));
		theMap.lights.push(new Light('Light5', 518/*x*/, 165/*Y*/, 150/*R*/, 10/*G*/, 150/*B*/, 50/*brightness*/, 250/*radius*/, 1/*shader*/, 0.5/*specFactor*/, true/*interraction*/));
		theMap.lights.push(new Light('Light6', 670/*x*/, 165/*Y*/, 10/*R*/, 150/*G*/, 150/*B*/, 50/*brightness*/, 250/*radius*/, 1/*shader*/, 0.5/*specFactor*/, true/*interraction*/));
		theMap.lights.push(new Light('Light7', 820/*x*/, 165/*Y*/, 10/*R*/, 150/*G*/, 10/*B*/, 50/*brightness*/, 250/*radius*/, 1/*shader*/, 0.5/*specFactor*/, true/*interraction*/));
		theMap.lights.push(new Light('Light8', 1220/*x*/, 335/*Y*/, 10/*R*/, 10/*G*/, 250/*B*/, 60/*brightness*/, 250/*radius*/, 1/*shader*/, 0.5/*specFactor*/, true/*interraction*/));
		theMap.lights.push(new Light('Light9', 1425/*x*/, 335/*Y*/, 10/*R*/, 10/*G*/, 250/*B*/, 60/*brightness*/, 250/*radius*/, 1/*shader*/, 0.5/*specFactor*/, true/*interraction*/));
		theMap.lights.push(new Light('Light10', 1627/*x*/, 335/*Y*/, 10/*R*/, 10/*G*/, 250/*B*/, 60/*brightness*/, 250/*radius*/, 1/*shader*/, 0.5/*specFactor*/, true/*interraction*/));
		theMap.lights.push(new Light('Light11', 1825/*x*/, 335/*Y*/, 10/*R*/, 10/*G*/, 250/*B*/, 60/*brightness*/, 250/*radius*/, 1/*shader*/, 0.5/*specFactor*/, true/*interraction*/));
	}

	this.loadProps = function(theMap)
	{
		PROPS.get('testprop1')(500, 180);
	}

	this.loadEvents = function(theMap)
	{
		theMap.em.addEvent('endOfLevel', 1500, 340, 64, 100, true, 'endOfLevel1', 'null', 'null');
	}

	this.loadCheckpoints = function(theMap)
	{
		theMap.checkpoint.addCheckpoint('spot2', 700, 219, 32, 32, false);
		theMap.checkpoint.addCheckpoint('start', 400, 219, 32, 32, true);
	}

	this.loadBackgroundAndForegroundAssets = function(theMap)
	{
		for(var x = 0; x < self.width; x++)
		{
			theMap.background[x] = [];
			theMap.foreground[x] = [];
			for(var y = 0; y < self.height; y++)
			{
				theMap.background[x][y] = new Image();
				theMap.foreground[x][y] = new Image();
				theMap.background[x][y].src = ('res/map/' + self.name + '/image/' + x + '-' + y + 'bg.png');
				theMap.foreground[x][y].src = ('res/map/' + self.name + '/image/' + x + '-' + y + 'fg.png');
				theMap.background[x][y].addEventListener('load', theMap.loadedAsset, false);
				theMap.foreground[x][y].addEventListener('load', theMap.loadedAsset, false);
				theMap.numAssets += 2;
			}
		}
	}
}
MAP_STORE.add('javabomb', new map_javabomb());