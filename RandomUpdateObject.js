function RUO_Manager()
{
	ruo = [];

	this.addRU = function(UP)
	{
		ruo.push(new RandomUpdateObject(UP));
	}

	this.update = function()
	{
		var i = ruo.length;
		while(i--){
			if(ruo[i].update()){
				h.popArray(ruo, i);
			}
		}
	}
}

function RandomUpdateObject(UP)
{
	var self = this;
	self.update = UP;
}