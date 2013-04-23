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
		system.log('Navi Nodes!!!');
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
				case'prop':{ break;}
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
				case'light':{ break;}
				case'emitter':{ break;}
				case'event':{ break;}
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

	this.addObject = function(type, OBJ)
	{
		switch(type)
		{
			case'npc':{ break;}
			case'prop':{ break;}
			case'collision':{ 
				id = physics.collisionArea.length;
				//What you were doing here is creating a way to add new objects. The id will be for the naming scheme. You will call this function from
				//any designer gui and pass in the type of object you want to create. OBJ is an optional argument which if it exists you will use that
				//as the new object instead of making one from scratch.
				break;
			}
			case'checkpoint':{ break;}
			case'light':{ break;}
			case'emitter':{ break;}
			case'event':{ break;}
			case'navi':{ break;}
			default:{ system.log('Error: Invalid object type: ' + type); }
		}
	}

	this.update = function()
	{
		x = input.screenX;
		y = input.screenY;
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