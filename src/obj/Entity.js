class Entity extends Phaser.Sprite {

	constructor(game, startX, startY, img, speed = 150) {
		super(game, startX, startY, img)

		this.locked 	= false
		this.dir 			= 'NONE'
		this.posX		= startX / cellSize
		this.posY		= startY / cellSize
		this.isLit		= false	//
		this.tileType	= 0			//These two values would be quickly changed
		this.targetX 	= Math.round(this.posX)
		this.targetY 	= Math.round(this.posY)

		this.speed 		= speed

		//Tie the entity to the stage so it gets rendered
		game.state.getCurrentState().stage.addChild(this)
	}

	getPos () {
		this.posX = this.body.x / cellSize
		this.posY = this.body.y / cellSize
		var cellX = Math.round(this.posX)
		var cellY = Math.round(this.posY)

		this.tileType = map.getTile(cellX, cellY, 'background', true).index

		map.getTile(cellX, cellY, 'foreground', true).index ? this.isLit = true : this.isLit = false

	}

	move() {
		if(this.locked)
		{

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

		if(!this.locked)
		{
			this.dir = 'NONE'

			if (cursors.left.isDown)
				this.dir = 'LEFT'
			else if (cursors.right.isDown)
				this.dir = 'RIGHT'
			else if (cursors.up.isDown)
				this.dir = 'UP'
			else if (cursors.down.isDown)
				this.dir = 'DOWN'

			//console.log(this.dir)

			if(this.dir !== 'NONE')
			{

				var newTargetX = this.targetX + DIR[this.dir].x
				var newTargetY = this.targetY + DIR[this.dir].y

				//console.log(newTargetX, newTargetY)


				if (map.getTile(newTargetX, newTargetY, 'walls', true).index !== 8) {
					this.targetX = newTargetX
					this.targetY = newTargetY

					this.body.velocity.x = DIR[this.dir].x * this.speed
					this.body.velocity.y = DIR[this.dir].y * this.speed

					this.locked = true
				}
			}
			else
			{
				// console.log("Waiting for input")
			}
		}
	}
}
