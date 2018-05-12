function EnemyManager(player, collision) {
    var enemyManager = this;

    enemyManager.entityList = new Array(50);

    var id = -1;

    this.new = function (canvas, context, tick) {
        if (id === 49) {
            id = -1;
        }

        var enemyType = Math.floor(Math.random() * 2) === 0 ? "/img/book.gif" : "/img/soda.gif";
        enemyManager.entityList[++id] = new Enemy(id, enemyType, .5, canvas, context, tick, collision, player)
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
