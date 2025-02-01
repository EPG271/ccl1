Day 1 (13.1.2025)
Made the main script file, css and html 
Started with a placeholder for the player and drew a background for the game
Implemented gravity and walking left & right

Day 2 (14.1.2025)
Remade the background to follow a grid system, so each block represent a 1x1 block on the grid.
Made an array that tells a function with 0 and 1 values, whether a block has collision at a certain position of the canvas or not.
Divided the script into multiple js files, had to do some bug fixing to make everything work again

Day 3 (15.1.2025)
Finished making all js files work with eachother by properly imorting and exporting everything
Defined the collision detection and made the jump work
Also made a second collision type for the branches that lets players pass through them from underneath but stay on top. This rule gets defined with a 2 in the array

Day 4 (16.1.2025)
Implemented a camera, that follows the player whenever he jumps/ falls. Limited the camera function to being vertical, because the game doesnt go from left to right and would cause the player to make half their screen not being the level, when they stood near the border left or right

Day 5 (17.1.2025)
Made a fly sprite and started working on implementing the fly as a collectable with similar collsion detection logic as the collsion blocks.
Defined canvas bounds, so the player cant fall off the sides of the level anymore

Day 5.5 (19.1.2025, Weekend)
Fixed a few bugs (pun intended) to make the fly actually collectable and dissapear upon contact with player

Day 6 (20.1.2025)
Wrote the logic for cycling through a sprite sheet when the game loop runs and drew an idle animation sprite sheet

Day 7 (21.1.2025)
Made the code to switch to other animations when e.g. pressing d to start the running sprite sheet and stop once the key is released
Drew the sprite sheets for running left and right
Made the background its seperate layer from the block layer for depth and added a forground layer, to make grass and other greenery appear in front of the froggy for more immersion

Day 8 (22.1.2025)
Made a start screen in Photoshop and implemented it with a Start Game Button
Drew a cute little flag that will act as the condition to show the end screen

Day 9 (23.1.2025)
Implemented the logic for the flag, which is very similar to that of the collectable fly, but also shows the end screen upon touching it 
Made it so the fly doesnt just dissapear but also makes a "fly collected" appear on screen once it is collected

Day 10 (24.1.2025)
GAME FINISHED - Presentation Day & Game Fair, really enjoyed seeing what my colleagues produced in the last 2 weeks
