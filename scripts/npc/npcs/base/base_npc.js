NPC.add('base_jump', function(){
	if(this.grounded && this.didJump == false) {
		this.animate.setAnimation('jump');
		this.heading = (this.heading == 1) ? 0 : 1;
		this.velocity = -600;
		this.didJump = true;
	} else
	if(this.grounded && this.didJump == true) {
		this.didJump = false;
		this.convergeAI();
	}
});

NPC.add('base_idle', function(){
	this.animate.setAnimation('idle');
	if(clock.e == 3){
		this.didJump = false;
		this.navigateTo = 'node5';
    this.branchAI("base_jump");
  }
});

NPC.add('base_entered_node', function(){
	if(this.navigateTo != false) {
		if(this.inNaviNode == this.navigateTo){
			//system.log('Navigated to destination ' + this.navigateTo);
			this.navigateTo = false;
		}
	}
	this.convergeAI();
});

NPC.add('base_secondary_update', function(){
	if(this.onEnterNode){
		this.branchAI('base_entered_node');
	}
});