class Preloader extends Phaser.State {
	preload() {
		game.load.tilemap('mazeMap', 'Ressources/map0.json', null, Phaser.Tilemap.TILED_JSON)
		game.load.tilemap('level1', 'Ressources/Niveaux/lvl1.json', null, Phaser.Tilemap.TILED_JSON)
		game.load.tilemap('level2', 'Ressources/Niveaux/lvl2.json', null, Phaser.Tilemap.TILED_JSON)
		game.load.tilemap('level3', 'Ressources/Niveaux/lvl3.json', null, Phaser.Tilemap.TILED_JSON)
		game.load.tilemap('level4', 'Ressources/Niveaux/lvl4.json', null, Phaser.Tilemap.TILED_JSON)
		game.load.tilemap('level5', 'Ressources/Niveaux/lvl5.json', null, Phaser.Tilemap.TILED_JSON)

		game.load.image('tiles', 'Ressources/Graphisme/tileSet/TileSet.png');

		game.load.spritesheet('dude', 'Ressources/dude.png', 32, 48);
		game.load.spritesheet('torch', 'Ressources/Graphisme/torch/torchMask.png', 2000, 2000)

	}

	create () {

		console.log('loaded')

		game.state.start('Main')
	}
}

var preloader = new Preloader()
