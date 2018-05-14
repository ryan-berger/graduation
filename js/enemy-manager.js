function EnemyManager(player, collision, scale) {
    var enemyManager = this;
    enemyManager.scale = scale;
    enemyManager.entityList = new Array(50);

    var id = -1;

    this.new = function (canvas, context, tick) {
        if (id === 49) {
            id = -1;
        }
        var enemyType = generateRandomEnemy();
        enemyManager.entityList[++id] = new Enemy(id, enemyType, enemyManager.scale, canvas, context, tick, collision, player)
    };

    this.draw = function (tick) {
        for (var i = 0; i < enemyManager.entityList.length; i++) {
            var entity = enemyManager.entityList[i];
            if (entity !== undefined && !entity.shouldRecycle()) {
                enemyManager.entityList[i].update(tick, player);
            }
        }
    };

    function generateRandomEnemy() {
        var enemyTypes = [ "/img/bad-grade.gif", "/img/book.gif", "/img/soda.gif"];
        return enemyTypes[getEnemyType()];
    }

    function getEnemyType() {
        var random = Math.random();
        console.log(random);
        if (random >= 0 && random <= .35) {
            return 0;
        } else if(random > .35 && random <= .6) {
            return 1;
        } else {
            return 2;
        }
    }
}
