function Explosion(x, y, number, size, speed) {
    /*
        Creates an explosion with random particles and speed
    
    */
    var size_max = size || 9;
    var size_min = 4;
    var speed_max = speed || 15;
    var speed_min = 7;
    var n = number || 20;
    this.particles = [];

    for (var i = 0; i < n; i++) {
        var p = new Particle()

        p.x = x;
        p.y = y;
        p.radius = random(size_min, size_max);
        p.scale = random(4, 10);
        p.color = randomColor();
        p.speed = random(speed_min, speed_max);
        p.direction = randomDirection();

        this.particles.push(p);

    }

    this.update = function () {
        /*
            Update the explosion
        */
        for (var i = 0; i < this.particles.length; i++) {
            this.particles[i].update();
            this.particles[i].draw(ctx);
        }
    }
}


// Canvas and ctx are in sketch.js
function randomColor() {
    var red = "#CC1600";
    var darkOrange = "#D33407";
    var orange = "#E17016";
    var yellow = "#FFA318";
    var gray = "#525252";

    var i = random(0, 100);

    switch (true) {
        case i <= 10:
            return red;
        case i <= 20:
            return darkOrange;
        case i <= 30:
            return orange;
        case i <= 50:
            return yellow;
        default:
            return gray;
    }
}

function randomDirection() {
    var angle = random(0, 360) * Math.PI / 180;
    var direction = {
        x: Math.cos(angle),
        y: Math.sin(angle)
    };

    return direction;
}

function random(min, max) {
    return min + Math.random() * (max - min);
}

function Particle() {
    this.x;
    this.y;
    this.radius;
    this.scale; // for particle reduction
    this.direction = {
        x: 0,
        y: 0
    }; //vector
    this.speed; //speed at which they go to a direction
    this.color;

    this.update = function () {
        // Particle radius being scaling down
        this.radius -= this.scale / 5;


        if (this.radius < 0) {
            this.radius = 0;
        }

        // moving away from explosion center
        this.x += this.direction.x * this.speed;
        this.y += this.direction.y * this.speed;

    }

    this.draw = function (ctx) {
        // translates the particle from previous place to new one
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.scale(this.scale, this.scale);

        // drawing a filled circle in the particle's local space
        ctx.beginPath();
        // arc(x, y, radius, startAngle, endAngle, anticlockwise)
        ctx.arc(0, 0, this.radius, 0, Math.PI * 2, true);
        ctx.closePath();

        ctx.fillStyle = this.color;
        ctx.fill();

        ctx.restore();
    }

}
