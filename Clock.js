function Clock()
{
  system.log("Constructing Hex Engine Clock...");
  var self = this;
  self.delta, self.fps, self.inc_fps, self.ticks, self.seconds, self.minutes, self.hours, self.days,
  self.current_time, self.last_time, self.elapsed_time, self.tick_time;
  self.delta = self.fps = self.inc_fps = self.seconds = self.current_time = self.last_time = self.elapsed_time = self.ticks = self.e = 0;
  self.tick_time = 0.0;
	self.fps2;
	self.movement = true;
	
	$(window).focus(function(){ self.movement = true; });
  $(window).blur(function(){ self.movement = false; });

  this.update = function()
  {
    self.inc_fps++;
    self.current_time = Date.now();
    self.elapsed_time = self.current_time - self.last_time;
    self.last_time = self.current_time;
    self.delta = (self.movement) ? (self.elapsed_time < 50 ? self.elapsed_time / 1000 : 0.05) : 0;
    self.tick_time += self.delta;
		if(self.e == self.ticks){self.e = -1;}
    if(self.tick_time >= (self.ticks / 20))
    {
      if(self.ticks > 20)
      {
        self.inc_fps = 0;
        self.seconds++;
        self.ticks = 1;
        self.tick_time = 0.0;
      } else
			{
				self.ticks++;
				self.e = self.ticks;
			}
			if(self.e != -1){self.fps = Math.floor(self.inc_fps / self.tick_time);}
    }
  }
}