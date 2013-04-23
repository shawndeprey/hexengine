fxmanager.add('explosion1', function(){
	num_particles = this.size * system.particleLevel;
	while(num_particles--){
		X_VEL = ((Math.random() - 0.5) * 2.0 * 5.0) * 80;
		Y_VEL = ((Math.random() - 0.5) * 2.0 * 5.0) * 80;
		HEIGHT = (Math.random() + 0.5) * 5;
		WIDTH = (Math.random() + 0.5) * 5;
		LIFE = (this.life == -1) ? 3 : this.life;
		this.parts.push(new Particle(this.asset_or_color, this.x, this.y, X_VEL, Y_VEL, HEIGHT, WIDTH, LIFE));
	}
	asset.playSFX('explode1');
});

fxmanager.add('explosion-emitter', function(){
	num_particles = this.size * system.particleLevel;
	chance = Math.round( Math.random() * ((system.maxParticleLevel + 1) - system.particleLevel) );
	if(chance == 1){
		i = 1;
		while(i--){
			X_VEL = ((Math.random() - 0.5) * 2.0 * 5.0) * 80;
			Y_VEL = ((Math.random() - 0.5) * 2.0 * 5.0) * 80;
			HEIGHT = (Math.random() + 0.5) * 5;
			WIDTH = (Math.random() + 0.5) * 5;
			LIFE = 3;
			this.parts.push(new Particle(this.asset_or_color, this.x, this.y, X_VEL, Y_VEL, HEIGHT, WIDTH, LIFE));
		}
	}
});