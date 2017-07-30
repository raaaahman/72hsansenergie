var map, ground, walls, light, player, torch, cursors, actionButton

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

    player = new Entity(game, cellSize * 3.5, cellSize * 2.5, 'dude')
		player.anchor = {x: 0.5, y: 0.33}
    this.physics.enable(player, Phaser.Physics.ARCADE)
		player.animations.add('left', [0, 1, 2, 3], 10, true)
    player.animations.add('turn', [4], 20, true)
    player.animations.add('right', [5, 6, 7, 8], 10, true)
		cursors = this.input.keyboard.createCursorKeys()
    actionButton = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR)


		//Examples of binding events to enter tile function

		//player.setTrigger(2, this.enteredCorridor, this)

		//Add torch
		torch = this.add.sprite(cellSize * 3.5, cellSize * 2.5, 'torchHigh')
		torch.anchor = {x: 0.5, y: 0.5}

	}

	update() {

		player.checkPos()
		torch.x = player.x
		torch.y = player.y

		if (cursors.left.isDown)
			player.move('LEFT')
		else if (cursors.right.isDown)
			player.move('RIGHT')
		else if (cursors.up.isDown)
			player.move('UP')
		else if (cursors.down.isDown)
			player.move('DOWN')

		//console.log(game.input.mousePointer.worldX, game.input.mousePointer.worldY)
		var mouse = game.input.mousePointer
		var viewAngle = Math.atan2(mouse.worldY - player.body.y, mouse.worldX - player.body.x)
		player.rotation = viewAngle
		torch.rotation = viewAngle

		if (mouse.isDown)
			console.log("action!")
	}

	/*render () {
		game.debug.body(player)
	}*/

	enteredCorridor() {
		console.log("It's a corridor")
	}

}

var main = new Main()
