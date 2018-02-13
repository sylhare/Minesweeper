# Minesweeper  [![Codacy Badge](https://api.codacy.com/project/badge/Grade/b4bffb1c4df447549abecb0274433c8f)](https://www.codacy.com/app/Sylhare/Minesweeper?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=Sylhare/Minesweeper&amp;utm_campaign=Badge_Grade)

[![forthebadge](http://forthebadge.com/images/badges/built-with-love.svg)](http://forthebadge.com) [![forthebadge](http://forthebadge.com/images/badges/uses-js.svg)](http://forthebadge.com) [![forthebadge](http://forthebadge.com/images/badges/check-it-out.svg)](http://forthebadge.com) 

### Instructions

1. First click on the green button to download or click [here](https://github.com/Sylhare/Minesweeper/archive/master.zip)
2. Unzip the file like a *boss*.
3. Click on `index.html` to open the file in your default browser
4. Play !

### How to Play

Here is a quick guide on how to play the game:

- `Right click` on a gray square to unveil it.
- The number on the unveiled square reveals the number of mine directly around
- `Left click` on a gray square to flag it (a red flag will appear).
- The goal is to unveil all of the case that does not contain any mines and flag all of the squares that contains a mine.
- the number of mines is at the top of the canvas.

### Updates to come

Here are the features with the functionality per version and the one to come.

#### Version v1.0 -> [Released !!](https://github.com/Sylhare/Minesweeper/releases/tag/v1.0) 

- [X] Show the Minesweeper Board
- [X] Make the Board reactive on clicks
- [X] Have Flags on unclick case when right click
- [X] Uncover case and all empty ones surrounding on left click (flagged ones remains hidden)
- [X] Have Mine hidden randomly in the Board
- [X] Uncover all mines when one is clicked


#### Version v2.0 -> [Released !!](https://github.com/Sylhare/Minesweeper/releases/tag/v2.0)

- [X] A Counter for the time
- [X] Display the amount of mine to find in the game
- [X] More options on board object creation
- [X] Have a autofit function to match the size of the board and the size of the screen 
- [X] Have the mine explode when you click on it
- [X] A winning feature (with a reward for beating the game)
- [X] Have the number of mine to find
- [X] Document the "How to Play" section
- [X] Clean up of V1 code

#### Version v3.0 -> :construction: 

- [ ] A button to start the game and the Timer.
- [X] Clicking on the end game window button restart the game.
- [X] The timer freezes at the end of the game.
- [X] Page design enhancement
- [ ] Possibility to change number of mines in settings
- [X] Information page of the game
- [ ] Reduce cyclomatic complexity
- [ ] Clean up of V2 code
- [ ] Refactoring the project folder's structure

#### For the future versions ?

- [ ] A Selector to choose the board size in settings
- [ ] Make it portable (for phones, or in an App)
- [ ] Have a saving feature (using cookies)
- [ ] Make it into an node package

### More information on the project

I used javascript and CSS without any framework. The minesweeper is rendered in a canvas object. 

The project is build with:

- `Sketch.js` that does the control and set-up.
- `Board.js` for the minesweeper board model that is rendered through a lot of zones.
- `Zone.js` defines the zones to be displayed in the board.
- `Explosion.js` is used to create explosion when a mine explode.
- `Timer.js` is for the timer used in the game.
