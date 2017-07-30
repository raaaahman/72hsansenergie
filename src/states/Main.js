
var map, mapLayer, ground, walls, light, sprites, player, enemy, torch, path, cursors, actionButton, enemyCallback

var currentLevel = 1
const LEVEL_MAX = 5

const DIR = {
	NONE: {x: 0, y: 0},
	LEFT: {x: -1, y: 0},
	RIGHT: {x: 1, y: 0},
	DOWN: {x: 0, y: 1},
	UP: {x: 0, y: -1}
}

const dirNum = [
	'UP',
	'DOWN',
	'LEFT',
	'RIGHT',
	'NONE'
]

var scale = 1

var cellSize = 377 * scale



class Main extends Phaser.State {

	create () {
		this.stage.backgroundColor = '#220022'

		//Select the level
		var levelName = 'level' + currentLevel

		//Creating the map and the layers
    map = this.add.tilemap(levelName)

    map.addTilesetImage('mazeTiles', 'tiles')

		mapLayer = map.createLayer('mazeLayer')

		mapLayer.scale.set(scale)

		mapLayer.resizeWorld()

		this.physics.startSystem(Phaser.Physics.ARCADE)

		path = new PathFinder(map)

		enemyCallback = this.enemyCallback

		path.displayGrid()

		sprites = this.add.group()

		sprites.scale.set(scale);

		enemy = new Entity(game, cellSize * 2.5, cellSize * 1.5, 'dude', 180, this.enemyCallback)
		sprites.addChild(enemy)
		enemy.anchor = {x: 0.5, y: 0.33}
		this.physics.enable(enemy, Phaser.Physics.ARCADE)
		enemy.animations.add('left', [0, 1, 2, 3], 10, true)
		enemy.animations.add('turn', [4], 20, true)
		enemy.animations.add('right', [5, 6, 7, 8], 10, true)


		//Add torch
		torch = this.add.sprite(cellSize * 1.5, cellSize * 1.5, 'torch')
		torch.animations.add('full', [2])
		torch.animations.add('off', [0])
		torch.animations.add('low', [1])
		sprites.addChild(torch)
		torch.bringToTop()
		torch.anchor = {x: 0.5, y: 0.5}

    player = new Entity(game, cellSize * 1.5, cellSize * 1.5, 'dude')
		player.anchor = {x: 0.5, y: 0.33}
		sprites.addChild(player)
		player.bringToTop()
    this.physics.enable(player, Phaser.Physics.ARCADE)
		player.animations.add('left', [0, 1, 2, 3], 10, true)
    player.animations.add('turn', [4], 20, true)
    player.animations.add('right', [5, 6, 7, 8], 10, true)
		cursors = this.input.keyboard.createCursorKeys()
    actionButton = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR)




		//Examples of binding events to enter tile function

		//player.setTrigger(2, this.enteredCorridor, this)

		player.move('UP')
		path.computeDistances(player.targetX, player.targetY)
		this.enemyCallback();


		game.camera.follow(player, Phaser.Camera.FOLLOW_LOCKON, 0.1, 0.1);
	}

	update() {

		player.checkPos()
		enemy.checkPos()
		torch.x = player.x
		torch.y = player.y

		if (cursors.left.isDown) {
			player.move('LEFT')
		}
		else if (cursors.right.isDown) {
			player.move('RIGHT')
		}
		else if (cursors.up.isDown) {
			player.move('UP')
		}
		else if (cursors.down.isDown) {
			player.move('DOWN')
		}



		//console.log(game.input.mousePointer.worldX, game.input.mousePointer.worldY)
		var mouse = game.input.mousePointer
		var viewAngle = Math.atan2(mouse.worldY - player.body.y, mouse.worldX - player.body.x)
		player.rotation = viewAngle


		if (mouse.isDown) {
			torch.animations.play('full')
			torch.rotation = viewAngle

			var monsterAngle = Math.atan2(enemy.y - player.y, enemy.x - player.x)

			var dx = enemy.x - player.x
			var dy = enemy.y - player.y
			var monsterDistance2 = dx*dx + dy*dy

			var scopeThreshold2 = cellSize*cellSize*4
			var angleThreshold = Math.PI * 0.1

			if(monsterDistance2 < scopeThreshold2 && Math.abs(monsterAngle - viewAngle) < angleThreshold)
			{
				console.log("Aie, ça fait mal!!!!");
			}

		}
			else
				torch.animations.play('off')

	}

	/*render () {
		game.debug.body(player)
	}*/

	enteredCorridor() {
		console.log("It's a corridor")
	}

	enemyCallback () {

		if(Math.random() < 0.7)
			path.computeDistances(player.targetX, player.targetY)
		var dir = path.bestDir(enemy.targetX, enemy.targetY)

		if(dir < 4)
		{
			console.log('enemy move ',dirNum[dir]);
			enemy.move(dirNum[dir])
		}
		else
		{
			 setTimeout(enemyCallback, 250 + Math.random()*500);
		}
	}

}

var main = new Main()
