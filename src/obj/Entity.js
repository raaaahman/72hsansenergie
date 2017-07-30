class Entity extends Phaser.Sprite {

	constructor(game, startX, startY, img, speed = 150) {
		super(game, startX, startY, img)

		this.locked 	= false
		this.dir 			= 'NONE'
		this.posX			= startX / cellSize
		this.posY			= startY / cellSize
		this.targetX 	= Math.round(this.posX)
		this.targetY 	= Math.round(this.posY)
		this.lastX		= this.targetX
		this.lastY		= this.targetY
		this.isLit		= false	//
		this.tileType	= 0			//These two values would be quickly changed


		this.speed 		= speed

		//Add an event for entering a tile
		this.events.onEnterTile = new Phaser.Signal()

		//Tie the entity to the stage so it gets rendered
		game.state.getCurrentState().stage.addChild(this)
	}

	//Update the entity's coordinates and stats depending on its position
	checkPos () {
		if(this.locked)
		{
			this.posX = this.body.x / cellSize
			this.posY = this.body.y / cellSize
			var cellX = Math.round(this.posX)
			var cellY = Math.round(this.posY)

			this.tileType = map.getTile(cellX, cellY, 'background', true).index

			map.getTile(cellX, cellY, 'foreground', true).index > 0 ? this.isLit = true : this.isLit = false

			//console.log(map.getTile(cellX, cellY, 'foreground', true).index)
			//console.log(this.isLit)

			if (cellX !== this.lastX || cellY !== this.lastY) {
				this.events.onEnterTile.dispatch(this.tileType)

				this.lastX = cellX
				this.lastY = cellY
			}


			if( ( (this.posX - this.targetX) * DIR[this.dir].x > 0) || ( (this.posY - this.targetY) * DIR[this.dir].y > 0) )
			{
				this.body.x = this.targetX * cellSize
				this.body.y = this.targetY * cellSize
				this.body.velocity.x = 0
				this.body.velocity.y = 0
				this.locked = false;
				// console.log("Target Reached!")
			}

		}

	}

	move(dir) {


		if(!this.locked)
		{

			var newTargetX = this.targetX + DIR[dir].x
			var newTargetY = this.targetY + DIR[dir].y

			//console.log(newTargetX, newTargetY)


			if (map.getTile(newTargetX, newTargetY, 'walls', true).index !== 8) {
				this.targetX = newTargetX
				this.targetY = newTargetY

				this.dir 							= dir
				this.body.velocity.x 	= DIR[dir].x * this.speed
				this.body.velocity.y 	= DIR[dir].y * this.speed

				this.locked = true
			}

		}
	}
}
