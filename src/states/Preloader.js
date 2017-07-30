class Preloader extends Phaser.State {
	preload() {
		game.load.tilemap('mazeMap', 'Ressources/map0.json', null, Phaser.Tilemap.TILED_JSON)
		game.load.tilemap('level1', 'Ressources/lvl1/Lvl1.json', null, Phaser.Tilemap.TILED_JSON)
		game.load.tilemap('level2', 'Ressources/lvl2/lvl2.json', null, Phaser.Tilemap.TILED_JSON)
		game.load.tilemap('level3', 'Ressources/lvl3/lvl3.json', null, Phaser.Tilemap.TILED_JSON)
		game.load.tilemap('level4', 'Ressources/lvl4/lvl4.json', null, Phaser.Tilemap.TILED_JSON)
		game.load.tilemap('level4', 'Ressources/lvl4/lvl4.json', null, Phaser.Tilemap.TILED_JSON)

		game.load.image('tiles', 'Ressources/tileset.png');

		game.load.spritesheet('dude', 'Ressources/dude.png', 32, 48);
		game.load.images(['torchHigh', 'torchLow'],
			['Ressources/Graphisme/torch/torchHigh.png',
			'Ressources/Graphisme/torch/torchHigh.png'])

	}

	create () {

		console.log('loaded')

		game.state.start('Main')
	}
}

var preloader = new Preloader()
