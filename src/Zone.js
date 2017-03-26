var colorUnveiled = "#E5E9EC";
var colorDefault = "#C7CFD6";
var colorHovered = "#E5E9CD";
var mineIMG = new Image();
mineIMG.src = '/img/mine.svg';
var flagIMG = new Image();
flagIMG.src = '/img/flag.svg';


function Zone(x, y, mine, size, value) {
    /* zone of a minesweeper board */
    this.x = x;
    this.y = y;
    this.color = colorDefault; //grey
    this.flag = false;
    this.mine = mine; //true or false
    this.size = size;
    this.value = value;
    this.isUnveiled = false;

    //Can't be called from outside
    function colorSelector(n) {
        /* Select the color based on the value, gradient made with http://www.perbang.dk/rgbgradient/ */
        var color;

        switch (n) {
            case 0: // background color of the zone
                color = this.color;
                break;
            case 1: // green
                color = "#75BF11";
                break;
            case 2: // old green
                color = "#A4C411";
                break;
            case 3: // yellow lime
                color = "#C9BD11";
                break;
            case 4: // light orange
                color = "#CF9311";
                break;
            case 5: // orange
                color = "#D46711";
                break;
            case 6: // dark orange
                color = "#DA3810";
                break;
            case 7: // red
                color = "#DF101A";
                break;
            case 8: // purple
                color = "#E5104E";
                break;
            default: // black
                color = "#202020";
                break;
        }

        return color;
    }


    this.hover = function () {
        /* Update the color of the zone when called */
        this.color = colorHovered;
        this.show();
    }

    this.unveil = function () {
        /* Returns different scenario when the zone is unveiled*/
        this.isUnveiled = true;
        this.color = colorUnveiled;
        this.show();
        
        if (this.mine) {
            return true;

        } else {
            return false;
        }
    }

    this.switchFlag = function () {
        /* when called change this.flag to the opposite value, switching it on and off */
        if (!this.flag) {
            this.flag = true;
        } else {
            this.flag = false;
        }

        this.show();
    }


    this.show = function () {
        /* allows the zone to print itself in a canvas */

        //Draw the zone background
        ctx.beginPath();
        ctx.rect(this.x, this.y, Math.floor(size), Math.floor(size));
        ctx.fillStyle = this.color;
        ctx.fill();

        if (this.isUnveiled) {
            //Draw the Text
            ctx.font = String(Math.ceil(this.size - this.size * 0.2)) + "px Arial";
            ctx.textAlign = "left";
            ctx.fillStyle = colorSelector(this.value);
            ctx.fillText(this.value, this.x + this.size * 0.25, this.y + this.size * 0.75);

            if (this.mine) {
                //Draw the mine
                ctx.drawImage(mineIMG, this.x + this.size * 0.1, this.y + this.size * 0.1, this.size * 0.8, this.size * 0.8);
            }

        } else if (this.flag) {
            //Draw the flag
            ctx.drawImage(flagIMG, this.x + this.size * 0.2, this.y + this.size * 0.1, this.size * 0.60, this.size * 0.7);


        }

        ctx.closePath();

    }

}
