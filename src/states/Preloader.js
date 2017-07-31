class Preloader extends Phaser.State {
	preload() {
		game.load.tilemap('mazeMap', 'Ressources/map0.json', null, Phaser.Tilemap.TILED_JSON)
		game.load.tilemap('level1', 'Ressources/lvl1/Lvl1.json', null, Phaser.Tilemap.TILED_JSON)
		game.load.tilemap('level2', 'Ressources/lvl2/lvl2.json', null, Phaser.Tilemap.TILED_JSON)
		game.load.tilemap('level3', 'Ressources/lvl3/lvl3.json', null, Phaser.Tilemap.TILED_JSON)
		game.load.tilemap('level4', 'Ressources/lvl4/lvl4.json', null, Phaser.Tilemap.TILED_JSON)
		game.load.tilemap('level4', 'Ressources/lvl4/lvl4.json', null, Phaser.Tilemap.TILED_JSON)

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
