var pad = 2; //Value for the padding
var size = 30; //Value for the size of a zone (a square)
var background = "#FFF"; //Color of the board background

function autoSize(n) {
    /* Calculate the number of padding and zoneSize that can fit in n, without missing the first padding */
    return (n - pad) / (size + pad);
}

function Board(map, mineNumber) {
    /*
            Board accept two variables, map which defines how the board is created,
            If you feed Board with a canvas, it will fill it with cases,
            If you feed Board with a number, it will create a square of zones starting top left
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
            8  - column

             -- zoneSize
             __           __   __
            |  | Padding |  | |  |
             --           --   --
    */

    this.column = Math.round(Math.sqrt(map)) || Math.floor((autoSize(map.width)));
    this.row = Math.round(Math.sqrt(map)) || Math.floor((autoSize(map.height)));
    this.padding = pad;
    this.zoneSize = size;
    this.boardSize = this.column * this.row || 64;
    this.mineNumber = mineNumber || this.column;
    this.zones = [];
    this.mines = [];
    this.values = Array.apply(null, new Array(this.boardSize)).map(Number.prototype.valueOf, 0);

    this.autoFit = function (n) {
        /* Try to reduce the amount of unused space in an inconvenient Canvas */
        var x, y;

        //Detect the space to small to be filled with zone
        x = n.width - this.column * (this.zoneSize + this.padding) - this.padding;
        y = n.height - this.row * (this.zoneSize + this.padding) - this.padding;

        //Divides the amount left by number of padding
        x = x / (this.column + 1);
        y = y / (this.row + 1);

        //Adjust the padding depending on which side is bigger (height or width)
        if (x > y) {
            this.padding = Math.round(this.padding + y);
        } else {
            this.padding = Math.round(this.padding + x);
        }
    };

    this.setMines = function () {


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
    };

    this.hasMine = function (n) {
        /* Check if an integer n is a zone where there's a mine */
        if (this.mines.indexOf(n) > -1) {
            return true;
        } else {
            return false;
        }
    };

    this.setValues = function () {
        /* Generates this.values[] which stores the number that says how many mines are around */
        var z, coord, i, j;

        for (i = 0; i <= this.mines.length; i++) {
            //Increment the value for all surrounding zones
            coord = this.expand(this.mines[i]);

            for (j = 0; j < coord.length; j++) {
                this.values[coord[j]] += 1;
            }

        }
    };

    this.north = function (z) {
        /* Return the zone north to the "z" one unless we're at the top row */
        if ((0 <= z && z < this.column) || z === this.boardSize) {
            return this.boardSize;
        } else {
            return z - this.column;
        }
    }

    this.south = function (z) {
        /* Return the zone south to the "z" one unless we're at the bottom row */
        if ((this.boardSize - this.column <= z && z < this.boardSize) || z === this.boardSize) {
            return this.boardSize;
        } else {
            return z + this.column;
        }
    }

    this.east = function (z) {
        /* Return the zone east to the "z" one unless we're at the eastern row */
        if ((z % this.column === this.column - 1) || z === this.boardSize) {
            return this.boardSize;
        } else {
            return z + 1;
        }
    }

    this.west = function (z) {
        /* Return the zone west to the "z" one unless we're at the western row */
        if ((z % this.column === 0) || z === this.boardSize) {
            return this.boardSize;
        } else {
            return z - 1;
        }
    }

    this.addZone = function () {
        /* Create a zone and add it to the board */
        var mine = false;
        var x = (this.zoneSize + this.padding) * (this.zones.length % this.column) + this.padding;
        var y = (this.zoneSize + this.padding) * Math.floor(this.zones.length / this.column) + this.padding;

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

    this.update = function (x, y, evt, canvas) {
        /* Action to perform based on event received and the coordinates of the mouse */
        var z = this.getZone(x, y);

        if (this.zones[z]) {
            switch (evt) {
                case "click":
                    this.unveil(z, canvas);
                    break;
                case "contextmenu":
                    this.zones[z].switchFlag();
                    break;
                case "mousemove":
                    //this.zones[z].hover();
                    break;
                default:
                    //console.log("Unusual behaviour: " + evt);
            }
            this.draw(canvas);
        }
    }

    this.gameOver = function () {
        /* Unveil all the mines of the board */

        for (var i = 0; i < this.mines.length; i++) {
            this.zones[this.mines[i]].unveil();
        }
        //alert("you lose");
    }

    this.explode = function (zone, canvas) {
        /* Dispatch custom event "explode" */
        var explode = new CustomEvent("explode", {
            "detail": {
                "x": zone.x,
                "y": zone.y
            }
        });
        canvas.dispatchEvent(explode);
    }

    this.unveil = function (z, canvas) {
        /* Defines what to do when the board is clicked */
        var coord, j;

        if (!this.zones[z].flag && !this.zones[z].Unveiled) {
            if (this.zones[z].unveil()) {
                this.explode(this.zones[z], canvas);
                this.gameOver();
            }

            if (!this.zones[z].value) {
                coord = this.expand(z);

                for (j = 0; j < coord.length; j++) {
                    if (!this.zones[coord[j]].isUnveiled) {
                        this.unveil(coord[j]);
                    }

                }

            }
        }
    }

    this.expand = function (z) {
        /* Return an array with all available surrounding zones of the *z* input one */
        var coord = [this.north(z),
                    this.north(this.east(z)),
                    this.north(this.west(z)),
                    this.south(z),
                    this.south(this.east(z)),
                    this.south(this.west(z)),
                    this.east(z),
                    this.west(z)];

        for (var i = 0; i < coord.length; i++) {
            if (coord[i] === this.boardSize) {
                coord.splice(i, 1);
                i--;

            }
        }

        return coord;

    }

    this.draw = function (canvas) {
        /* Drawing the state of the board */
        var ctx = canvas.getContext("2d");

        //Clean up the board
        ctx.fillStyle = "#FFF";
        ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

        //The board will ask each zone to draw itself
        for (var i = 0; i < this.zones.length; i++) {
            this.zones[i].draw(canvas);
        }
    }

    this.getZone = function (x, y) {
        /* Give the zone number of a given position (x, y) */
        var column, row;
        var zone = null;

        if (x <= (this.zoneSize + this.padding) * this.column && y <= (this.zoneSize + this.padding) * this.column) {
            column = Math.floor(x / (this.zoneSize + this.padding));
            row = Math.floor(y / (this.zoneSize + this.padding));
            zone = row * this.column + column;
        }

        return zone;
    }

    //So that the board is initialised when created
    if (!Number.isInteger(map)) {
        this.autoFit(map);
    }
    this.setZone();

}
