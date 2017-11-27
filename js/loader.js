/**
 * 加载资源
 */
var loaderState = function (game) {
	var progressText, logo1, logo2
	this.init = function () {
		logo1 = game.add.image(0, 50, 'logo1');
		logo1.x = (game.world.width - logo1.width) / 2
		logo2 = game.add.image(0, 0, 'logo2');
		logo2.x = (game.world.width - logo2.width) / 2
		logo2.y = game.world.height - logo2.height * 4
		progressText = game.add.text(0, logo2.y + logo2.height+10, '0%  ', { fill: '#fff', font: '28px 楷体', align: "center" });
		progressText.x = (game.world.width - progressText.width) / 2
		loading_line = game.add.tileSprite(100, game.world.centerY + 360, 0, 140, 'loading_line')
		loading_line.scale.set(.2)
		game.add
			.tween(logo2)
			.to({ alpha: 0.2 }, 1200, 'Linear', true, 1000, 9999, true)
	}
	this.preload = function () {

		game.load.audio('children_mp3', ['images/audio/childrenMp3.mp3', 'images/audio/childrenMp3.ogg'])
		game.load.audio('cxzj_mp3', ['images/audio/cxzjMp3.mp3', 'images/audio/cxzjMp3.ogg'])
		game.load.audio('mlsw_mp3', ['images/audio/mlswMp3.mp3', 'images/audio/mlswMp3.ogg'])
		game.load.audio('talk_mp3', ['images/audio/talkMp3.mp3', 'images/audio/talkMp3.ogg'])
		game.load.atlasXML('click', 'images/elf-click/click.png', 'images/elf-click/click.xml')
		game.load.atlasXML('smoke', 'images/elf-smoke/smoke.png', 'images/elf-smoke/smoke.xml')
		game.load.atlasXML('flag', 'images/elf-flag/flag.png', 'images/elf-flag/flag.xml')
		game.load.atlasXML('lamp1', 'images/elf-lamp1/lamp.png', 'images/elf-lamp1/lamp.xml')
		game.load.atlasXML('lamp2', 'images/elf-lamp2/lamp.png', 'images/elf-lamp2/lamp.xml')
		game.load.image('outer', 'images/01.jpg');
		game.load.image('xiaoer', 'images/xiaoer.png');
		game.load.image('text_bg', 'images/text_bg.png');
		game.load.image('notice', 'images/notice.png');
		game.load.image('cha', 'images/cha.png');
		game.load.image('text1', 'images/text1.png');
		game.load.image('text2', 'images/text2.png');
		game.load.image('text3', 'images/text3.png');
		game.load.image('text4', 'images/text4.png');
		game.load.image('text5', 'images/text5.png');
		game.load.image('text6', 'images/text6.png');
		game.load.image('t1206', 'images/1206.jpg');
		game.load.image('t1334', 'images/1334.jpg');
		game.load.image('content', 'images/03.jpg');
		game.load.onFileComplete.add(function (progress) {
			progressText.text = progress + '%';
			loading_line.width += 111
		});
	}
	this.create = function () {
		progressText.text = '点击进入'
		progressText.x = (game.world.width - progressText.width) / 2
		game.input.onTap.add(function () {
			// game.state.add('content', contentState)
			// game.state.start('content')
			game.state.add('main', mainState)
			game.state.start('main')
			progressText.destroy()
			logo1.destroy()
			logo2.destroy()
			loading_line.destroy()
		}, this);
		// console.log(a)


	}
}
