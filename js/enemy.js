function isOnScreen(canvas, image, x) {
    var canvasWidth = canvas.width;
    var imageWidth = image.width;



    var delta = (x - imageWidth + (2 * imageWidth));
    return delta <= canvasWidth && delta > 0
}

function Enemy(id, source, canvas, context, startTime, onCollision) {
    var enemy = this;

    enemy.context = context;

    enemy.image = new Image();
    enemy.image.src = source;
    enemy.initialPosition = canvas.width - enemy.image.width;
    enemy.y = (canvas.height - enemy.image.height) - Math.floor(Math.random() * 203);
    enemy.x = enemy.initialPosition;
    enemy.collided = false;
    enemy.onScreen = false;


    this.update = function (tick, player) {
        enemy.collided = enemy.hasCollided(player);

        if (enemy.collided)
            onCollision();

        enemy.onScreen = isOnScreen(canvas, enemy.image, enemy.x);
        enemy.x = (enemy.initialPosition - (5 * (tick - startTime)));
        this.draw();
    };

    this.draw = function () {
        context.drawImage(enemy.image, enemy.x, enemy.y);
    };

    this.hasCollided = function (player) {
        return (enemy.x < player.x + (player.image.width / 2) &&
            enemy.x + (enemy.image.width / 2) > player.x &&
            enemy.y < player.y + player.image.height &&
            enemy.image.height + enemy.y > player.y);
    };

    this.shouldRecycle = function () {
        return !isOnScreen(canvas, enemy.image, enemy.x) || enemy.collided;
    };

}
