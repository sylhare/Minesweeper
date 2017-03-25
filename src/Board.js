function Board(width, zoneSize, padding, boardSize, mineNumber) {
    /*
        A board is composed of multiple independant square zones
        example:
        
                         North
    
                -------- board --------
                 0  1  2  3  4  5  6  7         
                 8  9 10 11 12 13 14 15         
                16 17 18 19 20 21 22 23         
        West    24 25 26 27 28 29 30 31     East
                32 33 34 35 36 37 38 39
                40 41 42 43 44 45 46 47
                48 49 50 51 52 53 54 55 
                56 57 58 59 60 61 62 63
                
                        South
                        
        64 - boardSize
        8  - width

    
    */

    this.width = width || 8;
    this.zoneSize = zoneSize || 30;
    this.padding = padding || 2;
    this.boardSize = boardSize || this.width * this.width;
    this.mineNumber = mineNumber || this.width;

    this.zones = [];
    this.mines = [];
    this.values = Array.apply(null, new Array(this.boardSize)).map(Number.prototype.valueOf, 0);

    this.setMines = function () {
        /* Generates random unique numbers, which will be the positions of the mines */

        while (this.mines.length < this.mineNumber) {
            var n = Math.ceil(Math.random() * (this.boardSize - 1));

            if (!this.hasMine(n)) {
                this.mines.push(n);
            }
        }

        // Have the mines in the right order (not mandatory)
        this.mines.sort(function (a, b) {
            return a - b;
        });
    }

    this.hasMine = function (n) {
        /* Check if an integer n is a zone where there's a mine */
        if (this.mines.indexOf(n) > -1) {
            return true;
        } else {
            return false;
        }
    }

    this.setValues = function () {
        /* Generates this.values[] which stores the number that says how many mines are around */
        var z, coord, i, j;

        for (i = 0; i <= this.mines.length; i++) {
            z = this.mines[i];

            //Increment the value for all surrounding zones
            coord = this.expand(z);

            for (j = 0; j < coord.length; j++) {
                this.values[coord[j]] += 1;
            }

        }
    }

    this.north = function (z) {
        /* Return the zone north to the "z" one unless we're at the top row */
        if ((0 <= z && z < this.width) || z == this.boardSize) {
            return this.boardSize;
        } else {
            return z - this.width;
        }
    }

    this.south = function (z) {
        /* Return the zone south to the "z" one unless we're at the bottom row */
        if ((this.boardSize - this.width <= z && z < this.boardSize) || z == this.boardSize) {
            return this.boardSize;
        } else {
            return z + this.width;
        }
    }

    this.east = function (z) {
        /* Return the zone east to the "z" one unless we're at the eastern row */
        if ((z % this.width == this.width - 1) || z == this.boardSize) {
            return this.boardSize;
        } else {
            return z + 1;
        }
    }

    this.west = function (z) {
        /* Return the zone west to the "z" one unless we're at the western row */
        if ((z % this.width == 0) || z == this.boardSize) {
            return this.boardSize;
        } else {
            return z - 1;
        }
    }

    this.addZone = function () {
        /* Create a zone and add it to the board */
        var mine = false;
        var x = (this.zoneSize + this.padding) * (this.zones.length % this.width) + this.padding;
        var y = (this.zoneSize + this.padding) * Math.floor(this.zones.length / this.width) + this.padding;

        if (this.hasMine(this.zones.length)) {
            mine = true;
        }

        this.zones.push(new Zone(x, y, mine, this.zoneSize, this.values[this.zones.length]));
    }


    this.setZone = function () {
        /* Initialise board values and create the zones */

        // Add the mines
        this.setMines();

        // Add all the values, the number that say how mines are around
        this.setValues();

        // Create all the zones
        while (this.zones.length < this.boardSize) {
            this.addZone();
        }

    }

    this.update = function (x, y, evt) {
        var z = this.getZone(x, y);
        if (this.zones[z] != undefined) {
            switch (evt) {
                case 'click':
                    this.unveil(z);
                    break;
                case 'contextmenu':
                    this.zones[z].switchFlag();
                    break;
                case 'mousemove':
                    //this.zones[z].hover();
                    break;
                default:
                    console.log("Unusual behaviour: " + evt);
            }
        }
    }

    this.gameOver = function () {
        /* Unveil all the mines of the board */
        var i;

        for (i = 0; i < this.mines.length; i++) {
            this.zones[this.mines[i]].unveil();
        }
        console.log("you lose");
    }


    this.unveil = function (z) {
        /* Defines what to do when the board is clicked */
        var coord, j;

        if (!this.zones[z].flag && !this.zones[z].Unveiled) {
            if (this.zones[z].unveil()) {
                this.gameOver();
            }

            if (!this.zones[z].value) {
                coord = this.expand(z);

                for (j = 0; j < coord.length; j++) {
                    //this.zones[coord[j]].unveil();
                    if (!this.zones[coord[j]].isUnveiled) {
                        this.unveil(coord[j]);
                    }

                }

            }
        }
    }

    this.expand = function (z) {
        var coord = [this.north(z),
                    this.north(this.east(z)),
                    this.north(this.west(z)),
                    this.south(z),
                    this.south(this.east(z)),
                    this.south(this.west(z)),
                    this.east(z),
                    this.west(z)];

        for (i = 0; i < coord.length; i++) {
            if (coord[i] == this.boardSize) {
                coord.splice(i, 1);
                i--;

            }
        }

        return coord;

    }

    this.show = function () {
        /* The board will ask each zone to show itself */
        for (var i = 0; i < this.zones.length; i++) {
            this.zones[i].show();
        }
    }

    this.getZone = function (x, y) {
        /* Give the zone number of a given position (x, y) */
        var column;
        var row;

        if (x > (this.zoneSize + this.padding) * this.width || y > (this.zoneSize + this.padding) * this.width) {
            return undefined;
        } else {
            column = Math.floor(x / (this.zoneSize + this.padding));
            row = Math.floor(y / (this.zoneSize + this.padding));

            return row * this.width + column;
        }
    }

    //So that the board is initialised when created
    this.setZone();

}
