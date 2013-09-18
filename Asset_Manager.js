function Asset_Manager()
{
  system.log("Constructing Asset Manager...");
  var self = this;
	self.sfx = {};
	self.bgm = {};
	self.tex = {};
	self.masterVolume = 0.1;
	self.unmutedVolume = self.masterVolume;
	self.currentBGM = "";
	self.loadedAssets = 0;
	self.allAssetsLoaded = false;

	// Hexengine Asset Manager is pretty much stupid. It will not detect how many assets
	// you have, so you MUST set this value manually
	self.numberOfAssets = 19;

	this.increaseVolume = function()
	{
		self.masterVolume = (self.masterVolume + 0.1 >= 1) ? 1 : self.masterVolume + 0.1;
		self.unmutedVolume = self.masterVolume;
		self.updateVolume();
	}

	this.decreaseVolume = function()
	{
		self.masterVolume = (self.masterVolume - 0.1 <= 0) ? 0 : self.masterVolume - 0.1;
		self.unmutedVolume = self.masterVolume;
		self.updateVolume();
	}
	this.toggleMute = function()
	{
		self.masterVolume = (self.masterVolume > 0) ? 0 : self.unmutedVolume;
		self.updateVolume();
	}

	this.updateVolume = function()
	{
		$.each(self.bgm, function(){ this.volume = self.masterVolume; });
		$.each(self.sfx, function(){ 
			var i = this.channel.length;
			while(i--){
				this.channel[i].volume = self.masterVolume; 
			}
		});
	}

	this.playBGM = function(name)
	{
		if( self.bgm.hasOwnProperty(name) ) {
			system.log("Playing: " + name);
			self.stopBGM(self.currentBGM);
		  self.bgm[name].play();
			$(self.bgm[name]).bind("ended", function(){ self.bgmEnded(name); });
			self.currentBGM = name;
		} else {
			system.log("Tried to play BGM that did not exist: " + name);
		}
	}
	
	this.playRandomBGM = function()
	{
		system.log("Playing random BGM");
		keys = Object.keys(this.bgm);
		self.playBGM(keys[Math.floor(keys.length * Math.random())]);
	}

	this.playRandomBGMFromMapList = function()
	{
		system.log("Playing random BGM");
		keys = Object.keys(map.bgm);
		self.playBGM(keys[Math.floor(keys.length * Math.random())]);
	}
	
	this.stopBGM = function(name)
	{
		if(self.bgm.hasOwnProperty(name)){ self.bgm[name].pause(); self.bgm[name].currentTime = 0; }
	}
	
	this.playSFX = function(name)
	{
		if( self.sfx.hasOwnProperty(name) ) {

			self.sfx[name].channel[self.sfx[name].index].currentTime = 0;
			self.sfx[name].channel[self.sfx[name].index].play();
			self.sfx[name].index = (self.sfx[name].index + 1 < self.sfx[name].channels) ? self.sfx[name].index + 1 : 0;
		} else {
			system.log("Tried to play SFX that did not exist: " + name);
		}
	}
	
	this.bgmEnded = function(name)
	{
		system.log(name + " BGM ended.");
		self.playRandomBGMFromMapList();
	}
	
	this.loadedAsset = function(asset)
	{
		system.log("Loaded Asset: " + asset);
		self.loadedAssets++;
		if(self.getPercentOfLoadedAssets() == 1){ self.allAssetsLoaded = true; self.allAssetsLoadedEvent(); }
		graphic.drawLoadMessages();
	}
	
	this.getPercentOfLoadedAssets = function()
	{
		return self.loadedAssets / self.numberOfAssets;
	}
	
	this.addBMG = function(name, source, type)
	{
		if( !self.bgm.hasOwnProperty(name) ) {
			system.log("Adding Sound: " + source);
			self.bgm[name] = new Audio(source);
			self.bgm[name].volume = self.masterVolume;
			self.bgm[name].type="audio/" + type;
			self.bgm[name].addEventListener('canplaythrough', function(){ self.loadedAsset(source); }, false);
			self.bgm[name].load();
		} else {
			system.log("Tried to add multiple key in BGM: " + name);
		}
	}
	
	this.addSFX = function(name, source, chan)
	{
		if( !self.sfx.hasOwnProperty(name) ) {
			system.log("Adding Sound: " + source);
			self.sfx[name] = {};
			self.sfx[name].channel = [];
			self.sfx[name].channels = chan;
			self.sfx[name].index = 0;
			var i = chan;
			while(i--) {
				self.sfx[name].channel[i] = new Audio(source);
				self.sfx[name].channel[i].volume = self.masterVolume;
				self.sfx[name].channel[i].addEventListener('canplaythrough', function(){ self.loadedAsset(source + " |channel " + i +"|"); }, false);
				self.sfx[name].channel[i].load();
			}
		} else {
			system.log("Tried to add multiple key in SFX: " + name);
		}
	}

	this.addTexture = function(name, source)
	{
		if( !self.tex.hasOwnProperty(name) ) {
			system.log("Adding Texture: " + source);
			self.tex[name] = new Image();
			self.tex[name].src = source;
			//$(self.tex[name]).ready(self.loadedAsset(source));
			self.tex[name].addEventListener('load', function(){ self.loadedAsset(source); }, false);
		} else {
			system.log("Tried to add multiple key in TEX: " + name);
		}
	}
	
	this.loadAudio = function(ext)
	{
		// This is where you define your BMG and SFX

		system.log("Loading "+ext+" Files Into Memory...");
		
		//BGM
		//self.addBMG("swimorsink", "res/audio/swim_or_sink."+ext, ext);

		//SFX
		self.addSFX("explode1", "res/audio/Explode."+ext, 5);
	}

	this.loadTextures = function()
	{
		// This is where you define your textures. All except for you map backgrounds.
		// Map backgrounds should be included in your map folder. See example Javabomb.

		system.log("Loading All Textures...");
		self.addTexture('player', 'res/image/player/CharaGridBaseNew.png');
		self.addTexture('playerOld', 'res/image/player/CharaGridBase.png');
		self.addTexture('volumeUp', 'res/image/gui/volume_up.png');
		self.addTexture('volumeUpHover', 'res/image/gui/volume_up_hover.png');
		self.addTexture('volumeDown', 'res/image/gui/volume_down.png');
		self.addTexture('volumeDownHover', 'res/image/gui/volume_down_hover.png');
		self.addTexture('muteOn', 'res/image/gui/mute_on.png');
		self.addTexture('muteOnHover', 'res/image/gui/mute_on_hover.png');
		self.addTexture('muteOff', 'res/image/gui/mute_off.png');
		self.addTexture('muteOffHover', 'res/image/gui/mute_off_hover.png');
		self.addTexture('next', 'res/image/gui/next.png');
		self.addTexture('nextHover', 'res/image/gui/next_hover.png');
		self.addTexture('previous', 'res/image/gui/previous.png');
		self.addTexture('previousHover', 'res/image/gui/previous_hover.png');
	}
	
	this.findSupportedFileTypesAndLoadAssets = function()
	{
		system.log("Finding Supported Browser File Types...");
		self.loadTextures();
		switch(system.browser)
		{
			case "Chrome":{ self.loadAudio("mp3"); break;}
			case "Firefox":{ self.loadAudio("ogg"); break;}
			case "Mozilla":{ self.loadAudio("ogg"); break;}
			default:{ self.loadAudio("mp3"); }
		}
	}
	
	this.allAssetsLoadedEvent = function()
	{
		self.playBGM("swimorsink");
	}

  this.update = function()
  { }
}