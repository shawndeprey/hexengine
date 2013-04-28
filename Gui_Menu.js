function Gui_Manager()
{
	var self = this;
	self.menu = {};
	self.guiMode = false;

	this.addMenu = function(NAME, MENU)
	{
		if( !self.menu.hasOwnProperty(NAME) ) {
			self.menu[NAME] = MENU;
		} else { }
	}

	this.goToMenu = function(NAME)
	{
		if( self.menu.hasOwnProperty(NAME) ) {
			self.closeAllMenus();
			self.menu[NAME].resetOffsets();
			self.menu[NAME].active = true;
			self.guiMode = true;
		} else {
		}
	}

	this.closeMenu = function()
	{
		self.closeAllMenus();
		self.guiMode = false;
	}

	this.closeAllMenus = function()
	{
		input.iStream.close();
		$.each(self.menu, function(){
			if(!this.stateless){
				this.active = false;
			}
		});
	}

	this.getElement = function(NAME, ELEMENT)
	{
		if( self.menu.hasOwnProperty(NAME) ) {
			return self.menu[NAME].getElement(ELEMENT);
		} else { }
	}

	this.getMenu = function(NAME)
	{
		console.log(self.menu);
		if( self.menu.hasOwnProperty(NAME) ) {
			return self.menu[NAME];
		}
	}

	this.update = function()
	{
		$.each(self.menu, function(){
			if(this.active){
				this.update();
			}
		});
	}

	this.draw = function()
	{
		$.each(self.menu, function(){
			if(this.active){ this.draw(); }
		});
	}
}

function Gui_Menu(state, xOff, yOff, BUILD_MENU)
{
	var self = this;
	self.box = [];
	self.button = [];
	self.text = [];
	self.stateless = state;
	self.baseYOff = yOff;
	self.baseXOff = xOff;
	self.yOffset = yOff;
	self.xOffset = xOff;
	self.active = false;

	this.buildMenu = BUILD_MENU;

	this.refreshTextContent = function()
	{
		$.each(self.text, function(){
			this.renderContent();
		});
	}

	this.getElement = function(ELEMENT)
	{
		for(var i = 0; i < self.box.length; i++){ if(self.box[i].name == ELEMENT){ return self.box[i]; } }
		for(var i = 0; i < self.button.length; i++){ if(self.button[i].name == ELEMENT){ return self.button[i]; } }
		for(var i = 0; i < self.text.length; i++){ if(self.text[i].name == ELEMENT){ return self.text[i]; } }
	}

	this.addBox = function(box){ self.box.push(box); }
	this.addButton = function(button){ self.button.push(button); }
	this.addText = function(text){ self.text.push(text); }

	this.update = function()
	{
		if(self.yOffset != 0 || self.xOffset != 0){ self.updateMenuPosition(); }
		var i = self.button.length;
		while(i--) {
			if(input.x > (self.button[i].x() - self.button[i].w() / 2) + self.xOffset &&
				 input.x < (self.button[i].x() + self.button[i].w() / 2) + self.xOffset &&
				 input.y > (self.button[i].y() - self.button[i].h() / 2) + self.yOffset &&
				 input.y < (self.button[i].y() + self.button[i].h() / 2) + self.yOffset)
			{
				self.button[i].hover = true;
				if(input.mouseLeft == 2){self.button[i].clickEvent();}
				if(input.mouseLeft == 1){self.button[i].holdTimer += clock.delta; } else { self.button[i].holdTimer = 0; }
				if(self.button[i].holdEvent != false && (self.button[i].holdTimer >= self.button[i].holdThreshold)){ self.button[i].holdEvent(); }
			} else {
				self.button[i].hover = false;
			}
			self.button[i].update();
		}
	}

	this.updateMenuPosition = function()
	{
		self.yOffset -= (self.yOffset * 6) * clock.delta;
		self.xOffset -= (self.xOffset * 6) * clock.delta;
	}

	this.resetOffsets = function()
	{
		self.xOffset = self.baseXOff;
		self.yOffset = self.baseYOff;
	}

	this.draw = function()
	{
		for(var i = 0; i < self.box.length; i++){ self.box[i].draw(self.xOffset, self.yOffset); }
		for(var i = 0; i < self.button.length; i++){ self.button[i].draw(self.xOffset, self.yOffset); }
		for(var i = 0; i < self.text.length; i++){ self.text[i].draw(self.xOffset, self.yOffset); }
	}
	self.buildMenu();
}

