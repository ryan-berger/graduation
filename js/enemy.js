function isOnScreen(canvas, image, x) {
    var canvasWidth = canvas.width;
    var imageWidth = image.width;



    var delta = (x - imageWidth + (2 * imageWidth));
    return delta <= canvasWidth + (2 * imageWidth) && delta > 0
}

function randomIntFromInterval(min,max)
{
    return Math.floor(Math.random()*(max-min+1)+min);
}

function Enemy(id, source, scale, canvas, context, startTime, onCollision, player) {
    var enemy = this;

    this.playerPosition = function (tick) {
        return ((-.09) * Math.pow(tick, 2)) + 10  * (tick)
    };

    this.randomlyGenerateY = function() {
        return Math.floor(Math.random() * 2) === 0 ? enemy.generateHighY() : enemy.generateLowY();
    };

    this.generateHighY = function() {
        var random = enemy.playerPosition(randomIntFromInterval(40, 55.555));
        return canvas.height - player.height() - random + 30;
    };

    this.generateLowY = function() {
        var random = enemy.playerPosition(randomIntFromInterval(0, 40));
        return canvas.height - player.height() - random + 30;
    };



    enemy.context = context;

    enemy.image = new Image();
    enemy.image.src = source;


    enemy.width = function() {
        return enemy.image.width === undefined ? 0 : enemy.image.width * scale;
    };

    enemy.height = function() {
        return enemy.image.height === undefined ? 0 : enemy.image.height * scale;
    };


    enemy.initialPosition = canvas.width - enemy.width();
    enemy.y = enemy.randomlyGenerateY();


    enemy.x = enemy.initialPosition;

    enemy.collided = false;
    enemy.onScreen = false;


    this.update = function (tick, player) {
        enemy.collided = enemy.hasCollided(player);

        if (enemy.collided)
            onCollision(enemy);

        enemy.onScreen = isOnScreen(canvas, enemy.image, enemy.x);
        enemy.x = (enemy.initialPosition - (6 * (tick - startTime)));
        this.draw();
    };

    this.draw = function () {
        context.drawImage(enemy.image, enemy.x, enemy.y, enemy.height(), enemy.width());
    };

    this.hasCollided = function (player) {
        return (enemy.x < player.x + (player.width() / 2) &&
            enemy.x + (enemy.width() / 2) > player.x &&
            enemy.y < player.y + (player.height() / 2) + 50 &&
            (enemy.height()) + enemy.y > player.y);
    };

    this.shouldRecycle = function () {
        return !isOnScreen(canvas, enemy.image, enemy.x) || enemy.collided;
    };
}
