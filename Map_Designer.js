function Map_Designer()
{
	var self = this;
	var select = false;
	self.edit = false;
	var X = 0;
	var Y = 0;
	var x = 0;
	var y = 0;
	var lightX = 0;
	var lightY = 0;

	this.checkEntities = function()
	{
		$.each(world.entity, function(){
			collisionCheckRight = (this.x + (this.width / 2));
			collisionCheckLeft = (this.x - (this.width / 2));
			collisionCheckBottom = (this.y + (this.height / 2));
			collisionCheckTop = (this.y - (this.height / 2));
			self.checkCollision(this, collisionCheckRight, collisionCheckLeft, collisionCheckBottom, collisionCheckTop);
		});
	}

	this.checkNaviNodes = function()
	{
		$.each(map.navi.node, function(){
			collisionCheckRight = (this.x + (this.width / 2));
			collisionCheckLeft = (this.x - (this.width / 2));
			collisionCheckBottom = (this.y + (this.height / 2));
			collisionCheckTop = (this.y - (this.height / 2));
			self.checkCollision(this, collisionCheckRight, collisionCheckLeft, collisionCheckBottom, collisionCheckTop);
		});		
	}

	this.checkEvents = function()
	{
		$.each(map.em.events, function(){
			collisionCheckRight = (this.x + (this.width / 2));
			collisionCheckLeft = (this.x - (this.width / 2));
			collisionCheckBottom = (this.y + (this.height / 2));
			collisionCheckTop = (this.y - (this.height / 2));
			self.checkCollision(this, collisionCheckRight, collisionCheckLeft, collisionCheckBottom, collisionCheckTop);
		});
	}

	this.checkCheckpoints = function()
	{
		$.each(map.checkpoint.checkpoint, function(){
			collisionCheckRight = (this.x + (this.width / 2));
			collisionCheckLeft = (this.x - (this.width / 2));
			collisionCheckBottom = (this.y + (this.height / 2));
			collisionCheckTop = (this.y - (this.height / 2));
			self.checkCollision(this, collisionCheckRight, collisionCheckLeft, collisionCheckBottom, collisionCheckTop);
		});
	}

	this.checkEmitters = function()
	{
		var efx = fx.getEffects();
		var i = efx.length;
		while(i--){
			if(efx[i].isEmitter){
				collisionCheckRight = (efx[i].x + 16);
				collisionCheckLeft = (efx[i].x - 16);
				collisionCheckBottom = (efx[i].y + 16);
				collisionCheckTop = (efx[i].y - 16);
				self.checkCollision(efx[i], collisionCheckRight, collisionCheckLeft, collisionCheckBottom, collisionCheckTop);
			}				
		}
	}

	this.checkLights = function()
	{
		var i = map.lights.length;
		while(i--){
			collisionCheckRight = (map.lights[i].worldX + (map.lights[i].baseRadius / 8));
			collisionCheckLeft = (map.lights[i].worldX - (map.lights[i].baseRadius) / 8);
			collisionCheckBottom = (map.lights[i].worldY + (map.lights[i].baseRadius) / 8);
			collisionCheckTop = (map.lights[i].worldY - (map.lights[i].baseRadius) / 8);
			self.checkCollision(map.lights[i], collisionCheckRight, collisionCheckLeft, collisionCheckBottom, collisionCheckTop);
		}
	}

	this.checkCollisionAreas = function()
	{
		var i = physics.collisionArea.length;
		while(i--){
			collisionCheckRight = (physics.collisionArea[i].x + (physics.collisionArea[i].w / 2));
			collisionCheckLeft = (physics.collisionArea[i].x - (physics.collisionArea[i].w / 2));
			collisionCheckBottom = (physics.collisionArea[i].y + (physics.collisionArea[i].h / 2));
			collisionCheckTop = (physics.collisionArea[i].y - (physics.collisionArea[i].h / 2));
			self.checkCollision(physics.collisionArea[i], collisionCheckRight, collisionCheckLeft, collisionCheckBottom, collisionCheckTop);
		}
	}

	this.checkCollision = function(OBJ, col1, col2, col3, col4)
	{
		if(x < col1 && x > col2 && y < col3 && y > col4){
			if(input.mouseMiddle == 2){
				self.editObject(OBJ);
			} else
			if(input.dragStart && !select){
				select = OBJ;
				X = OBJ.x;
				Y = OBJ.y;
				if(OBJ.isLight){
					lightX = OBJ.worldX;
					lightY = OBJ.worldY;
				}
			}
		}
	}

	this.dragSelectedObject = function()
	{
		if(input.mouseLeft == 2){
			select = false;
		} else {
			if(select.isLight){
				select.x = Math.round(X + input.dragOffX / lighting.resolution);
				select.y = Math.round(Y + input.dragOffY / lighting.resolution);
				select.worldX = Math.round(lightX + input.dragOffX);
				select.worldY = Math.round(lightY + input.dragOffY);
			} else {
				select.x = X + input.dragOffX;
				select.y = Y + input.dragOffY;
			}
		}
	}

	this.editObject = function(OBJ)
	{
		if(OBJ.type)
		{
			switch(OBJ.type)
			{
				case'npc':{
					self.edit = OBJ;
					menu = gm.getMenu('designer_npc');
					menu.edit = self.edit;
					menu.getElement('displayName').updateContent(self.edit.name);
					menu.getElement('posX').updateContent(''+self.edit.x+'');
					menu.getElement('posY').updateContent(''+self.edit.y+'');
					menu.getElement('height').updateContent(''+self.edit.height+'');
					menu.getElement('width').updateContent(''+self.edit.width+'');
					menu.getElement('foreground').updateContent(''+self.edit.foreground+'');
					menu.getElement('speed').updateContent(''+self.edit.speed+'');
					menu.getElement('stepsize').updateContent(''+self.edit.stepSize+'');
					menu.getElement('startai').updateContent(''+self.edit.startAI+'');
					menu.getElement('secondaryai').updateContent(''+self.edit.secondAI+'');
					gm.goToMenu('designer_npc'); 
					break;
				}
				case'prop':{
					self.edit = OBJ;
					menu = gm.getMenu('designer_prop');
					menu.edit = self.edit;
					menu.getElement('displayName').updateContent(self.edit.name);
					menu.getElement('posX').updateContent(''+self.edit.x+'');
					menu.getElement('posY').updateContent(''+self.edit.y+'');
					menu.getElement('height').updateContent(''+self.edit.height+'');
					menu.getElement('width').updateContent(''+self.edit.width+'');
					menu.getElement('foreground').updateContent(''+self.edit.foreground+'');
					gm.goToMenu('designer_prop'); 
					break;
				}
				case'collision':{ 
					self.edit = OBJ;
					menu = gm.getMenu('designer_collision');
					menu.edit = self.edit;
					menu.getElement('displayName').updateContent(self.edit.name);
					menu.getElement('posX').updateContent(''+self.edit.x+'');
					menu.getElement('posY').updateContent(''+self.edit.y+'');
					menu.getElement('height').updateContent(''+self.edit.h+'');
					menu.getElement('width').updateContent(''+self.edit.w+'');
					gm.goToMenu('designer_collision'); 
					break;
				}
				case'checkpoint':{
					self.edit = OBJ;
					menu = gm.getMenu('designer_checkpoint');
					menu.edit = self.edit;
					menu.getElement('displayName').updateContent(self.edit.name);
					menu.getElement('posX').updateContent(''+self.edit.x+'');
					menu.getElement('posY').updateContent(''+self.edit.y+'');
					menu.getElement('height').updateContent(''+self.edit.height+'');
					menu.getElement('width').updateContent(''+self.edit.width+'');
					menu.getElement('active').updateContent(''+self.edit.active+'');
					gm.goToMenu('designer_checkpoint'); 
					break;
				}
				case'light':{
					self.edit = OBJ;
					menu = gm.getMenu('designer_light');
					menu.edit = self.edit;
					menu.getElement('displayName').updateContent(self.edit.name);
					menu.getElement('posX').updateContent(''+self.edit.x+'');
					menu.getElement('posY').updateContent(''+self.edit.y+'');
					menu.getElement('red').updateContent(''+self.edit.r+'');
					menu.getElement('green').updateContent(''+self.edit.g+'');
					menu.getElement('blue').updateContent(''+self.edit.b+'');
					menu.getElement('radius').updateContent(''+self.edit.radius+'');
					menu.getElement('brightness').updateContent(''+self.edit.brightness+'');
					menu.getElement('specular').updateContent(''+Math.floor(self.edit.specularFactor * 100) / 100+'');
					menu.getElement('shader').updateContent(''+self.edit.getShaderName()+'');
					menu.getElement('interactable').updateContent(''+self.edit.interact+'');
					gm.goToMenu('designer_light');
					break;
				}
				case'emitter':{
					self.edit = OBJ;
					menu = gm.getMenu('designer_particle_emitter');
					menu.edit = self.edit;
					menu.getElement('displayName').updateContent(self.edit.name);
					menu.getElement('asset').updateContent('Asset: '+self.edit.asset_or_color);
					menu.getElement('posX').updateContent(''+self.edit.x+'');
					menu.getElement('posY').updateContent(''+self.edit.y+'');
					menu.getElement('size').updateContent(''+self.edit.size+'');
					menu.getElement('abovelights').updateContent(''+self.edit.al+'');
					gm.goToMenu('designer_particle_emitter');
					break;
				}
				case'event':{
					self.edit = OBJ;
					menu = gm.getMenu('designer_event_area');
					menu.edit = self.edit;
					menu.getElement('displayName').updateContent(self.edit.name);
					menu.getElement('onenter').updateContent('On Enter: '+self.edit.onEnterBase);
					menu.getElement('onaction').updateContent('On Action: '+self.edit.onActionBase);
					menu.getElement('onexit').updateContent('On Exit: '+self.edit.onExitBase);
					menu.getElement('posX').updateContent(''+self.edit.x+'');
					menu.getElement('posY').updateContent(''+self.edit.y+'');
					menu.getElement('height').updateContent(''+self.edit.height+'');
					menu.getElement('width').updateContent(''+self.edit.width+'');
					menu.getElement('active').updateContent(''+self.edit.active+'');
					gm.goToMenu('designer_event_area');
					break;
				}
				case'navi':{
					self.edit = OBJ;
					menu = gm.getMenu('designer_navinode');
					menu.edit = self.edit;
					menu.getElement('displayName').updateContent(self.edit.name);
					menu.getElement('posX').updateContent(''+self.edit.x+'');
					menu.getElement('posY').updateContent(''+self.edit.y+'');
					menu.getElement('height').updateContent(''+self.edit.height+'');
					menu.getElement('width').updateContent(''+self.edit.height+'');
					menu.getElement('navi').updateContent(''+self.edit.num+'');
					gm.goToMenu('designer_navinode'); 
					break;
				}
			}
		} else {
			//Create new object menu
		}
	}

	this.checkAddObject = function()
	{
		var type = (input.key['1'] == 1) ? 'npc' : null;
		var type = (input.key['2'] == 1) ? 'prop' : type;
		var type = (input.key['3'] == 1) ? 'collision' : type;
		var type = (input.key['4'] == 1) ? 'checkpoint' : type;
		var type = (input.key['5'] == 1) ? 'light' : type;
		var type = (input.key['6'] == 1) ? 'emitter' : type;
		var type = (input.key['7'] == 1) ? 'event' : type;
		var type = (input.key['8'] == 1) ? 'navi' : type;
		if(type != null && input.mouseLeft == 2){
			switch(type)
			{
				case'npc':{
					world.addEntity( new Entity_NPC('test1', input.screenX/*X*/, input.screenY/*Y*/, 300/*speed*/, 0.25/*step size*/, 48/*W*/, 128/*H*/, false/*Foreground*/, 'base_idle'/*Script*/, 'base_secondary_update') );
					physics.addEntity(world.entity[world.entity.length - 1]);
					break;
				}
				case'prop':{
					PROPS.get('testprop1')(input.screenX, input.screenY);
					break;
				}
				case'collision':{ 
					physics.addCollisionArea('col'+physics.collisionArea.length, input.screenX, input.screenY, 25, 25);
					break;
				}
				case'checkpoint':{
					map.checkpoint.addCheckpoint('checkpoint'+(map.checkpoint.checkpointCount()+1), input.screenX, input.screenY, 32, 32, false);
					break;
				}
				case'light':{
					r = Math.floor(Math.random()*255);
					g = Math.floor(Math.random()*255);
					b = Math.floor(Math.random()*255);
					brightness = Math.floor(Math.random()*30) + 55;
					radius = Math.floor(Math.random()*150) + 105;
					map.lights.push(new Light('Light'+map.lights.length, input.screenX, input.screenY, r, g, b, brightness, radius, 1/*shader*/, 0.5/*specFactor*/, true/*interraction*/));
					break;
				}
				case'emitter':{
					fx.addFXEmitter('explosion1', input.screenX, input.screenY, -1/*emitter*/, 50, true, 'rgb(255,0,0)', 'explosion-emitter');
					break;
				}
				case'event':{
					map.em.addEvent('eventArea'+(map.em.eventCount()+1), input.screenX, input.screenY, 64, 64, true, 'null', 'null', 'null');
					break;
				}
				case'navi':{
					node_num = map.navi.naviCount() + 1
					map.navi.addNode('node'+node_num, input.screenX, input.screenY, 32, 32, node_num);
					break;
				}
				default:{ system.log('Error: Invalid object type: ' + type); }
			}
			return true;
		} else {
			return false;
		}
	}

	this.checkCopySelectedObject = function()
	{
		if(select != false && input.key["c"] == 2){
			switch(select.type)
			{
				case'npc':{
					world.addEntity( new Entity_NPC(select.name, input.screenX, input.screenY, select.speed, select.stepSize, select.width, select.height, select.foreground, select.startAI, select.secondAI) );
					physics.addEntity(world.entity[world.entity.length - 1]);
					break;
				}
				case'prop':{
					PROPS.get(select.basePropObject)(input.screenX, input.screenY);
					break;
				}
				case'collision':{
					physics.addCollisionArea('col'+physics.collisionArea.length, input.screenX, input.screenY, select.h, select.w);
					break;
				}
				case'checkpoint':{
					map.checkpoint.addCheckpoint('checkpoint'+(map.checkpoint.checkpointCount()+1), input.screenX, input.screenY, select.height, select.width, false);
					break;
				}
				case'light':{
					map.lights.push(new Light('Light'+map.lights.length, input.screenX, input.screenY, select.r, select.g, select.b, 
						select.brightness, select.baseRadius, select.shader, select.specularFactor, select.interact));
					break;
				}
				case'emitter':{
					fx.addFXEmitter(select.name, input.screenX, input.screenY, select.life, select.size, select.al, 
						select.asset_or_color, select.baseEmitterFuncName);
					break;
				}
				case'event':{
					map.em.addEvent('eventArea'+(map.em.eventCount()+1), input.screenX, input.screenY, select.height, select.width, 
						select.active, select.onEnterBase, select.onActionBase, select.onExitBase);
					break;
				}
				case'navi':{
					node_num = map.navi.naviCount() + 1
					map.navi.addNode('node'+node_num, input.screenX, input.screenY, select.height, select.width, node_num);
					break;
				}
				default:{ system.log('Error: Invalid object type: ' + type); }
			}
			return true;
		} else {
			return false;
		}
	}

	this.deleteSelectedObject = function()
	{
		if(select != false && input.key["x"] == 2){
			switch(select.type)
			{
				case'npc':{
					world.removeEntity(select);
					break;
				}
				case'prop':{
					world.removeEntity(select);
					break;
				}
				case'collision':{
					physics.removeCollisionArea(select);
					break;
				}
				case'checkpoint':{
					map.checkpoint.popCheckpoint(select);
					break;
				}
				case'light':{
					h.popEntity(map.lights, select);
					break;
				}
				case'emitter':{
					fx.removeFXEmitter(select);
					break;
				}
				case'event':{
					map.em.removeEvent(select);
					break;
				}
				case'navi':{
					map.navi.removeNode(select);
					break;
				}
				default:{ system.log('Error: Invalid object type: ' + type); }
			}
			return true;
		} else {
			return false;
		}
	}

	this.checkSaveMap = function()
	{ //This function merely logs the rendered map file. JS can't write files like I need it to.
		//Eventually, integrate with this: http://www.html5rocks.com/en/tutorials/file/filesystem/
		if(select == false && input.key["escape"] == 2){
			var d = new Date();
			var mapSave = "\n\n\n//************************************************************************\n";
			mapSave += 		"//*** MAP START - Copy the below into your map file. *********************\n";
			mapSave += 		"//************************************************************************\n"
			mapSave += "\t\t//Map "+map.name+" Generated on "+d.getMonth()+"/"+d.getDate()+"/"+d.getFullYear()+"\n";
			$.each(map.bgm, function(k,v){
				mapSave += "\t\tmap.bgm['"+k+"'] = "+v+";\n"
			});
			$.each(fx.getEffects(), function(k,v){
				if(this.type == 'emitter'){
					mapSave += "\t\tfx.addFXEmitter('"+this.name+"', "+this.x+", "+this.y+", "+this.life+", "+this.size+", "+this.al
						+", '"+this.asset_or_color+"', '"+this.baseEmitterFuncName+"');\n"
				}
			});
			$.each(physics.collisionArea, function(k,v){
				mapSave += "\t\tphysics.addCollisionArea('"+this.name+"', "+this.x+", "+this.y+", "+this.h+", "+this.w+");\n"
			});
			$.each(world.entity, function(){
				switch(this.type){
					case 'npc':{
						mapSave += "\t\tworld.addEntity(new Entity_NPC('"+this.name+"', "+this.x+", "+this.y+", "+this.speed
							+", "+this.stepSize+", "+this.width+", "+this.height+", "+this.foreground+", '"+this.startAI+"', '"+this.secondAI+"'));\n"
						break;
					}
					case 'prop':{
						mapSave += "\t\tPROPS.get('"+this.basePropObject+"')("+this.x+", "+this.y+");\n";
						break;
					}
				}
			});
			$.each(map.navi.node, function(k,v){
				mapSave += "\t\tmap.navi.addNode('"+k+"', "+v.x+", "+v.y+", "+v.height+", "+v.width+", "+v.num+");\n";
			});
			$.each(map.lights, function(k,v){
				mapSave += "\t\tmap.lights.push(new Light('"+v.name+"', "+v.worldX+", "+v.worldY+", "+v.r+", "+v.g+", "+v.b
					+", "+v.brightness+", "+v.baseRadius+", "+v.shader+", "+v.baseSpecFactor+", "+v.interact+"));\n";
			});
			$.each(map.em.events, function(k,v){
				mapSave += "\t\tmap.em.addEvent('"+k+"', "+v.x+", "+v.y+", "+v.height+", "+v.width+", "+v.active
					+", '"+v.onEnterBase+"', '"+v.onActionBase+"', '"+v.onExitBase+"');\n";
			});
			$.each(map.checkpoint.checkpoint, function(k,v){
				mapSave += "\t\tmap.checkpoint.addCheckpoint('"+k+"', "+v.x+", "+v.y+", "+v.height+", "+v.width+", "+v.active+");\n";
			});
			mapSave += "//************************************************************************\n";
			mapSave += "//*** MAP END - Copy the above into your map file. ***********************\n";
			mapSave += "//************************************************************************";
			system.log(mapSave);
		}
	}

	this.update = function()
	{
		x = input.screenX;
		y = input.screenY;
		if(!self.checkAddObject()){
			if(!self.checkCopySelectedObject()){
				if(!self.deleteSelectedObject()){
					self.checkEntities();
					self.checkCollisionAreas();
					self.checkLights();
					self.checkEmitters();
					self.checkCheckpoints();
					self.checkEvents();
					self.checkNaviNodes();
					if(select != false){
						self.dragSelectedObject();
					}
				}
			}
		}
		self.checkSaveMap();
	}
}