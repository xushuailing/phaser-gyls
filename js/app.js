var game = new Phaser.Game(750, 1206, Phaser.AUTO, 'container')

game.state.add('boot', bootState)
game.state.start('boot')

/* 调位置 */
function key(name) {
    name.inputEnabled = true;
    name.input.enableDrag();
    name.events.onDragStop.add(function () {
        console.log("x:" + name.x + "," + name.y);
    }, this);
}

