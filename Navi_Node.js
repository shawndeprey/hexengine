function Navigation_Manager()
{
	system.log("Constructing Navigation Manager");
	var self = this;
	self.node = {};

	this.addNode = function(NAME, X, Y, H, W, NODE_NUM)
	{
		if( !self.node.hasOwnProperty(NAME) ) {
			self.node[NAME] = new NavNode(NAME, X, Y, H, W, NODE_NUM);
		} else {
			system.log("Tried to add multiple key in node: " + NAME);
		}
	}

	this.removeNode = function(e)
	{
		h.popEntityFromAssoc(self.node, e);
	}

	this.naviCount = function()
	{
		return Object.keys(self.node).length;
	}

	this.drawNaviNode = function()
	{
		started = false;
		canvas.fillStyle = "rgb(255,175,255)";
		canvas.strokeStyle = "#0000ff";
		canvas.lineWidth = 1;
		offsetX = offsetY = 0;
    $.each(self.node, function(){
    	this.draw();
  		offsetX = h.X(this.x);
  		offsetY = h.Y(this.y);
    	if(!started){ started = true;
    		canvas.beginPath();
    		canvas.moveTo(offsetX, offsetY);
    	} else {
    		canvas.lineTo(offsetX, offsetY);
    		canvas.closePath();
    		canvas.stroke();
    		canvas.beginPath();
    		canvas.moveTo(offsetX, offsetY);
    	}
    });
    canvas.lineTo(offsetX, offsetY);
    canvas.closePath();
    canvas.stroke();
	}
}

function NavNode(NAME, X, Y, H, W, NODE_NUM)
{
  system.log("Constructing Navi Node: " + NAME);
  var self = this;
  self.name = NAME;
  self.type = 'navi';
	self.x = X;
	self.y = Y;
	self.height = H;
	self.width = W;
	self.num = NODE_NUM;

	this.draw = function()
	{
		canvas.fillRect(h.X(self.x - self.width / 2), h.Y(self.y - self.height / 2), self.width, self.height);
	}

	this.update = function()
	{ }
}