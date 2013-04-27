function Particle_Manager()
{
	system.log('Initializing Particle Manager...');
	var self = this;
	var effect = [];
	//Add Debug Information
	self.numFX = 0;
	self.numParts = 0;

	self.getEffects = function()
	{
		return effect;
	}

	self.addFX = function(EFFECT, X, Y, LIFE, SIZE, ABOVE_LIGHTS, ASSET_OR_COLOR)
	{
		effect.push(new Particle_FX(EFFECT, X, Y, LIFE, SIZE, ABOVE_LIGHTS, ASSET_OR_COLOR));
	}

	self.addFXEmitter = function(EFFECT, X, Y, LIFE, SIZE, ABOVE_LIGHTS, ASSET_OR_COLOR, EMITTER)
	{
		effect.push(new Particle_FX(EFFECT, X, Y, LIFE, SIZE, ABOVE_LIGHTS, ASSET_OR_COLOR, EMITTER));
	}

	self.removeFXEmitter = function(e)
	{
		h.popEntity(effect, e);
	}

	self.update = function()
	{
		self.numFX = self.numParts = 0;
		var i = self.numFX = effect.length;
		while(i--){
			self.numParts += effect[i].parts.length;
			if(effect[i].update()){
				h.popArray(effect, i);
			}
		}
	}

	self.drawBG = function()
	{
		var i = effect.length;
		while(i--){
			if(!effect[i].al){ effect[i].draw(); }
		}
	}

	self.drawFG = function()
	{
		var i = effect.length;
		while(i--){
			if(effect[i].al){ effect[i].draw(); }
		}
	}
}

function Particle_FX(EFFECT, X, Y, LIFE, SIZE, ABOVE_LIGHTS, ASSET_OR_COLOR, OPTIONAL_EMITTER_UPDATE_FUNCTION)
{
	var self = this;
	self.parts = [];
	self.name = EFFECT
	self.x = X;
	self.y = Y;
	self.xv = 0;
	self.yv = 0;
	self.life = LIFE;
	self.al = ABOVE_LIGHTS;
	self.size = SIZE;
	self.asset_or_color = ASSET_OR_COLOR;
	self.initFX = fxmanager.get(EFFECT);//this function should initialize self.parts
	self.initFX();

	self.isEmitter = (LIFE == -1) ? true : false;
	if(self.isEmitter){
		self.type = 'emitter';
	} else {
		self.type = 'fx';
	}
	self.baseEmitterFuncName = OPTIONAL_EMITTER_UPDATE_FUNCTION;
	self.emitter = (OPTIONAL_EMITTER_UPDATE_FUNCTION) ? fxmanager.get(OPTIONAL_EMITTER_UPDATE_FUNCTION) : function(){ system.log('FX not an emitter...'); };

	self.toggleAboveLights = function()
	{
		self.al = !self.al;
	}

	self.changeFX = function(direction)
	{
		fx_list = fxmanager.getFXList();
		var i = fx_list.indexOf(self.name);
		if(direction < 0) {
			i = i - 1 < 0 ? fx_list.length - 1 : i - 1;
		} else {
			i = i + 1 > fx_list.length - 1 ? 0 : i + 1;
		}
		self.name = fx_list[i];
		self.emitter = fxmanager.get(self.name);
	}

	self.update = function()
	{
		var j = self.parts.length
		while(j--){
			self.parts[j].update();
			if(self.isEmitter){
				if(!self.parts[j].isAlive()){
					h.popArray(self.parts, j);
				}
			}
		}
		if(!self.isEmitter){
			self.life -= clock.delta;
			return !(self.life > 0)
		} else {
			if(clock.delta != 0){
				self.emitter();
			}
			return false;
		}
	}

	self.draw = function()
	{
		var j = self.parts.length;
		while(j--){
			self.parts[j].draw();
		}
	}
}

function Particle(ASSET_OR_COLOR, X, Y, X_VEL, Y_VEL, HEIGHT, WIDTH, LIFE)
{
	var self = this;
	self.usingImage = ASSET_OR_COLOR.match(/rgb/i) ? false : true;
	self.asset = ASSET_OR_COLOR;
	self.x = X;
	self.y = Y;
	self.xv = X_VEL;
	self.yv = Y_VEL;
	self.h = HEIGHT;
	self.w = WIDTH;
	self.life = LIFE;

	self.isAlive = function()
	{
		return self.life > 0;
	}

	self.update = function()
	{
		self.x += self.xv * clock.delta;
		self.y += self.yv * clock.delta;
		self.life -= clock.delta;
	}

	self.draw = function()
	{
		canvas.globalAlpha = self.life * 0.5;
		if(self.usingImage){
			canvas.drawImage(asset.tex[self.asset], h.X(self.x - (self.w / 2)), h.Y(self.y - (self.h / 2)), self.w, self.h);
		} else {
			canvas.fillStyle = self.asset;
			canvas.fillRect(h.X(self.x - (self.w / 2)), h.Y(self.y - (self.h / 2)), self.w, self.h);
		}
		canvas.globalAlpha = 1;
	}
}