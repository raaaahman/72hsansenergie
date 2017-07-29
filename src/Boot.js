class Boot extends Phaser.State {
	preload () {

	}

	create () {

		game.state.start('Preloader')
	}
}

var boot = new Boot()
