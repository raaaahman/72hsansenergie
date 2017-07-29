class Preloader extends Phaser.State {
	preload() {

	}

	create () {

		console.log('loaded')

		game.state.start('Main')
	}
}

var preloader = new Preloader()
