function Lighting()
{
  system.log("Constructing Lighting Engine...");
  var self = this;
  self.dark = 255;
  self.lightCanvas = document.createElement('canvas');
  self.overlay, self._overlay, self.W, self.H;
  self.resolution = (system.browser=='Chrome')?6:(system.browser=='Firefox')?12:16;
  self.resChange = false;
	self.lightsOnScreen = 0;
	
	this.resetPixelData = function()
	{
		var i = self.overlay.data.length;
		while(i--){ self.overlay.data[i] = self._overlay.data[i]; }
	}
	
  this.setPixel = function(imageData, x, y, r, g, b, a)
  {
		index = (x + y * imageData.width) * 4;
		imageData.data[index+0] = r;
		imageData.data[index+1] = g;
		imageData.data[index+2] = b;
		imageData.data[index+3] = a;
  }
	
	this.getPixel = function(imageData, x, y)
	{
		pixel = [];
		index = (x + y * imageData.width) * 4;
		pixel[0] = imageData.data[index+0];
		pixel[1] = imageData.data[index+1];
		pixel[2] = imageData.data[index+2];
		pixel[3] = imageData.data[index+3];
		return pixel;
	}
	
	this.blendPixel = function(r, g, b, a, R, G, B, A, D, radius, sf, shader)
	{
		pixel = [];
    specFactor = radius * sf;
		distFactor = D / specFactor;
		ALPHA = A / 255;
		alpha = a / 255;
    through = Math.abs(a - A) / A;
		colorBleed = through / (1 + (sf / (2 + (1 - sf))));//Much testing went into creating this.
		switch(shader)
		{
			case 0:{ //Standard World Light
				pixel[0] = (((r * alpha + R * ALPHA) / 2)) + (R * (through / 1.5));
				pixel[1] = (((g * alpha + G * ALPHA) / 2)) + (G * (through / 1.5));
				pixel[2] = (((b * alpha + B * ALPHA) / 2)) + (B * (through / 1.5));
				pixel[3] = A * through; break;
			}
			case 1:{ //Specular Lights
				pixel[0] = (((r * alpha + R * ALPHA) / 2)) / distFactor + (R * colorBleed);
				pixel[1] = (((g * alpha + G * ALPHA) / 2)) / distFactor + (G * colorBleed);
				pixel[2] = (((b * alpha + B * ALPHA) / 2)) / distFactor + (B * colorBleed);
				pixel[3] = A * through;break;
			}
			case 2:{ //Hidden Light Pixel Shader
				pixel[0] = (((r * alpha + R * ALPHA) / 2) + (R * colorBleed) - (A - pixel[3])) / distFactor;
				pixel[1] = (((g * alpha + G * ALPHA) / 2) + (G * colorBleed) - (A - pixel[3])) / distFactor;
				pixel[2] = (((b * alpha + B * ALPHA) / 2) + (B * colorBleed) - (A - pixel[3])) / distFactor;
				pixel[3] = A * through; break;
			}
			default: { //Standard World Light
				pixel[0] = (((r * alpha + R * ALPHA) / 2)) + (R * colorBleed);
				pixel[1] = (((g * alpha + G * ALPHA) / 2)) + (G * colorBleed);
				pixel[2] = (((b * alpha + B * ALPHA) / 2)) + (B * colorBleed);
				pixel[3] = A * through;
			}
		}
		return pixel;
	}
	
	this.drawLight = function(l)
	{
		X = h.lightX(l.x); Y = h.lightY(l.y);
		if(X - l.radius < self.W && X + l.radius > 0 && Y - l.radius < self.H && Y + l.radius > 0)
		{ self.lightsOnScreen++;
			for(var x = X - l.radius; x < X + l.radius; x++)
			{
				t1 = x - X;
				sqDiffX = t1 * t1;
				for(var y = Y - l.radius; y < Y + l.radius; y++)
				{
					t2 = y - Y;
					sqDiffY = t2 * t2;
					sqXY = sqDiffX + sqDiffY;
					if(sqXY < l.radiusSq)
					{
						if(x < self.W && x >= 0 && y < self.H && y >= 0)
						{
							distance = Math.sqrt(sqXY);
							old = self.getPixel(self.overlay, x, y);
							neu = self.blendPixel(l.r, l.g, l.b, (self.dark - l.a) - (l.APL * (distance)), old[0], old[1], old[2], old[3], distance, l.radius, l.specularFactor, l.shader);
							self.setPixel(self.overlay, x, y, neu[0], neu[1], neu[2], neu[3]);
						}
					}
				}
			}
		}
	}

  this.init = function()
  {
    self.W = (system.width / self.resolution) + 1; self.H = (system.height / self.resolution) + 1;
    self.lightCanvas.width = self.W; self.lightCanvas.height = self.H;
    self.buffer = self.lightCanvas.getContext('2d');
    self.buffer.fillStyle = "rgba(0, 0, 0, " + self.dark + ")";
    self.buffer.fillRect(0, 0, self.W, self.H);
    self.overlay = self.buffer.getImageData(0, 0, self.W, self.H);
		self._overlay = self.buffer.getImageData(0, 0, self.W, self.H);
  }
	
	this.resize = function()
	{
		self.init();
		var i = map.lights.length;
		while(i--){ map.lights[i].resize(); }
	}

	this.updateAndDraw = function()
  {
    self.update();
		self.draw();
  }

	this.update = function()
  {
		if(clock.e % 1 == 0){
			self.lightsOnScreen = 0;
			self.resetPixelData();
			var i = map.lights.length;
			while(i--){ self.drawLight( map.lights[i] ); }
		}
		if(self.resChange){ self.resize(); self.resChange = false; }
  }

  this.draw = function()
  {
		self.buffer.putImageData(self.overlay, 0, 0);
		canvas.drawImage(self.lightCanvas, self.bufferXOffset() - 1, self.bufferYOffset() - 1, system.width + self.resolution * 2, system.height + self.resolution * 2);
  }
	
	this.bufferXOffset = function()
	{
		offset = Math.abs( (h.lightX(1) * self.resolution) - h.X(1) );
		return (offset * -1) + 3;
	}
	
	this.bufferYOffset = function()
	{
		offset = Math.abs( (h.lightY(1) * self.resolution) - h.Y(1) );
		return (offset * -1) + 4.5;
	}
	self.init();
}

