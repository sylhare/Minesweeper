# Minesweeper

[![Codacy Badge](https://api.codacy.com/project/badge/Grade/b4bffb1c4df447549abecb0274433c8f)](https://www.codacy.com/app/Sylhare/Minesweeper?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=sylhare/Minesweeper&amp;utm_campaign=Badge_Grade) [![Build Status](https://travis-ci.org/sylhare/Minesweeper.svg?branch=master)](https://travis-ci.org/Sylhare/Minesweeper)

### Instructions

1. First click on the green button to download or click [here](https://github.com/Sylhare/Minesweeper/archive/master.zip)
2. Unzip the file like a *boss*.
3. Click on `index.html` to open the file in your default browser
4. Play !

![Screenchot](https://github.com/sylhare/Minesweeper/blob/master/img/screenshot.png)

### How to Play

Here is a quick guide on how to play the game:

- `Right click` on a gray square to unveil it.
- The number on the unveiled square reveals the number of mine directly around
- `Left click` on a gray square to flag it (a red flag will appear).
- The goal is to unveil all of the case that does not contain any mines and flag all of the squares that contains a mine.
- the number of mines is at the top of the canvas.

### Updates to come

Here are the features to come. Find the already deployed features in the [changelog.md](https://github.com/sylhare/Minesweeper/blob/master/Changelog.md)

#### For the future versions 

- [ ] Possibility to change number of mines in settings
- [ ] Update the project folder's structure?
- [ ] Reduce cyclomatic complexity
- [ ] A Selector to choose the board size in settings
- [ ] Have same format for all in game images
- [ ] Make it portable (for phones, or in an App)
- [ ] Have a saving feature (using cookies)
- [ ] Make it into an node package

### More information on the project

I used javascript and CSS without any framework (beside the one for testing: [Jasmine](https://github.com/jasmine/jasmine), used with Karma on Travis CI). 
The minesweeper is rendered in a canvas object. 

The project is build with:

- `Sketch.js` that does the control and set-up.
- `Board.js` for the minesweeper board model that is rendered through a lot of zones.
- `Zone.js` defines the zones to be displayed in the board.
- `Explosion.js` is used to create explosion when a mine explode.
- `Timer.js` is for the timer used in the game.
