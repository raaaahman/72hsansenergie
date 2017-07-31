
var map, mapLayer, lights, sprites, player, playerHead, enemy, torch, path, cursors, actionButton, enemyCallback, gameSpeed = 200, difficulty = 1.2

/*var pauseMenu = {
	x: 400,
	y: 300,
	width: 200,
	height: 120,
	unpauseButton: ''
}*/

var runaway
var AlienInSound, AlienOutSound, AlienMoveSound, AlienNearSound, AlienNear2Sound
var AlienNoise1Sound
var PlayerMoveSound, LampSound, lampIsPlaying
var ElectricSound
var HearthSound
var ObjectifLightSound

//HUD:
var needle, gauge, hud, hudCoordinates, circle, gauge, needle


var currentLevel = 1
const LEVEL_MAX = 5

const DIR = {
    NONE: { x: 0, y: 0 , angle: 42},
    LEFT: { x: -1, y: 0, angle: 0},
    RIGHT: { x: 1, y: 0, angle: 180},
    DOWN: { x: 0, y: 1, angle: -90},
    UP: { x: 0, y: -1, angle: 90}
}

const dirNum = [
	'UP',
	'DOWN',
	'LEFT',
	'RIGHT',
	'NONE'
]

var scale = 1

var cellSize = 128 * scale



class Main extends Phaser.State {

    create() {
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
						enemy = new Entity(game, cellSize * (i + 0.5), cellSize * (j + 0.5), 'alien', gameSpeed * difficulty, this.enemyCallback)
						map.putTile(27, i, j, mapLayer)
						break
					case 29:
						player = new Entity(game, cellSize * (i + 0.5), cellSize * (j + 0.5), 'BodyBot', gameSpeed, this.playerCallback)
						playerHead = this.add.image(cellSize * (i + 0.5), cellSize * (j + 0.5), 'HeadBot')
						map.putTile(35, i, j, mapLayer)
						map.putTile(27, i, j, lights)
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

		//path.displayGrid() //Show the grid of the path finder.

		sprites = this.add.group()
		sprites.addChild(lights)

		sprites.scale.set(scale);

    //ENEMY
    //enemy = new Entity(game, cellSize * 2.5, cellSize * 1.5, 'dude', 180, this.enemyCallback)
    sprites.addChild(enemy)
    enemy.anchor.setTo(0.5, 0.5)
    this.physics.enable(enemy, Phaser.Physics.ARCADE)
		enemy.body.setSize(128, 128, 32, 32)
    enemy.animations.add('stand', [1])
    enemy.animations.add('walk', [0, 1, 2], 20, true)
		enemy.play('walk')

    enemyCallback = this.enemyCallback

    //TORCH
    torch = this.add.sprite(cellSize * 1.5, cellSize * 1.5, 'torch')
    torch.animations.add('full', [2])
    torch.animations.add('off', [0])
    torch.animations.add('low', [1])
    sprites.addChild(torch)
    //torch.moveUp()
    torch.anchor.setTo(0.5, 0.5)

    //Lighted tiles
    lights.bringToTop()

    //PLAYER
    //player = new Entity(game, cellSize * 1.5, cellSize * 1.5, 'dude', 150, this.playerCallBack)
    player.anchor.setTo(0.5, 0.5)
    sprites.addChild(player)
    player.bringToTop()
    this.physics.enable(player, Phaser.Physics.ARCADE)

		//Player's head
		playerHead.anchor.setTo(0.5, 0.5)
		playerHead.bringToTop()


    cursors = this.input.keyboard.createCursorKeys()
    actionButton = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR)
		game.input.keyboard.addCallbacks(
			this,
			null,
			this.togglePause
		)


    //player.move('UP')
    path.computeDistances(player.targetX, player.targetY)
    this.enemyCallback();


	//HUD
	hudCoordinates = {x:100,y:550}
    hud = game.add.group()

    gauge = game.add.sprite(0, 0, 'gauge')
    needle = game.add.sprite(0, 0, 'needle')
    circle = game.add.sprite(0, 0, 'circle')

    gauge.anchor.setTo(0.5, 0.5)
    needle.anchor.setTo(0.5, 0.5)
    circle.anchor.setTo(0.5, 0.5)

    game.physics.enable(needle, Phaser.Physics.ARCADE)

    needle.body.angularDrag = 2
    needle.angle = 60

    hud.addChild(gauge)
    hud.addChild(needle)
    hud.addChild(circle)

    hud.fixedToCamera = true

	hud.setAll('x',hudCoordinates.x)
	hud.setAll('y',hudCoordinates.y)


