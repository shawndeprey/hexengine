function Gui_Debug()
{
  system.log("Constructing Debug Gui...");
  var self = this;
  this.baseColor = 'rgb(200, 200, 255)';
  this.baseFont = '12px Arial';
  
  this.update = function()
  { }
  
  this.draw = function()
  {
		gui.drawText({text:'Hex Engine | Shawn Deprey | Blackmodule Studio', x:5, y:4, font:this.baseFont, alignX:'left', alignY:'top', color:this.baseColor});
		gui.drawText({text:'FPS | ' + clock.fps, x:system.width - 60, y:4, font:this.baseFont, alignX:'left', alignY:'top', color:this.baseColor});
		gui.drawText({text:'Tick | ' + clock.ticks, x:system.width - 115, y:4, font:this.baseFont, alignX:'left', alignY:'top', color:this.baseColor});
		gui.drawText({text:'Event Tick | ' + clock.e, x:system.width - 200, y:4, font:this.baseFont, alignX:'left', alignY:'top', color:this.baseColor});
		gui.drawText({text:'Current Frame | ' + clock.inc_fps, x:system.width - 315, y:4, font:this.baseFont, alignX:'left', alignY:'top', color:this.baseColor});
		gui.drawText({text:'Delta | ' + clock.delta, x:system.width - 400, y:4, font:this.baseFont, alignX:'left', alignY:'top', color:this.baseColor});
		gui.drawText({text:'Keys Pressed | ' + input.keysPressed, x:5, y:system.height - 18, font:this.baseFont, alignX:'left', alignY:'top', color:this.baseColor});
		gui.drawText({text:'Mouse | x:' + input.x + '  worldX:' + Math.round(input.screenX) + '   y:' + input.y + '  worldY:' + Math.round(input.screenY) + ' |', x:200, y:system.height - 18, font:this.baseFont, alignX:'left', alignY:'top', color:this.baseColor});
		gui.drawText({text:'FX Engine | FX:' + fx.numFX + '  Particles' + fx.numParts + ' |', x:600, y:system.height - 18, font:this.baseFont, alignX:'left', alignY:'top', color:this.baseColor});
		gui.drawText({text:'Light Resolution | ' + lighting.resolution, x:system.width - 125, y:system.height - 18, font:this.baseFont, alignX:'left', alignY:'top', color:this.baseColor});
		gui.drawText({text:'Lights | ' + lighting.lightsOnScreen, x:system.width - 200, y:system.height - 18, font:this.baseFont, alignX:'left', alignY:'top', color:this.baseColor});
		gui.drawText({text:'World Offset | x:' + Math.round(world.xOff) + ' y:' + Math.round(world.yOff) + ' |', x:system.width - 315, y:24, font:this.baseFont, alignX:'left', alignY:'top', color:this.baseColor});
		gui.drawText({text:'Player | x:' + Math.round(world.player.x) + ' y:' + Math.round(world.player.y) + ' |', x:system.width - 160, y:24, font:this.baseFont, alignX:'left', alignY:'top', color:this.baseColor});
		gui.drawText({text:'Heading | ' + ((world.player.heading == 0)?'Left':'Right') + ' |', x:system.width - 160, y:42, font:this.baseFont, alignX:'left', alignY:'top', color:this.baseColor});
		if(input.dragStart){
			gui.drawText({text:'Drag Offset | x:' + Math.round(input.dragOffX) + '   y:' + Math.round(input.dragOffY) + ' |', x:200, y:system.height - 36, font:this.baseFont, alignX:'left', alignY:'top', color:this.baseColor});
		}
  }
}