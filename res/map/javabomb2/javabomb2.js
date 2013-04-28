function map_javabomb2()
{
	var self = this;
	self.name = 'javabomb2';
	self.height = 1;
	self.width = 2;
	self.tileSize = 1024;

	this.initialize = function(map)
	{
		map.bgm["chords"] = true;
		fx.addFXEmitter('explosion1', 500, 150, -1/*emitter*/, 50, true, 'rgb(255,0,0)', 'explosion-emitter');
		fx.addFXEmitter('explosion1', 500, 150, -1/*emitter*/, 50, true, 'rgb(255,0,0)', 'explosion-emitter');
		physics.addCollisionArea('col1', 390, 290, 15, 900);
		physics.addCollisionArea('col2', 797, 302, 10, 100);
		physics.addCollisionArea('col3', 817, 312, 10, 100);
		physics.addCollisionArea('col4', 847, 327, 10, 100);
		physics.addCollisionArea('col5', 857, 340, 10, 100);
		physics.addCollisionArea('col6', 867, 353, 10, 100);
		physics.addCollisionArea('col7', 887, 366, 10, 100);
		physics.addCollisionArea('col8', 0, 198, 200, 15);
		physics.addCollisionArea('col9', 1450, 382, 15, 1050);
		physics.addCollisionArea('col10', 1970, 288, 200, 15);
		physics.addCollisionArea('col11', 1108, 130, 200, 25);
		world.addEntity( new Entity_NPC('test1', 1425/*X*/, 150/*Y*/, 300/*speed*/, 0.25/*step size*/, 48/*W*/, 128/*H*/, false/*Foreground*/, 'base_idle'/*Script*/, 'base_secondary_update') );
		map.navi.addNode('start', 250, 219, 32, 32, 0);
		map.navi.addNode('node2', 500, 219, 32, 32, 1);
		map.navi.addNode('node3', 800, 219, 32, 32, 2);
		map.navi.addNode('node4', 1200, 300, 32, 32, 3);
		map.navi.addNode('node5', 1450, 350, 32, 32, 4);
		map.lights.push(new Light('Light1', 1000/*x*/, 400/*Y*/, 0/*R*/, 0/*G*/, 0/*B*/, 90/*brightness*/, 300/*radius*/, 0/*shader*/, 0.0/*specFactor*/, true/*interraction*/));
		map.lights.push(new Light('Light3', 210/*x*/, 165/*Y*/, 150/*R*/, 150/*G*/, 10/*B*/, 50/*brightness*/, 250/*radius*/, 1/*shader*/, 0.5/*specFactor*/, true/*interraction*/));
		map.lights.push(new Light('Light5', 518/*x*/, 165/*Y*/, 150/*R*/, 10/*G*/, 150/*B*/, 50/*brightness*/, 250/*radius*/, 1/*shader*/, 0.5/*specFactor*/, true/*interraction*/));
		map.lights.push(new Light('Light7', 820/*x*/, 165/*Y*/, 10/*R*/, 150/*G*/, 10/*B*/, 50/*brightness*/, 250/*radius*/, 1/*shader*/, 0.5/*specFactor*/, true/*interraction*/));
		map.lights.push(new Light('Light8', 1220/*x*/, 335/*Y*/, 10/*R*/, 10/*G*/, 250/*B*/, 60/*brightness*/, 250/*radius*/, 1/*shader*/, 0.5/*specFactor*/, true/*interraction*/));
		map.lights.push(new Light('Light10', 1627/*x*/, 335/*Y*/, 10/*R*/, 10/*G*/, 250/*B*/, 60/*brightness*/, 250/*radius*/, 1/*shader*/, 0.5/*specFactor*/, true/*interraction*/));
		map.lights.push(new Light('Light11', 1825/*x*/, 335/*Y*/, 10/*R*/, 10/*G*/, 250/*B*/, 60/*brightness*/, 250/*radius*/, 1/*shader*/, 0.5/*specFactor*/, true/*interraction*/));
		PROPS.get('testprop1')(500, 180);
		map.em.addEvent('endOfLevel', 1500, 340, 64, 100, true, 'endOfLevel2', 'null', 'null');
		map.checkpoint.addCheckpoint('spot2', 700, 219, 32, 32, false);
		map.checkpoint.addCheckpoint('start', 400, 219, 32, 32, true);
	}
}
MAP_STORE.add('javabomb2', new map_javabomb2());