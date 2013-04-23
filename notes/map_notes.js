-height = int
-width = int (Map tile = 1024 x 1024)
-tileSize = 1024
-mapAssetsInOrder
{//3 x 3 example map assets
  Map is built x by y, meaning top left to bottom right.
  -"res/maps/level1/0_0_background.png"
  -"res/maps/level1/0_0_foreground.png"
  -"res/maps/level1/1_0_background.png"
  -"res/maps/level1/1_0_foreground.png"
  -"res/maps/level1/2_0_background.png"
  -"res/maps/level1/2_0_foreground.png"
  -"res/maps/level1/0_1_background.png"
  -"res/maps/level1/0_1_foreground.png"
  -"res/maps/level1/1_1_background.png"
  -"res/maps/level1/1_1_foreground.png"
  -"res/maps/level1/2_1_background.png"
  -"res/maps/level1/2_1_foreground.png"
  -"res/maps/level1/0_2_background.png"
  -"res/maps/level1/0_2_foreground.png"
  -"res/maps/level1/1_2_background.png"
  -"res/maps/level1/1_2_foreground.png"
  -"res/maps/level1/2_2_background.png"
  -"res/maps/level1/2_2_foreground.png"
}

-lights
  -(X, Y, R, G, B, Brightness, Radius, Shader, SpecularFactor)
  -(X, Y, R, G, B, Brightness, Radius, Shader, SpecularFactor)
  -(X, Y, R, G, B, Brightness, Radius, Shader, SpecularFactor)

-props
  -(X, Y, "asset.png", tile, animated, background, light(null or light))
    -if light != null, render light
    -in prop update, if light != null, set light x & y = prop x & y

-Collision Areas
  -(X, Y, height, width, type)
    -Collision Types: 0=normal, 1=move to top

-Checkpoints
  -(X, Y, checkpointNumber)

-Action Areas
  -(areaName, X, Y, height, width, onEnter, onAction, onExit)

-NPCs
  -(npcName, "asset.png", x, y, "AI-State")

-Emitter
  -(emitterName, x, y, particleSize, numberOfParticles, emissionSpeed, life/*9000 is unlimited*/)
  -Particle
    -("asset"/*rgba does color*/, x, y, life)
  -FX
    -(name, x, y, creationFunction, updateTick)