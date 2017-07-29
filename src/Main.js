var map, ground, walls, light, layer

class Main extends Phaser.State {

	create () {
		game.stage.backgroundColor = '#220022'

		//Creating the map and the layers
    map = game.add.tilemap('mazeMap')

    map.addTilesetImage('mazeTiles', 'tiles')

    ground = map.createLayer('background')

		walls = map.createLayer('walls')

		light = map.createLayer('foreground')

	}

	update() {

	}
}

var main = new Main()
