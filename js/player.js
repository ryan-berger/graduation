function Ryan(source, canvas, context, scale) {
    var ryan = this;

    ryan.x = 10;
    ryan.y = 10;

    ryan.width = function() {
        return ryan.image.width === undefined ? 0 : ryan.image.width * ryan.scale;
    };

    ryan.height = function() {
        return ryan.image.height === undefined ? 0 : ryan.image.height * ryan.scale;
    };

    ryan.scale = scale;

    ryan.jumping = false;

    ryan.acceleration = -9.8;
    ryan.velocity = 0;


    ryan.update = function (tick) {
        var value = ryan.dx !== 0 ? ((-.09) * Math.pow(tick - ryan.dx, 2)) + 10  * (tick - ryan.dx) : 0;
        ryan.jumping = value > 0;
        ryan.y = (canvas.height - ryan.height()) - (value > 0 ? value : 0) - 30;
    };

    ryan.y = 0;
    ryan.image = new Image();
    ryan.image.src = source;

    this.draw = function (tick) {
        ryan.update(tick);
        context.drawImage(ryan.image, ryan.x, ryan.y, ryan.width(), ryan.height());
    };

    this.jump = function (tick) {
        if (!ryan.jumping) {
            ryan.dx = tick;
        }
    }
}
