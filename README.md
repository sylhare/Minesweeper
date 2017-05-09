# Minesweeper
-------------

[![forthebadge](http://forthebadge.com/images/badges/built-with-love.svg)](http://forthebadge.com) [![forthebadge](http://forthebadge.com/images/badges/uses-js.svg)](http://forthebadge.com) [![forthebadge](http://forthebadge.com/images/badges/check-it-out.svg)](http://forthebadge.com) 

### Instructions

1. First click on the green button to download or click [here](https://github.com/Sylhare/Minesweeper/archive/master.zip)
2. Unzip the file like a boss
3. Click on `index.html` to open the file in your default browser
4. Play !

### Updates to come

Here are some stuff that I might add, now that I have a first version working:

- [ ] A Counter for the time
- [X] More options on board object creation
- [ ] A Selector to choose the board size
- [ ] A button to start the game (and the Counter)
- [X] Have the mine explode when you click on it
- [ ] A winning feature (with a reward for beating the game)
- [X] Have the number of mine to find
- [ ] Some clean up


### More information on the project

I used javascript without any framework.</br> 
The minesweeper is rendered in a canvas object (I thought of an other option, like using a table in HTML and react.js to update it, maybe for later).</br>
The project is build with `sketch.js` that does the control and set-up, then there's `Board.js` for the minesweeper board model that is rendered through a lot of zones in `Zone.js` which also have some logic for the display.