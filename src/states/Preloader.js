class Preloader extends Phaser.State {
    preload()
    {
		game.load.tilemap('mazeMap', 'Ressources/map0.json', null, Phaser.Tilemap.TILED_JSON)
		game.load.tilemap('level1', 'Ressources/lvl1/Lvl1.json', null, Phaser.Tilemap.TILED_JSON)
		game.load.tilemap('level2', 'Ressources/lvl2/lvl2.json', null, Phaser.Tilemap.TILED_JSON)
		game.load.tilemap('level3', 'Ressources/lvl3/lvl3.json', null, Phaser.Tilemap.TILED_JSON)
		game.load.tilemap('level4', 'Ressources/lvl4/lvl4.json', null, Phaser.Tilemap.TILED_JSON)
		game.load.tilemap('level4', 'Ressources/lvl4/lvl4.json', null, Phaser.Tilemap.TILED_JSON)

		game.load.image('tiles', 'Ressources/Graphisme/tileSet/TileSet.png');

		game.load.spritesheet('dude', 'Ressources/dude.png', 32, 48);
		game.load.spritesheet('torch', 'Ressources/Graphisme/torch/torchMask.png', 2000, 2000)

		game.load.audio('AlienIn', ['Ressources/Sound/AlienIn.mp3', 'Ressources/Sound/AlienIn.ogg']);
		game.load.audio('AlienOut', ['Ressources/Sound/AlienOut.mp3', 'Ressources/Sound/AlienOut.ogg']);
		game.load.audio('AlienMove', ['Ressources/Sound/AlienMove.mp3', 'Ressources/Sound/AlienMove.ogg']);
		game.load.audio('AlienNear', ['Ressources/Sound/AlienNear.mp3', 'Ressources/Sound/AlienNear.ogg']);
		game.load.audio('AlienNear2', ['Ressources/Sound/AlienNear2.mp3', 'Ressources/Sound/AlienNear2.ogg']);
		game.load.audio('PlayerMove', ['Ressources/Sound/PlayerMove.mp3', 'Ressources/Sound/PlayerMove.ogg']);
		game.load.audio('ElectricSound', ['Ressources/Sound/ElectricSound.mp3', 'Ressources/Sound/ElectricSound.ogg']);
		game.load.audio('HearthSound', ['Ressources/Sound/HearthSound.mp3', 'Ressources/Sound/HearthSound.ogg']);
		game.load.audio('AlienNoise', ['Ressources/Sound/AlienNoise1.mp3', 'Ressources/Sound/AlienNoise1.ogg']);

    }

	create () {

		console.log('loaded')

		game.state.start('Main')
	}
}

var preloader = new Preloader()
