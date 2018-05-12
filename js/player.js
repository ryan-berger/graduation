function Ryan(source, canvas, context) {
    var ryan = this;

    ryan.x = 10;
    ryan.y = 50;
    ryan.jumping = false;

    ryan.acceleration = -9.8;
    ryan.velocity = 0;

    ryan.update = function (tick) {
        var value = ryan.dx !== 0 ? ((-.09) * Math.pow(tick - ryan.dx, 2)) + 6 * (tick - ryan.dx) : 0;
        ryan.jumping = value > 0;
        ryan.y = (canvas.height - ryan.image.height) - (value > 0 ? value : 0)
    };

    ryan.y = 0;
    ryan.image = new Image();
    ryan.image.src = source;

    this.draw = function (tick) {
        ryan.update(tick);
        context.drawImage(ryan.image, ryan.x, ryan.y);
    };

    this.jump = function (tick) {
        if (!ryan.jumping) {
            ryan.dx = tick;
        }
    }
}