function Text_Area(NAME, X, Y, WIDTH, LINE_HEIGHT, FONT, FONT_SIZE, LINES_PER_PAGE, R, G, B, A, CONTENT)
{
	var self = this;
	self.name = NAME;
	self.x = X;
	self.y = Y;
	self.w = WIDTH;
	self.lineHeight = LINE_HEIGHT;
	self.font = FONT;
	self.fontSize = FONT_SIZE;
	self.lpp = LINES_PER_PAGE;
	self.page = 0;
	self.baseFont = (FONT_SIZE + " " + FONT);
	self.R = R;
	self.G = G;
	self.B = B;
	self.A = A;
	self.color = 'rgba('+R+','+G+','+B+','+A+')';
	self.line = [];
	var content = CONTENT;
	var textwidth = $('div#textwidth');

	this.updateColor = function()
	{
		self.color = 'rgba('+self.R+','+self.G+','+self.B+','+self.A+')';
	}

	this.flipForward = function()
	{
		self.page = (self.page + 1 >= self.getPageAmount()) ? self.getPageAmount() : self.page + 1;
	}

	this.flipBackward = function()
	{
		self.page = (self.page - 1 <= 0) ? 0 : self.page - 1;
	}

	this.getPageAmount = function()
	{
		return Math.floor(self.line.length / self.lpp);
	}

	this.draw = function(X, Y)
	{
		var j = 0;
		for(var i = 0; i < self.line.length; i++)
		{
			if(i >= (self.page * self.lpp) && i < (self.page * self.lpp) + self.lpp)
			{
				gui.drawText({text:self.line[i], x:self.x() + X, y:self.y() + (j * self.lineHeight) + Y, font:self.baseFont, alignX:'left', alignY:'top', color:self.color});
				j++;
			}
		}
	}

	this.calculateStringWidth = function(text)
	{
		$(textwidth).css({'font-family':self.font, 'font-size':self.fontSize});
		$(textwidth).html(text);
	  return $(textwidth).width();
	}

	this.renderContent = function()
	{
		self.line = [];
		var cont = content.split(" ");
		line = '';
		for(var i = 0; i < cont.length; i++) {
			line = (line == '') ? line + cont[i] : line + ' ' + cont[i];
			if(self.calculateStringWidth(line) >= self.w()) {
				self.line.push(line);
				line = '';
			} else {
				if(i == (cont.length - 1)){self.line.push(line);}
			}
		}
	}; self.renderContent();

	this.updateContent = function(newContent)
	{
		content = newContent;
		self.renderContent();
	}
}

function Color_Box(NAME, X, Y, H, W, R,G,B,A)
{
	var self = this;
	self.name = NAME;
	self.x = X;
	self.y = Y;
	self.w = W;
	self.h = H;
	self.R = R;
	self.G = G;
	self.B = B;
	self.A = A;
	self.color = 'rgba('+R+','+G+','+B+','+A+')';

	this.update = function()
	{ }

	this.updateColor = function()
	{
		self.color = 'rgba('+self.R+','+self.G+','+self.B+','+self.A+')';
	}

	this.draw = function(X, Y)
	{
		canvas.fillStyle = self.color;
		canvas.fillRect((self.x() - self.w() / 2) + X, (self.y() - self.h() / 2) + Y, self.w(), self.h());
	}
}

function Image_Box(NAME, X, Y, H, W, ASSET)
{
	var self = this;
	self.name = NAME;
	self.x = X;
	self.y = Y;
	self.w = W;
	self.h = H;
	self.asset = ASSET;

	this.update = function()
	{ }

	this.draw = function(X, Y)
	{
		canvas.drawImage(asset.tex[self.asset], (self.x() - self.w() / 2) + X, (self.y() - self.h() / 2) + Y, self.w(), self.h());
	}	
}

function Image_Button(NAME, X, Y, H, W, ASSET, HOVER_ASSET, ON_CLICK, HOLD)
{
	var self = this;
	self.name = NAME;
	self.x = X;
	self.y = Y;
	self.w = W;
	self.h = H;
	self.asset = ASSET;
	self.hoverAsset = HOVER_ASSET;
	self.hover = false;
	self.holdEvent = (HOLD) ? HOLD : false;
	self.holdTimer = 0;
	self.holdThreshold = 0.5;

	this.clickEvent = ON_CLICK;

	this.update = function()
	{ }

	this.draw = function(X, Y)
	{
		if(self.hover)
		{
			canvas.drawImage(asset.tex[self.hoverAsset], (self.x() - self.w() / 2) + X, (self.y() - self.h() / 2) + Y, self.w(), self.h());
		} else {
			canvas.drawImage(asset.tex[self.asset], (self.x() - self.w() / 2) + X, (self.y() - self.h() / 2) + Y, self.w(), self.h());
		}
	}
}

function Color_Button(NAME, X, Y, H, W, COLOR, HOVER_COLOR, ON_CLICK, HOLD)
{
	var self = this;
	self.name = NAME;
	self.x = X;
	self.y = Y;
	self.w = W;
	self.h = H;
	self.color = COLOR;
	self.hoverColor = HOVER_COLOR;
	self.holdEvent = (HOLD) ? HOLD : false;
	self.holdTimer = 0;
	self.holdThreshold = 0.5;

	this.clickEvent = ON_CLICK;

	self.update = function()
	{ }

	this.draw = function(X, Y)
	{
		if(self.hover){ canvas.fillStyle = self.hoverColor; } else { canvas.fillStyle = self.color; }
		canvas.fillRect((self.x() - self.w() / 2) + X, (self.y() - self.h() / 2) + Y, self.w(), self.h());
	}
}