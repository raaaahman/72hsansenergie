var map, mapLayer, lights, sprites, player, enemy, torch, path, cursors, actionButton, enemyCallback
var runaway

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

		/*Tiles from 1 to 26: walls
		*	27 : dark floor
		* 28 : monster spawn
		* 29 : player spawn
		* 30 & 31 : player goals
		* 32 : it's a trap!
		* 33 : vent
		* 34 : blinking light
		* 35 : stable light
		*/

		//MAP
    map = this.add.tilemap(levelName)

    map.addTilesetImage('mazeTiles', 'tiles')

		mapLayer = map.createLayer('mazeLayer')

		lights = map.createBlankLayer('lights', 50, 50, cellSize, cellSize)

		for (var j = 0; j < mapLayer.layer.height; j++) {
			for (var i = 0; i < mapLayer.layer.width; i++) {

				switch (mapLayer.layer.data[j][i].index) {
					case 28:
						enemy = new Entity(game, cellSize * (i + 0.5), cellSize * (j + 0.5), 'dude', 180, this.enemyCallback)
						map.putTile(27, i, j, mapLayer)
						break
					case 29:
						player = new Entity(game, cellSize * (i + 0.5), cellSize * (j + 0.5), 'dude', 150, this.playerCallBack)
						map.putTile(35, i, j, mapLayer)
						break
					case 32:
						//Temporary, for we don't have traps now
						map.putTile(27, i, j, mapLayer)
						break
					case 34: //Temporary, no differencies between lights
					case 35:
						map.putTile(27, i, j, lights)
						break
					default:
						break
				}
			}
		}

		mapLayer.scale.set(scale)
		lights.scale.set(scale)

		mapLayer.resizeWorld()



		this.physics.startSystem(Phaser.Physics.ARCADE)

		path = new PathFinder(map)


		runaway = 0
		
		path.displayGrid()

		sprites = this.add.group()
		sprites.addChild(lights)

		sprites.scale.set(scale);

		//ENEMY
		//enemy = new Entity(game, cellSize * 2.5, cellSize * 1.5, 'dude', 180, this.enemyCallback)
		sprites.addChild(enemy)
		enemy.anchor = {x: 0.5, y: 0.33}
		this.physics.enable(enemy, Phaser.Physics.ARCADE)
		enemy.animations.add('left', [0, 1, 2, 3], 10, true)
		enemy.animations.add('turn', [4], 20, true)
		enemy.animations.add('right', [5, 6, 7, 8], 10, true)

		enemyCallback = this.enemyCallback

		//TORCH
		torch = this.add.sprite(cellSize * 1.5, cellSize * 1.5, 'torch')
		torch.animations.add('full', [2])
		torch.animations.add('off', [0])
		torch.animations.add('low', [1])
		sprites.addChild(torch)
		//torch.moveUp()
		torch.anchor = {x: 0.5, y: 0.5}

		//Lighted tiles
		lights.bringToTop()

		//PLAYER
    //player = new Entity(game, cellSize * 1.5, cellSize * 1.5, 'dude', 150, this.playerCallBack)
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

			//If monster is in the light beam:
			if(monsterDistance2 < scopeThreshold2 && Math.abs(monsterAngle - viewAngle) < angleThreshold)
			{
				//Monster is confused and run away (10 steps):

				if(runaway < 3)
					runaway = 10
				//console.log("RUNAWAY!!")
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
	
	//Function called when the enemy use a tp:
	enemyEntersTp(x,y){
		
		//TODO: hide the monster!
		
		console.log("Enemy enters in the TP!");
		
		//Move the monster to the given coordinates:
		enemy.targetX = x
		enemy.targetY = y
		
		enemy.body.x = x * cellSize
		enemy.body.y = y * cellSize
		
		//Plan the exit of the Tp (a few seconds later):
		setTimeout(enemyQuitsTp, 2000 + Math.random()*2000);
	}
	
	
	//Function called when the enemy get out of a tp:
	enemyQuitsTp(){
		
		//TODO: display the monster!
		
		console.log("Enemy quits the TP!");
		
		//Resume the monster's behavior:
		enemyCallback();
	}

	enemyCallback () {

		//Enemy track the player. With high probability, the monster is able
		//to find the precise location of the player:
		if(Math.random() < 0.7)
			path.computeDistances(player.targetX, player.targetY)

		
		var dir = 4 //default dir is 4 (4 means 'NONE').
		
		//If the monster is running away:

		if(runaway > 0)
		{
			//Monster tries to avoid player:
			dir = path.worstDir(enemy.targetX, enemy.targetY)
			//console.log("Monster is Running Away! RunAwayCounter=",runaway)
			runaway--
			//console.log("Monster is Running Away! RunAwayCounter=",runaway)
		}
		else
		{
			//Monster try to catch player:
			dir = path.bestDir(enemy.targetX, enemy.targetY)
			//console.log("Monster is Tracking the Player! RunAwayCounter=",runaway);
		}

		if(dir < 4)
		{

			if(path.useTp)
			{
				console.log("Monster use TP!");
				//The monster tries to use a TP so don't move immediately:
				var x = path.coordX(path.tpPos)
				var y = path.coordY(path.tpPos)
				enemyEntersTp(x,y)
			}
			else
			{
				//console.log("Monster Regular move!");
				//Regular move:
				//console.log('enemy move ',dirNum[dir]);

				enemy.move(dirNum[dir])
			}
		}
		else
		{
			//console.log("Monster has lost the player! Waiting...");
			//No moves done, wait a little, then try again!
			setTimeout(enemyCallback, 250 + Math.random()*500);
		}
	}

	playerCallback() {

		//Load a new level
		if (player.tileType == 30) {
			if (currentLevel < LEVEL_MAX) {

				torch.visible = false

				this.runaway = 20

				currentLevel++
				setTimeout(
					function () {
						game.state.start('Main')
					},
					1500
				)
			}

		}
	}


}

var main = new Main()
