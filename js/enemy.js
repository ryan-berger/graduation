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
    enemy.width = 0;
    enemy.height = 0;


    this.randomlyGenerateY = function() {
        return Math.floor(Math.random() * 2) === 0 ? enemy.generateHighY() : enemy.generateLowY();
    };

    this.generateHighY = function() {
        console.log("High");
        return canvas.height - randomIntFromInterval(player.height, 277);
    };

    this.generateLowY = function() {
        console.log("low");
        return canvas.height - randomIntFromInterval(0, 277 - player.height);
    };



    enemy.context = context;

    enemy.image = new Image();
    enemy.image.src = source;


    enemy.image.onload = function (ev) {
      enemy.width = enemy.image.width * scale;
      enemy.height = enemy.image.width * scale;
    };


    enemy.initialPosition = canvas.width - enemy.image.width;
    enemy.y = enemy.randomlyGenerateY();

    console.log(enemy.y);

    enemy.x = enemy.initialPosition;

    enemy.collided = false;
    enemy.onScreen = false;


    this.update = function (tick, player) {
        enemy.collided = enemy.hasCollided(player);

        if (enemy.collided)
            onCollision(enemy);

        enemy.onScreen = isOnScreen(canvas, enemy.image, enemy.x);
        enemy.x = (enemy.initialPosition - (4 * (tick - startTime)));
        this.draw();
    };

    this.draw = function () {
        context.drawImage(enemy.image, enemy.x, enemy.y, enemy.height, enemy.width);
    };

    this.hasCollided = function (player) {
        return (enemy.x < player.x + (player.width / 2) &&
            enemy.x + (enemy.width / 2) > player.x &&
            enemy.y < player.y + player.height &&
            enemy.height + enemy.y > player.y);
    };

    this.shouldRecycle = function () {
        return !isOnScreen(canvas, enemy.image, enemy.x) || enemy.collided;
    };
}