function Light(NAME, X, Y, R, G, B, Brightness, Radius, Shader, SpecularFactor, LightInterraction)
{// Light Brightness. 1 = darkest, 255 = brightest | shader = light style
 // Light Styles: 0 = normal, 1 = specular, 2 = hidden
	var self = this;
	self.isLight = true;
	self.name = NAME;
	self.type = 'light';
	self.worldX = X;
	self.worldY = Y;
	self.brightness = Brightness > lighting.dark ? lighting.dark : Brightness;
	self.brightness = self.brightness < 1 ? 1 : self.brightness;
	self.shader = Shader;
	self.x = Math.round(X / lighting.resolution);
	self.y = Math.round(Y / lighting.resolution);
	self.r = R;
	self.g = G;
	self.b = B;
	self.a = lighting.dark - self.brightness;
	self.specularFactor = SpecularFactor;
	self.radius = Math.round(Radius / lighting.resolution);
	self.radiusSq = self.radius * self.radius;
	self.APL = ((lighting.dark - self.a) / self.radius);//alpha per layer
	self.interact = LightInterraction;

	//Lighting Entity Interaction Properties
	self.baseBrightness = self.a;
	self.baseSpecFactor = self.specularFactor;
	self.baseRadius = Radius;
	self.baseAPL = self.APL;
	
	this.setX = function(X)
	{
		self.x = Math.round(X / lighting.resolution);
	}
	
	this.setY = function(Y)
	{
		self.y = Math.round(Y / lighting.resolution);
	}

	this.getShaderName = function()
	{
		switch(self.shader)
		{
			case 0:{
				return 'Normal';
				break;
			}
			case 1:{
				return 'Specular';
				break;
			}
			case 2:{
				return 'Hole';
				break;
			}
			default:{
				return 'Normal';
			}
		}
	}

	this.toggleLightInteraction = function()
	{
		self.interact = !self.interact;
	}

	this.changeShader = function()
	{
		self.shader = self.shader + 1 > 2 ? 0 : self.shader + 1;
	}

	this.changeSpecFactor = function(amount)
	{
		self.specularFactor += amount;
		self.baseSpecFactor = self.specularFactor;
	}

	this.setBrightness = function(new_b)
	{
		//I realized you can get some pretty baller effects with my lighting system when you don't limit the brightness.
		//self.brightness = new_b > lighting.dark ? lighting.dark : new_b;
		//self.brightness = new_b < 1 ? 1 : new_b;
		self.brightness = new_b;
		self.a = lighting.dark - self.brightness;
		self.APL = ((lighting.dark - self.a) / self.radius);//alpha per layer
		self.baseAPL = self.APL;
		self.baseBrightness = self.a;
	}

	this.setRadius = function(new_radius)
	{
		self.radius = new_radius
		self.radiusSq = self.radius * self.radius;
		self.APL = ((lighting.dark - self.a) / self.radius);
		self.baseAPL = self.APL;
	}
	
	this.resize = function()
	{
		self.setBaseValues();
		self.x = Math.floor(self.worldX / lighting.resolution);
		self.y = Math.floor(self.worldY / lighting.resolution);
		self.radius = Math.floor(self.baseRadius / lighting.resolution);
		self.radiusSq = self.radius * self.radius;
		self.APL = ((lighting.dark - self.a) / self.radius);//alpha per layer
		self.baseBrightness = self.a;
		self.baseSpecFactor = self.specularFactor;
		self.baseRadius = Radius;
		self.baseAPL = self.APL;
	}

	this.setBaseValues = function()
	{
		self.a = self.baseBrightness;
		self.specularFactor = self.baseSpecFactor;
		self.APL = self.baseAPL;
	}

	this.updateLightCoverage = function(percentCovered)
	{
		self.a = (self.baseBrightness + (10 * percentCovered));
		self.specularFactor = self.baseSpecFactor * (1 - percentCovered);
		self.APL = ((lighting.dark - self.a) / self.radius);
	}
}