class Boot extends Phaser.State {
	preload () {

	}

	create () {
		game.time.desiredFps = 30
		game.state.start('Preloader')
	}
}

var boot = new Boot()
