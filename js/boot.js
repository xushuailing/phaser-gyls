/**
 * 引动页面
 */
var bootState = function (game) {

    this.init = function () {
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL
        game.scale.scaleMode = Phaser.ScaleManager.EXACT_FIT;
        // game.stage.setBackgroundColor(0xffffff);
        game.scale.pageAlignVertically = true;
        game.scale.pageAlignHorizontally = true;
    }
    this.preload = function () {
        game.load.image('logo1', 'images/logo1.png');
		game.load.image('logo2', 'images/logo2.png');
		game.load.image('loading_line', 'images/loading_line.png');
    }
    this.create = function () {
        game.state.add('loader', loaderState)
        game.state.start('loader');
        shareOption({
			title: '这城中居然还有江湖酒馆？',
			link: 'http://saas.zeego.cn/Project/GYLS/',
			pic: 'http://saas.zeego.cn/Project/GYLS/images/logo2.png',
            desc: '江湖酒馆与您相约10月14,15日，咱们江湖见！',
			success: function() {
				// 成功回调
			},
			cancel: function() {
				// 失败回调
			}
		})
    }
}