class Preloader extends Phaser.State {
	preload() {
		game.load.tilemap('level1', 'Ressources/Niveaux/lvl1.json', null, Phaser.Tilemap.TILED_JSON)
		game.load.tilemap('level2', 'Ressources/Niveaux/lvl2.json', null, Phaser.Tilemap.TILED_JSON)
		game.load.tilemap('level3', 'Ressources/Niveaux/lvl3.json', null, Phaser.Tilemap.TILED_JSON)
		game.load.tilemap('level4', 'Ressources/Niveaux/lvl4.json', null, Phaser.Tilemap.TILED_JSON)
		game.load.tilemap('level5', 'Ressources/Niveaux/lvl5.json', null, Phaser.Tilemap.TILED_JSON)

		game.load.image('tiles', 'Ressources/Graphisme/TileSetCut.png');

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
		game.load.audio('AlienNoise1', ['Ressources/Sound/AlienNoise1.mp3', 'Ressources/Sound/AlienNoise1.ogg']);
		game.load.audio('ObjectifLight', ['Ressources/Sound/ObjectifLight.mp3', 'Ressources/Sound/ObjectifLight.ogg']);
		game.load.audio('Lamp', ['Ressources/Sound/Lamp.mp3', 'Ressources/Sound/Lamp.ogg']);
		
		
		//HUD:
		game.load.image('gauge', 'Ressources/Graphisme/HUD/gauge.png');
	    game.load.image('needle', 'Ressources/Graphisme/HUD/needle.png');
	    game.load.image('circle', 'Ressources/Graphisme/HUD/circle.png');
	}

	create () {

		console.log('loaded')

		game.state.start('Main')
	}
}

var preloader = new Preloader()
