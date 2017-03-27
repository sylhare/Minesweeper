# Minesweeper
-------------

[![forthebadge](http://forthebadge.com/images/badges/built-with-love.svg)](http://forthebadge.com) [![forthebadge](http://forthebadge.com/images/badges/uses-js.svg)](http://forthebadge.com) [![forthebadge](http://forthebadge.com/images/badges/check-it-out.svg)](http://forthebadge.com) 

###Instructions

1. First click on the green button to download or click [here](https://github.com/Sylhare/Minesweeper/archive/master.zip)
2. Unzip the file like a boss
3. Click on `index.html` to open the file in your default browser
4. Play !

###Updates to come

Here are some stuff that I might add, now that I have a first version working:

- A Counter for the time
- A Selector to choose the board size
- A button to start the game (and the Counter)
- A winning feature (with a reward for betting the game)
- Some clean up


### More information on the project

I used javascript without any framework.</br> 
The minesweeper is rendered in a canvas object (I thought of an other option, like using a table in HTML and react.js to update it, maybe for later).</br>
I've built the project under the influence of how they did using p5.js but without it. So there's a sketch.js with the control and set-up, then there's Board.js for the minesweeper board model that is rendered through a lot of zones in Zones.js which also have some logic for the display.