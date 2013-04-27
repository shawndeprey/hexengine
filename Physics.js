function Physics()
{
	var self = this;
	self.collisionArea = [];
	self.entities = {};
	self.numOfEntities = 0;
	self.terminalVelocity = 600;
	self.mass = 5.972;//scalled earth mass
	self.gravitationalConstant = (self.mass * self.mass) / (3.18905 * 3.18905);
	self.gravitationalAcceleration = (self.mass * self.gravitationalConstant) * 100;

	this.addEntity = function(entity)
	{
		entity.velocity = 0;
		entity.stepSize;
		entity.lightInteraction = (entity.lightInteraction != undefined) ? entity.lightInteraction : false;
		entity.collideTop = entity.collideBottom = entity.collideLeft = entity.collideRight = false;
		entity.grounded = true;
		self.entities[self.numOfEntities] = entity;
		system.log("Adding physics entity with id: " + self.numOfEntities);
		entity.collision_id = self.numOfEntities;
		self.numOfEntities++;
	}

	this.addCollisionArea = function(NAME, X, Y, H, W)
	{
		self.collisionArea.push(new Collision_Area(NAME, X, Y, H, W));
	}

	this.removeCollisionArea = function(e)
	{
		h.popEntity(self.collisionArea, e);
	}

	this.calculateCollisions = function()
	{
		self.checkCollisions();
	}

	this.applyGravity = function()
	{
		for(var key in self.entities)
    {
			self.entities[key].velocity = (self.entities[key].velocity >= self.terminalVelocity) ? self.terminalVelocity : (self.entities[key].velocity + (self.gravitationalAcceleration * clock.delta));
			self.entities[key].y += self.entities[key].velocity * (clock.delta);
		}
	}

	this.resetEntityStates = function()
	{
		for(var key in self.entities)
		{
			self.entities[key].collideTop = self.entities[key].collideBottom = self.entities[key].collideLeft = self.entities[key].collideRight = false;
			self.entities[key].collideLeftPercent = self.entities[key].collideRightPercent = 0;
			self.entities[key].grounded = false;
		}
	}

	this.resetLightCollisionStates = function()
	{
		if(map.lights){
			j = map.lights.length;
			while(j--){ map.lights[j].setBaseValues(); }
		}
	}

	this.checkCollisions = function()
	{
		self.resetEntityStates();
		self.resetLightCollisionStates();

		for(var key in self.entities)
		{
			entityCheckLeft = (self.entities[key].x - (self.entities[key].width /  2));
			entityCheckRight = (self.entities[key].x + (self.entities[key].width /  2));
			entityCheckTop = (self.entities[key].y - (self.entities[key].height / 2));
			entityCheckBottom = (self.entities[key].y + (self.entities[key].height / 2));
			i = self.collisionArea.length;
			j = map.lights.length;
			while(i--)
			{
				collisionCheckRight = (self.collisionArea[i].x + (self.collisionArea[i].w / 2));
				collisionCheckLeft = (self.collisionArea[i].x - (self.collisionArea[i].w / 2));
				collisionCheckBottom = (self.collisionArea[i].y + (self.collisionArea[i].h / 2));
				collisionCheckTop = (self.collisionArea[i].y - (self.collisionArea[i].h / 2));
				if(entityCheckLeft<collisionCheckRight && entityCheckRight>collisionCheckLeft && entityCheckTop<collisionCheckBottom && entityCheckBottom>collisionCheckTop)
				{
					D_LEFT = Math.abs(entityCheckLeft - collisionCheckRight);
					D_RIGHT = Math.abs(entityCheckRight - collisionCheckLeft);
					D_TOP = Math.abs(entityCheckTop - collisionCheckBottom);
					D_BOTTOM = Math.abs(entityCheckBottom - collisionCheckTop);
					switch(Math.min(D_LEFT, D_RIGHT, D_TOP, D_BOTTOM))
					{
						case D_LEFT:{ //Collision with left of entity
							collideLeftPercent = Math.abs( (self.entities[key].y + (self.entities[key].height / 2)) - (self.collisionArea[i].y - (self.collisionArea[i].h / 2)) ) / self.entities[key].height;
							if(collideLeftPercent < self.entities[key].stepSize)
							{
								self.entities[key].y = (self.collisionArea[i].y - (self.collisionArea[i].h / 2)) - self.entities[key].height / 2;
							} else {
								self.entities[key].x = (self.collisionArea[i].x + (self.collisionArea[i].w / 2)) + self.entities[key].width / 2;
							}
							self.entities[key].collideLeft = true;
						break;}
						case D_RIGHT:{ //Collision with right of entity
							collideRightPercent = Math.abs( (self.entities[key].y + (self.entities[key].height / 2)) - (self.collisionArea[i].y - (self.collisionArea[i].h / 2)) ) / self.entities[key].height;
							if(collideRightPercent < self.entities[key].stepSize)
							{
								self.entities[key].y = (self.collisionArea[i].y - (self.collisionArea[i].h / 2)) - self.entities[key].height / 2;
							} else {
								self.entities[key].x = (self.collisionArea[i].x - (self.collisionArea[i].w / 2)) - self.entities[key].width / 2;
							}
							self.entities[key].collideRight = true;
						break;}
						case D_TOP:{ //Collision with top of entity
							self.entities[key].y = (self.collisionArea[i].y + (self.collisionArea[i].h / 2)) + self.entities[key].height / 2;
							self.entities[key].velocity = 0;
							self.entities[key].collideTop = true;
						break;}
						case D_BOTTOM:{ //Collision with bottom of entity
							self.entities[key].y = (self.collisionArea[i].y - (self.collisionArea[i].h / 2)) - self.entities[key].height / 2;
							self.entities[key].velocity = 0;
							self.entities[key].grounded = true;
							self.entities[key].collideBottom = true;
						break;}
					}
				}
			}
//Scripted Navigation Events
			if(self.entities[key].hasScriptedNavigation)
			{ collidedWithNaviNode = false;
				$.each(map.navi.node, function(){
					collisionCheckRight = (this.x + (this.width / 2));
					collisionCheckLeft = (this.x - (this.width / 2));
					collisionCheckBottom = (this.y + (this.height / 2));
					collisionCheckTop = (this.y - (this.height / 2));
					if(entityCheckLeft<collisionCheckRight && entityCheckRight>collisionCheckLeft && entityCheckTop<collisionCheckBottom && entityCheckBottom>collisionCheckTop)
					{
						collidedWithNaviNode = true;
						self.entities[key].collidingWithNaviNode(this.name);
					}
				});
				if(!collidedWithNaviNode){ self.entities[key].collidingWithNoNaviNodes(); }
			}
//Lighting Collisions
			if(system.lightEntityInteraction)
			{
				while(j--)
				{
					if(map.lights[j].interact)
					{
						collisionCheckRight = (map.lights[j].worldX + (map.lights[j].baseRadius / 12));
						collisionCheckLeft = (map.lights[j].worldX - (map.lights[j].baseRadius) / 12);
						collisionCheckBottom = (map.lights[j].worldY + (map.lights[j].baseRadius) / 12);
						collisionCheckTop = (map.lights[j].worldY - (map.lights[j].baseRadius) / 12);
						if(entityCheckLeft<collisionCheckRight && entityCheckRight>collisionCheckLeft && entityCheckTop<collisionCheckBottom && entityCheckBottom>collisionCheckTop)
						{
							x1 = ((map.lights[j].worldX) - (self.entities[key].x));
							y1 = ((map.lights[j].worldY) - (self.entities[key].y));
							coverage = 30 / Math.sqrt( (x1*x1) + (y1*y1) );
							coverage = (coverage > 1) ? 1 : coverage;
							map.lights[j].updateLightCoverage( coverage );
						}
					}
				}
			}
				
//Checkpoint Collisions
			if(self.entities[key].name == 'player') {
				$.each(map.checkpoint.checkpoint, function(){
					collisionCheckRight = (this.x + (this.width / 2));
					collisionCheckLeft = (this.x - (this.width / 2));
					collisionCheckBottom = (this.y + (this.height / 2));
					collisionCheckTop = (this.y - (this.height / 2));
					if(entityCheckLeft<collisionCheckRight && entityCheckRight>collisionCheckLeft && entityCheckTop<collisionCheckBottom && entityCheckBottom>collisionCheckTop)
					{
						map.checkpoint.onEnteredNode(this.name);
					}
				});
//Event Collisions
				$.each(map.em.events, function(){
					if(this.active)
					{
						collisionCheckRight = (this.x + (this.width / 2));
						collisionCheckLeft = (this.x - (this.width / 2));
						collisionCheckBottom = (this.y + (this.height / 2));
						collisionCheckTop = (this.y - (this.height / 2));
						if(entityCheckLeft<collisionCheckRight && entityCheckRight>collisionCheckLeft && entityCheckTop<collisionCheckBottom && entityCheckBottom>collisionCheckTop)
						{
							map.em.onEnteredNode(this.name);
						} else {
							map.em.onExitNode(this.name);
						}
					}
				});
			}
		}
	}

  this.update = function()
  { }

	this.draw = function()
	{
		canvas.globalAlpha = 0.3;
		canvas.fillStyle = "rgb(0,255,0)";
		var i = self.collisionArea.length;
		while(i--){ canvas.fillRect(h.X(self.collisionArea[i].x - self.collisionArea[i].w / 2), h.Y(self.collisionArea[i].y - self.collisionArea[i].h / 2), self.collisionArea[i].w, self.collisionArea[i].h); }
		
		for(var key in self.entities) {
    	if(self.entities[key].name == 'player'){
    		canvas.fillStyle = "rgb(255,0,255)";
    		canvas.fillRect(h.X(self.entities[key].x - self.entities[key].width / 2), h.Y(self.entities[key].y - self.entities[key].height / 2), self.entities[key].width, self.entities[key].height);
    	}
		}
		canvas.fillStyle = "rgb(0,0,255)";
		$.each(world.entity, function(){
			canvas.fillRect(h.X(this.x - this.width / 2), h.Y(this.y - this.height / 2), this.width, this.height);
		});

		map.checkpoint.drawCheckpoints();
		map.em.drawEventAreas();
		map.navi.drawNaviNode();

		canvas.fillStyle = "rgb(80,80,120)";
		var i = map.lights.length;
		while(i--){
			canvas.fillRect(h.X(map.lights[i].worldX - (map.lights[i].baseRadius / 8) / 2), h.Y(map.lights[i].worldY - (map.lights[i].baseRadius / 8) / 2), map.lights[i].baseRadius / 8, map.lights[i].baseRadius / 8);
		}

		canvas.fillStyle = "rgb(200,80,80)";
		var efx = fx.getEffects();
		var i = efx.length;
		while(i--){
			if(efx[i].isEmitter){
				canvas.fillRect(h.X(efx[i].x - 16), h.Y(efx[i].y - 16), 32, 32);
			}				
		}
		canvas.globalAlpha = 1;
	}
}

function Collision_Area(NAME, X, Y, H, W)
{
	var self = this;
	self.name = NAME;
	self.type = 'collision';
	self.x = X;
	self.y = Y;
	self.h = H;
	self.w = W;
}