function Gui()
{
  system.log("Constructing Gui base...");
	var self = this;
  this.update = function()
  {
		if(system.debug){ debug.update(); }
		gm.update();
  }
  
  this.draw = function()
  {
  	gm.draw();
		if(system.debug){ debug.draw(); }
  }
  
  //Utility Functions
  this.drawText = function(textHash)
  {
		canvas.fillStyle = textHash.color;
		canvas.font = textHash.font;
		canvas.textAlign = textHash.alignX;
		canvas.textBaseline = textHash.alignY;
		canvas.fillText(textHash.text, textHash.x, textHash.y);
  }
}

function GUIText(Text, X, Y, fStyle, aX, aY, col)
{//new GUIText("The String", x, y, "18px Helvetica", "center", "top", "rgb(96, 255, 96)");
	this.text = Text;
	this.x = X;
	this.y = Y;
	this.fontStyle = fStyle;
	this.alignX = aX;
	this.alignY = aY;
	this.color = col;
}