describe("A Board", function() {});

describe("A Zone of the Board", function() {});

describe("An explosion", function() {});

describe("A timer", function() {
    var timer;

    beforeEach(function() {
        timer = new Timer();
        timer.start();
    });

    it("starts at 00:00 ", function() {
        expect(timer.counter).toEqual("00:00");
    });

    it("saves counter at stop time", function() {
        timer.counter = "00:02";
        timer.stop();

        expect(timer.counter).toEqual("00:02");
    });

    it("can be reset to 00:00 at any time", function() {
        timer.counter = "11:11";
        timer.reset();

        expect(timer.counter).toEqual("00:00");

        timer.counter = "22:22";
        timer.stop();
        timer.reset();

        expect(timer.counter).toEqual("00:00");


    });

});