    // Sound Initialisation
    AlienInSound = game.add.audio('AlienIn');
    AlienOutSound = game.add.audio('AlienOut');
    AlienMoveSound = game.add.audio('AlienMove');
    AlienNoise1Sound = game.add.audio('AlienNoise1');
    AlienNearSound = game.add.audio('AlienNear');
    AlienNear2Sound = game.add.audio('AlienNear2');
    PlayerMoveSound = game.add.audio('PlayerMove');
    ElectricSound = game.add.audio('ElectricSound');
    HearthSound = game.add.audio('HearthSound');
    ObjectifLightSound = game.add.audio('ObjectifLight');
    LampSound = game.add.audio('Lamp');
    //don't know if i'll keep it
    /* HearthSound.play();
     HearthSound.loop = true;
    */

    if (PlayerMoveSound != undefined)
    {
        PlayerMoveSound.loop = true;
        PlayerMoveSound.play();
        PlayerMoveSound.pause();
    }
    lampIsPlaying = 0;

    game.camera.follow(player, Phaser.Camera.FOLLOW_LOCKON, 0.1, 0.1);
	}

    update() {

				this.physics.arcade.overlap(player, enemy, this.resetGame, this.checkRunaway)

        var dx = enemy.x - player.x
        var dy = enemy.y - player.y
        var monsterDistance2 = dx * dx + dy * dy

        player.checkPos()
        enemy.checkPos()

        playerHead.x = player.x
        playerHead.y = player.y
				torch.x = playerHead.x
				torch.y = playerHead.y

        //random electric sound
        if (Math.random() < 0.001) {
            if (ElectricSound != undefined && !ElectricSound.isPlaying)
                ElectricSound.play();
        }

        if (cursors.left.isDown) {
            player.move('LEFT')
            if (PlayerMoveSound != undefined)
                PlayerMoveSound.resume();
        }
        else if (cursors.right.isDown) {
            player.move('RIGHT')
            if (PlayerMoveSound != undefined)
                PlayerMoveSound.resume();
        }
        else if (cursors.up.isDown) {
            player.move('UP')
            if (PlayerMoveSound != undefined)
                PlayerMoveSound.resume();
        }
        else if (cursors.down.isDown) {
            player.move('DOWN')
            if (PlayerMoveSound != undefined)
                PlayerMoveSound.resume();
        }
        else {
            if (PlayerMoveSound != undefined)
                PlayerMoveSound.pause();
        }


        //Alien Sound
        if (monsterDistance2 < 100000) {
            if (AlienMoveSound != undefined && !AlienMoveSound.isPlaying)
                AlienMoveSound.play();
        }
        else {
            if (AlienMoveSound != undefined)
                AlienMoveSound.pause();
        }

        //console.log(game.input.mousePointer.worldX, game.input.mousePointer.worldY)
        var mouse = game.input.mousePointer
        var viewAngle = Math.atan2(mouse.worldY - player.y, mouse.worldX - player.x)

        playerHead.rotation = viewAngle



      if (mouse.isDown && player.alive && needle.angle > -60) {

      	//Update HUD:
      	if((player.tileType != 35) && (player.tileType != 34))
      		needle.body.angularVelocity = -5;

          if (!LampSound.isPlaying && lampIsPlaying == 0)
            LampSound.play();

            torch.animations.play('full')
            torch.rotation = viewAngle

            var monsterAngle = Math.atan2(enemy.y - player.y, enemy.x - player.x)

            var scopeThreshold2 = cellSize * cellSize * 4
            var angleThreshold = Math.PI * 0.1

            //If monster is in the light beam:
            if (monsterDistance2 < scopeThreshold2 && Math.abs(monsterAngle - viewAngle) < angleThreshold) {
                //Monster is confused and run away (10 steps):

            if (AlienNear2Sound != undefined && !AlienNear2Sound.isPlaying)
                    AlienNear2Sound.play();

            if (runaway < 3)
                runaway = 10
            //console.log("RUNAWAY!!")
            }
            lampIsPlaying = 1;
        }
        else {
            if (LampSound != undefined)
                LampSound.pause();
            lampIsPlaying = 0;
            torch.animations.play('off')
        }



        //Update HUD:
        if(needle.angle > 60)
	    needle.angle = 60

	    if(needle.angle < -60)
	        needle.angle = -60



    }

  /*render () {
		game.debug.bodyInfo()
	}*/

    enteredCorridor() {
        console.log("It's a corridor")
    }

    //Function called when the enemy use a tp:
    enemyEntersTp(x, y) {


        //TODO: hide the monster!

        if (AlienInSound != undefined)
            AlienInSound.play();

        //Move the monster to the given coordinates:
        enemy.targetX = x
        enemy.targetY = y

        enemy.body.x = x * cellSize
        enemy.body.y = y * cellSize

        //Plan the exit of the Tp (a few seconds later):
        setTimeout(enemyQuitsTp, 2000 + Math.random() * 2000);
    }


    //Function called when the enemy get out of a tp:
    enemyQuitsTp() {


        //TODO: display the monster!

        console.log("Enemy quits the TP!");
        if (AlienOutSound != undefined)
            AlienOutSound.play();
        //Resume the monster's behavior:
        enemyCallback();
    }

    enemyCallback() {

        //Enemy track the player. With high probability, the monster is able
        //to find the precise location of the player:
        if (Math.random() < 0.7)
            path.computeDistances(player.targetX, player.targetY)

        var dir = 4 //default dir is 4 (4 means 'NONE').

        //If the monster is running away:

        if (runaway > 0) {
            //Monster tries to avoid player:
            dir = path.worstDir(enemy.targetX, enemy.targetY)
            //console.log("Monster is Running Away! RunAwayCounter=",runaway)
            runaway--
            //console.log("Monster is Running Away! RunAwayCounter=",runaway)
        }
        else {
            //Monster try to catch player:
            dir = path.bestDir(enemy.targetX, enemy.targetY)
            //console.log("Monster is Tracking the Player! RunAwayCounter=",runaway);
        }

        if (dir < 4) {


          if (path.useTp) {
              console.log("Monster use TP!");
              //The monster tries to use a TP so don't move immediately:
              var x = path.coordX(path.tpPos)
              var y = path.coordY(path.tpPos)
              //Alien tp sound
              if (AlienInSound != undefined && !AlienInSound.isPlaying)
                  AlienInSound.play();
              enemyEntersTp(x, y)
          }
          else {
              //console.log("Monster Regular move!");
              //Regular move:
              //console.log('enemy move ',dirNum[dir]);

              enemy.move(dirNum[dir])
              //Alien random sound
              if (Math.random() < 0.3) {
                  if (AlienNoise1Sound != undefined && !AlienNoise1Sound.isPlaying)
                      AlienNoise1Sound.play();
              }
              else if (Math.random() > 0.95) {
                  if (Math.random() > 0.98) {
                      if (AlienNearSound != undefined && !AlienNearSound.isPlaying)
                          AlienNearSound.play();
                  }
              }
          }
      }
      else {
          //console.log("Monster has lost the player! Waiting...");
          //No moves done, wait a little, then try again!
          game.time.events.add(250 + Math.random() * 500, enemyCallback, this);
      }
  }

  playerCallback() {


	    //Load a new level
	    if (player.tileType == 30) {
	        if (currentLevel < LEVEL_MAX) {

	            torch.visible = false

	            runaway = 20

	            currentLevel++

	            game.time.events.add(Phaser.Timer.SECOND * 1.5, game.state.start, game.state, 'Main')
	        }

				game.time.events.add(1500, game.state.start, game.state, 'Main')
			}


		//Charge torch if on light tile:
		if( (player.tileType  == 35 || player.tileType  == 34) && needle.angle <= 60)
	    {
	    	console.log("UPDATE!!");
	        needle.body.angularVelocity = 10;
	    }

    }

	checkRunaway () {
		return runaway == 0
	}

	resetGame() {
		player.visible = false
		player.alive = false
		playerHead.visible = false

		runaway = 5

		currentLevel = 1
		game.time.events.add(750, game.state.start, game.state, 'Main')
	}
	/*
	Disabled
	handleMouseClick () {
		console.log("click!")
		if (game.paused &&
		game.input.mousePointer.x > pauseMenu.x &&
		game.input.mousePointer.x < pauseMenu.x + pauseMenu.width &&
		game.input.mousePointer.y > pauseMenu.y &&
		game.input.mousePointer.y < pauseMenu.y + pauseMenu.height) {
			this.togglePause(32)
		}
	}
	*/

	togglePause (control) {

		console.log(control.keyCode)
		if (control === Phaser.KeyCode.SPACEBAR
			|| control.keyCode === Phaser.KeyCode.SPACEBAR) {
			if (game.paused == true) {
				game.paused = false

				//Erase pause menu
				//pauseMenu.unpauseButton.destroy()
			}
			else {
				game.paused = true

				//Add the Pause menu
				//pauseMenu.unpauseButton = this.add.text(pauseMenu.x, pauseMenu.y, 'Resume', { font: '48px Arial', fill: '#fff'})
				//sprites.add(pauseMenu.unpauseButton)
				//pauseMenu.unpauseButton.bringToTop()

			}
		}
		}

}

var main = new Main()
