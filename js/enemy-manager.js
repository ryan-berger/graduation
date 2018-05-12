function EnemyManager(player) {
    var enemyManager = this;

    enemyManager.entityList = new Array(50);

    var id = -1;

    this.new = function (canvas, context, tick, onRecycle) {
        if (id === 9) {
            id = -1;
        }

        var enemyType = Math.floor(Math.random() * 2) === 0 ? "/img/book.gif" : "/img/soda.gif";
        enemyManager.entityList[++id] = new Enemy(id, enemyType, canvas, context, tick, function () {
            console.log("collision!");
        })
    };

    this.draw = function (tick) {
        for (var i = 0; i < enemyManager.entityList.length; i++) {
            var entity = enemyManager.entityList[i];
            if (entity !== undefined && !entity.shouldRecycle()) {
                enemyManager.entityList[i].update(tick, player);
            }
        }
    };
}
