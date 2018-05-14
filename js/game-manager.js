function GameManager(canvas) {
    var gameManager = this;
    gameManager.canvas = canvas;
    gameManager.context = canvas.getContext("2d");

    gameManager.calcBooksCollected = 0;
    gameManager.badGradesCollected = 0;
    gameManager.sodasCollected = 0;

    gameManager.scale = 1;
    gameManager.hasStarted = false;
    gameManager.spawnRate = 1;


    gameManager.startGame = function () {
        gameManager.canvas.width = $(window).width();
        gameManager.canvas.height = $(window).height();
        gameManager.ticks = 0;
        gameManager.score = 100;

        gameManager.ryan = new Ryan("/img/sprite.gif", canvas, gameManager.context, 1);
        gameManager.enemyManager = new EnemyManager(gameManager.ryan, function (enemy) {
            if (enemy.image.src.includes("book.gif")) {
                gameManager.calcBooksCollected++;
            } else if (enemy.image.src.includes("bad-grade.gif")) {
                gameManager.badGradesCollected++;
            } else {
                gameManager.sodasCollected++;
            }

        }, 1);

        if ($(window).height() < 500) {
            gameManager.ryan.scale = .5;
            gameManager.enemyManager.scale = .5;
            gameManager.spawnRate = 2;
        }

        window.addEventListener("resize", function () {
            var windowHeight = $(window).height();
            // Get screen size (inner/outerWidth, inner/outerHeight)
            gameManager.canvas.width = $(window).width();
            gameManager.canvas.height = windowHeight;

            if (windowHeight < 500) {
                gameManager.ryan.scale = .5;
                gameManager.enemyManager.scale = .5;
                gameManager.spawnRate = 2;
            } else {
                gameManager.ryan.scale = 1;
                gameManager.enemyManager.scale = 1;
                gameManager.spawnRate = 1
            }

        }, true);


        gameManager.background = new Image();
        gameManager.background.src = gameManager.canvas.width >= 500 ? "/img/school.gif" : "/img/school-small.gif";


        $(window).keydown(function () {
            gameManager.ryan.jump(gameManager.ticks)
        });

        $(window).on("touchstart", function () {
            gameManager.ryan.jump(gameManager.ticks)
        });

        if (gameManager.hasStarted)
            runGameLoop();
        else
            showTutorial();
    };

    function runGameLoop() {
        gameManager.interval = setInterval(function () {
            gameManager.context.clearRect(0, 0, canvas.width, canvas.height);
            gameManager.context.drawImage(gameManager.background, 0, 0, $(window).width(), $(window).height());
            gameManager.ticks++;
            if (getGrade() <= 0) {
                clearInterval(gameManager.interval);
                $('#loss').css({'display': 'flex', 'height': '100%'});
                navigateAway();
            }

            drawHealthBar(canvas, gameManager.context, getGrade());


            gameManager.ryan.draw(gameManager.ticks);
            gameManager.enemyManager.draw(gameManager.ticks);
            if (gameManager.ticks % Math.floor(111 / gameManager.spawnRate) === 0) {
                gameManager.enemyManager.new(canvas, gameManager.context, gameManager.ticks);
            }

            if (gameManager.ticks / 100 === 30) {
                $('#win').css({'display': 'flex', 'height': '100%'});
                clearInterval(gameManager.interval);
                navigateAway();
            }

        }, 10);
        gameManager.hasStarted = true;
    }

    function showTutorial() {
        $('.tutorial-overlay').css({'display': 'flex', 'height': '100%'});
        $('.tutorial-overlay__ok').click(function () {
            $('.tutorial-overlay').hide();
            runGameLoop();
        })
    }

    function navigateAway() {
        setTimeout(function () {
            window.location.href = "/";
        }, 2000)
    }

    this.pauseGame = function () {
        if (gameManager.interval !== undefined) {
            clearInterval(gameManager.interval)
        }
    };


    function drawHealthBar(canvas, context, score) {
        var x = (canvas.width / 2) - 150;
        var y = 20;

        context.font = "45px Comic Sans MS";
        context.fillStyle = "black";
        context.textAlign = "center";
        context.fillText(getLetterGrade(score), x - 30, 45);


        var adjustedScore = score / 100;
        context.fillStyle = "#7D1F1F";
        context.fillRect(x, y, 300 * adjustedScore, 12);
        context.fillStyle = "#FFFFFF"
    }

    function getGrade() {
        return 100 + getSodaScore() + getCalc();
    }

    function getSodaScore() {
        return (gameManager.sodasCollected * 5) + gameManager.ticks * -.005;
    }

    function getCalc() {
        return ((5 * gameManager.calcBooksCollected) - (10 * gameManager.badGradesCollected)) + gameManager.ticks * -.025
    }

    function getLetterGrade(value) {
        if (value < 5) {
            return "C-";
        }

        if (value < 10) {
            return "C";
        }

        if (value < 15) {
            return "C+";
        }

        if (value < 30) {
            return "B-";
        }

        if (value < 40) {
            return "B";
        }

        if (value < 45) {
            return "B+";
        }


        if (value < 50) {
            return "A-";
        }

        if (value >= 50) {
            return "A";
        }
    }
}
