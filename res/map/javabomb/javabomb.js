function map_javabomb()
{
	var self = this;
	self.name = 'javabomb';
	self.height = 1;
	self.width = 2;
	self.tileSize = 1024;

	this.initialize = function(map)
	{
		//Map javabomb Generated on 3/27/2013
		map.bgm['chords'] = true;
		fx.addFXEmitter('explosion1', 500, 150, -1, 50, true, 'muteOn', 'explosion-emitter');
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
		world.addEntity(new Entity_NPC('test1', 1425, 310.5, 300, 0.25, 48, 128, false, 'base_idle', 'base_secondary_update'));
		PROPS.get('testprop1')(500, 180);
		map.navi.addNode('start', 250, 219, 32, 32, 0);
		map.navi.addNode('node2', 500, 219, 32, 32, 1);
		map.navi.addNode('node3', 800, 219, 32, 32, 2);
		map.navi.addNode('node4', 1200, 300, 32, 32, 3);
		map.navi.addNode('node5', 1450, 350, 32, 32, 4);
		map.lights.push(new Light('Light1', 1000, 400, 0, 0, 0, 90, 300, 0, 0, true));
		map.lights.push(new Light('Light2', 76, 165, 150, 10, 0, 50, 250, 1, 0.5, true));
		map.lights.push(new Light('Light3', 210, 165, 150, 150, 10, 50, 250, 1, 0.5, true));
		map.lights.push(new Light('Light4', 366, 165, 10, 150, 150, 50, 250, 1, 0.5, true));
		map.lights.push(new Light('Light5', 518, 165, 150, 10, 150, 50, 250, 1, 0.5, true));
		map.lights.push(new Light('Light6', 670, 165, 10, 150, 150, 50, 250, 1, 0.5, true));
		map.lights.push(new Light('Light7', 820, 165, 10, 150, 10, 50, 250, 1, 0.5, true));
		map.lights.push(new Light('Light8', 1220, 335, 10, 10, 250, 60, 250, 1, 0.5, true));
		map.lights.push(new Light('Light9', 1425, 335, 10, 10, 250, 60, 250, 1, 0.5, true));
		map.lights.push(new Light('Light10', 1627, 335, 10, 10, 250, 60, 250, 1, 0.5, true));
		map.lights.push(new Light('Light11', 1825, 335, 10, 10, 250, 60, 250, 1, 0.5, true));
		map.em.addEvent('endOfLevel', 1500, 340, 64, 100, true, 'endOfLevel1', 'null', 'null');
		map.checkpoint.addCheckpoint('spot2', 700, 219, 32, 32, false);
		map.checkpoint.addCheckpoint('start', 400, 219, 32, 32, true);
	}
}
MAP_STORE.add('javabomb', new map_javabomb());