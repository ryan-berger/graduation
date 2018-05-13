
function GameManager(canvas) {
    var gameManager = this;
    gameManager.canvas = canvas;
    gameManager.context = canvas.getContext("2d");

    gameManager.calcBooksCollected = 0;
    gameManager.badGradesCollected = 0;
    gameManager.sodasCollected = 0;


    gameManager.startGame = function(reversed) {

        gameManager.canvas.width = $(window).width();
        gameManager.canvas.height = $(window).height();
        gameManager.ticks = 0;
        gameManager.score = 50;

        gameManager.ryan = new Ryan("/img/sprite.gif", canvas, gameManager.context, 1);
        gameManager.enemyManager = new EnemyManager(gameManager.ryan, function (enemy) {
            if (enemy.image.src = "/img/book.gif") {
                gameManager.calcBooksCollected++;
            } else {
                gameManager.sodasCollected++;
            }
        }, 1);

        if (gameManager.canvas.height < 400) {
            gameManager.ryan.scale = .5;
            gameManager.enemyManager.scale = .5;
        }

        window.addEventListener("resize", function() {
            // Get screen size (inner/outerWidth, inner/outerHeight)
            gameManager.canvas.width = $(window).width();
            gameManager.canvas.height = $(window).height();

            console.log(gameManager.canvas.height);

            if (gameManager.canvas.height < 400) {
                gameManager.ryan.scale = .75;
            }

        }, false);



        gameManager.enemyManager.new(canvas, gameManager.context, gameManager.ticks);

        gameManager.background = new Image();
        gameManager.background.src = gameManager.canvas.width > 800 ? "/img/school.gif" : "/img/school-small.gif";


        $(window).keydown(function () {
            gameManager.ryan.jump(gameManager.ticks)
        });

        $(window).on("touchstart", function () {
            gameManager.ryan.jump(gameManager.ticks)
        });

        runGameLoop();

    };

    function runGameLoop() {
        gameManager.interval = setInterval(function () {
            gameManager.context.clearRect(0, 0, canvas.width, canvas.height);
            gameManager.context.drawImage(gameManager.background, 0, 0, $(window).width(), $(window).height());
            gameManager.ticks++;
            if (getGrade() <= 0) {
                clearInterval(gameManager.interval);
            }

            drawHealthBar(canvas, gameManager.context, getGrade());

            gameManager.ryan.draw(gameManager.ticks);
            gameManager.enemyManager.draw(gameManager.ticks);

            if (gameManager.ticks % 200 === 0) {
                gameManager.enemyManager.new(canvas, gameManager.context, gameManager.ticks);
            }

        }, 10);
    }

    this.pauseGame = function () {
        if (gameManager.interval !== undefined) {
            clearInterval(gameManager.interval)
        }
    };



    function drawHealthBar(canvas, context, score) {
        var x = canvas.width - (canvas.width / 8) - 300;
        var y = 0;

        context.fillStyle = "#FFFFFF"
        context.fillRect(x, y, 300, 24);

        var adjustedScore = score / 100;
        context.fillStyle = "#7D1F1F";
        context.fillRect(x, y, 300 * adjustedScore, 24);
        context.fillStyle = "#FFFFFF"
    }

    function getGrade() {
        return 100  + getSodaScore() +  getCalc();
    }

    function getSodaScore() {
        return (gameManager.sodasCollected + 5) + gameManager.ticks * -.005;
    }

    function getCalc() {
        return ((5 * gameManager.calcBooksCollected) - (8 * gameManager.badGradesCollected)) + gameManager.ticks * -.025
    }
}
