var map, ground, walls, light, player, cursors, actionButton

var dir = 0;

//droite = 2
//gauche = 1
//

//haut = 4
//bas = 3

var dirX = [0,-1,1,0,0]
var dirY = [0,0,0,1,-1]
var cellSize = 32
var locked = false

var targetX = 3
var targetY = 2

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
    player = game.add.sprite(targetX*cellSize, targetY*cellSize, 'dude')
    game.physics.enable(player, Phaser.Physics.ARCADE)
		player.animations.add('left', [0, 1, 2, 3], 10, true)
    player.animations.add('turn', [4], 20, true)
    player.animations.add('right', [5, 6, 7, 8], 10, true)
		cursors = game.input.keyboard.createCursorKeys()
    actionButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR)

		console.log( player.body.x,player.body.y)

		player.body.velocity.x = 0
		player.body.velocity.y = 0

		console.log(player.anchor)
	}


	update() {

		var posx = player.body.x / cellSize
		var posy = player.body.y / cellSize


		if(locked)
		{

			if( ( (posx - targetX) * dirX[dir] > 0) || ( (posy - targetY) * dirY[dir] > 0) )
			{
				player.body.x = targetX * cellSize
				player.body.y = targetY * cellSize
				player.body.velocity.x = 0
				player.body.velocity.y = 0
				locked = false;
				// console.log("Target Reached!")
			}

		}

		if(!locked)
		{
			dir = 0

			if (cursors.left.isDown)
			{
				player.body.velocity.x = -150
				dir = 1
			}
			else if (cursors.right.isDown)
			{
				player.body.velocity.x = 150
				dir = 2
			}
			else if (cursors.up.isDown)
			{
				player.body.velocity.y = -150
				dir = 4
			}
			else if (cursors.down.isDown)
			{
				player.body.velocity.y = 150
				dir = 3
			}

			targetX += dirX[dir]
			targetY += dirY[dir]

			if(dir > 0)
			{
				locked = true;
				// console.log("locked in dir",dir)
				// console.log("New target is",targetX, targetY)
			}
			else
			{
				// console.log("Waiting for input")
			}
		}

		if (actionButton.isDown)
			console.log("action!")
	}

}

var main = new Main()
