var map, ground, walls, light, player, cursors, actionButton

class Main extends Phaser.State {

	create () {
		game.stage.backgroundColor = '#220022'

		//Creating the map and the layers
    map = game.add.tilemap('mazeMap')

    map.addTilesetImage('mazeTiles', 'tiles')

    ground = map.createLayer('background')

		walls = map.createLayer('walls')

		light = map.createLayer('foreground')




		game.physics.startSystem(Phaser.Physics.ARCADE)
    game.time.desiredFps = 30
    player = game.add.sprite(32, 32, 'dude')
    game.physics.enable(player, Phaser.Physics.ARCADE)
    player.body.setSize(20, 32, 5, 16)
		player.animations.add('left', [0, 1, 2, 3], 10, true)
    player.animations.add('turn', [4], 20, true)
    player.animations.add('right', [5, 6, 7, 8], 10, true)
		cursors = game.input.keyboard.createCursorKeys()
    actionButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR)
	}

	update() {

		player.body.velocity.x = 0;
		player.body.velocity.y = 0;

		if (cursors.left.isDown)
			player.body.velocity.x = -150
		else if (cursors.right.isDown)
			player.body.velocity.x = 150
		else if (cursors.up.isDown)
			player.body.velocity.y = -150
		else if (cursors.down.isDown)
			player.body.velocity.y = 150

		if (actionButton.isDown)
			console.log("action!")
	}

}

var main = new Main()
