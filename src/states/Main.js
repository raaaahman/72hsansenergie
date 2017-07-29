var map, ground, walls, light, player, cursors, actionButton

const DIR = {
	NONE: {x: 0, y: 0},
	LEFT: {x: -1, y: 0},
	RIGHT: {x: 1, y: 0},
	DOWN: {x: 0, y: 1},
	UP: {x: 0, y: -1}
}

var cellSize = 32


class Main extends Phaser.State {

	create () {
		this.stage.backgroundColor = '#220022'

		//Creating the map and the layers
    map = this.add.tilemap('mazeMap')

    map.addTilesetImage('mazeTiles', 'tiles')

    ground = map.createLayer('background')

		walls = map.createLayer('walls')

		light = map.createLayer('foreground')

		this.physics.startSystem(Phaser.Physics.ARCADE)

    player = new Entity(game, 96, 64, 'dude')
    this.physics.enable(player, Phaser.Physics.ARCADE)
		player.animations.add('left', [0, 1, 2, 3], 10, true)
    player.animations.add('turn', [4], 20, true)
    player.animations.add('right', [5, 6, 7, 8], 10, true)
		cursors = this.input.keyboard.createCursorKeys()
    actionButton = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR)

	}

	update() {

		player.getPos()

		player.move()

		if (actionButton.isDown)
			console.log("action!")
	}

}

var main = new Main()
