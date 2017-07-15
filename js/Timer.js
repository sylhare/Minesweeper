function Timer() {
    /* Create a timer to count the elapsed time in minutes, seconds*/
    var timer, time, counter, stopTime;

    this.count = function () {
        /* Update the counter value when called */
        var now = new Date();
        var diff = now.getTime() - this.time.getTime();

        var minutes = Math.floor(diff / 60000);
        var seconds = ((diff % 60000) / 1000).toFixed(0);

        this.counter = minutes + ":" + seconds;

        if (seconds == 60) {
            minutes += 1;
            this.counter = ("0" + minutes).slice(-2) + ":00";
        } else {
            this.counter = ("0" + minutes).slice(-2) + ":" + ("0" + seconds).slice(-2);
        }
    }

    this.start = function (startTime) {
        /* Set the timer start time and start counting */
        var self = this;
        this.time = startTime || new Date();
        this.timer = setInterval(function () {
            self.count();
        }, 1000);
    };

    this.stop = function () {
        /* Save the stopped time */
        this.stopTime = new Date();
        clearInterval(this.timer);
    }

    this.restart = function () {
        /* Adjust the time value after it has been stopped to reflect the correct value in the counter */
        var now = new Date();
        this.time.getTime() += now.getTime() - this.stopTime.getTimer();
        this.start(this.time);
    }
}
