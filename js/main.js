

function drawRectangle(canvas, context, score) {
    var x = canvas.width - (canvas.width / 8) - 300;
    var y = (canvas.height / 8);
    context.fillRect(x, y, 300, 30);

    var adjustedScore = (score / 100) > 1 ? 1 : (score / 100);

    context.fillStyle = "#FFEB3B";
    context.fillRect(x, y, 300 * adjustedScore, 30);

    context.fillStyle = "#000000"
}


$(document).ready(function () {
    var canvas = document.getElementById("game");
    canvas.width = $(window).width();
    canvas.height = $(window).height();
    var context = canvas.getContext("2d");

    var score = 50;

    var ryan = new Ryan("/img/sprite.gif", canvas, context);
    var enemyManager = new EnemyManager(ryan, function () {
        console.log("collision");
        score = (score + 20 > 100) ? 100 : score + 20
    });
    var ticks = 0;
    enemyManager.new(canvas, context, ticks);

    var background = new Image();
    background.src = "/img/school.gif";

    var loaded = false;

    background.onload = function (ev) {
        loaded = true;
    };

// Make sure the image is loaded first otherwise nothing will draw.


    setInterval(function () {
        context.clearRect(0, 0, canvas.width, canvas.height);
        if (loaded) {
            console.log(background);
            context.drawImage(background, 0, canvas.height - background.height, $(window).width(), 600);
        }
        ticks++;

        drawRectangle(canvas, context, score);
        score -= .05;

        ryan.draw(ticks);
        enemyManager.draw(ticks);

        if (ticks % 200 === 0) {
            enemyManager.new(canvas, context, ticks);
        }

    }, 10);

    $(window).keydown(function () {
        ryan.jump(ticks)
    })

    $(window).on("touchstart", function () {
        ryan.jump(ticks)
    })
});
