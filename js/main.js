$(document).ready(function () {
    var canvas = document.getElementById("game");
    var gameManager = new GameManager(canvas);

    window.addEventListener("orientationchange", function() {
        if (window.orientation === 90 || window.orientation === -90) {
            alert("wait")
        } else {
            alert("hi");
        }
    });

    gameManager.startGame();
});
