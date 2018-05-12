

function drawRectangle(canvas, context) {
    var x = canvas.width - (canvas.width / 8) - 300;
    var y = (canvas.height / 8);
    context.fillRect(x, y, 300, 30)
}


$(document).ready(function () {
    var canvas = document.getElementById("game");

    canvas.width = document.body.clientWidth;
    canvas.height = document.body.clientHeight;
    var context = canvas.getContext("2d");

    var ryan = new Ryan("/img/sprite.gif", canvas, context);
    var enemyManager = new EnemyManager(ryan);
    var ticks = 0;

    setInterval(function () {
        context.clearRect(0, 0, canvas.width, canvas.height);
        ticks++;

        drawRectangle(canvas, context);


        ryan.draw(ticks);
        enemyManager.draw(ticks);

        if (ticks % 100 === 0) {
            enemyManager.new(canvas, context, ticks);
        }

    }, 10);

    $(window).keydown(function () {
        ryan.jump(ticks)
    })

    $(window).touchstart(function () {
        ryan.jump(ticks)
    })
});
