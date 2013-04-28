PROPS.add('testprop1', function(X, Y){
	world.addEntity(new Prop('testProp', X/*x*/, Y/*y*/, 128/*h*/, 48/*w*/, false/*foreground*/,
		new Animation('idle','playerOld'/*tex*/,0/*start*/,7/*end*/,100/*tile-ms-time*/,128/*tile-size*/,1024/*sheet-size*/, true/*Repeat*/),
	function(){
		//example prop
		//this.x += 20 * clock.delta;
	}, "testprop1"));
});