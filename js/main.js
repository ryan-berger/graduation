$(document).ready(function () {
    var canvas = document.getElementById("game");
    var gameManager = new GameManager(canvas);

    window.addEventListener("orientationchange", function() {
        if (window.orientation === 90 || window.orientation === -90) {
            alert("starting game");
            gameManager.startGame()
        } else {
            gameManager.pauseGame()
        }
    });

    if ($(window).width() <= 500 && !(window.orientation === 90 || window.orientation === -90)) {

    } else {
        gameManager.startGame()
    }
});
