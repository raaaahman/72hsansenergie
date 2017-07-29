class Preloader extends Phaser.State {
	preload() {
		game.load.tilemap('mazeMap', 'Ressources/map0.json', null, Phaser.Tilemap.TILED_JSON);

		game.load.image('tiles', 'Ressources/tileset.png');

		game.load.spritesheet('dude', 'Ressources/dude.png', 32, 48);

	}

	create () {

		console.log('loaded')

		game.state.start('Main')
	}
}

var preloader = new Preloader()
