//Path finding:
class pathFinder {

	//copy the maze for path finding:
	initPathFinding(mazeArray)
	{
		//Clear grid:
		for(var i = 0; i < this.mazeSize; i++)
			this.grid[i] = this.emptyCell;
		
		//Add horizontal borders:
		for(var i = 0; i < this.mazeWidth + 2; i++)
		{
			this.grid[i] = this.wall;
			this.grid[i + (this.mazeWidth+2)*(this.mazeHeight+1)] = this.wall;
		}
		
		//Add vertical borders:
		for(var i = 0; i < this.mazeHeight + 2; i++)
		{
			this.grid[(this.mazeWidth+2) * i + 0] 					= this.wall;
			this.grid[(this.mazeWidth+2) * i + this.mazeWidth+1]	= this.wall;
		}
		
		//Read maze array:
		for(var i = 0; i < this.mazeWidth * this.mazeHeight; i++)
		{
			var x = i % this.mazeWidth;
			var y = (i - x)/this.mazeWidth;
			var pos = (1 + x) + (this.mazeWidth + 2) * (y + 1);
			this.grid[pos] = mazeArray[i];
			
			if(mazeArray[i] == this.tp)
				this.teleporters.push(pos);
		}
	}

	//Init some variables here:
	constructor(mazeArray, mazeHeight, mazeWidth)
	{
		this.mazeHeight = mazeHeight;
		this.mazeWidth = mazeWidth;
		this.mazeSize = (this.mazeHeight + 2) * (this.mazeWidth + 2);
		this.dirs = [-(this.mazeWidth+2),(this.mazeWidth+2),-1,1,0];
		this.emptyCell = 2;
		this.wall = 0;
		this.tp = 1;
		this.teleporters = [];
		this.activateTp = true;
		this.grid = new Array(this.mazeSize);
		this.distances = new Array(this.mazeSize);
		this.distMax = 1000;
		this.queue = [];
		this.initPathFinding(mazeArray);
	}
	
	//Compute distances to the player:
	computeDistances(playerX, playerY)
	{
		//Clear distances:
		for(var i=0;i<this.mazeSize;i++)
			this.distances[i] = this.grid[i] == this.wall ? this.distMax + 1 : this.distMax;

		//Start point:
		var playerPos = (1 + playerX) + (this.mazeWidth + 2) * (playerY + 1);
		this.distances[playerPos] = 0;
		this.queue.push(playerPos);
		
		//Breadth first search:
		while(this.queue.length > 0)
			this.computeDistancesAt(this.queue.shift())
	}

	//Continue breadth first search at position pos:
	computeDistancesAt(pos)
	{	
		//Manage regular cells:
		for(var i=0; i < 4; i++)
		{
			var next = pos + this.dirs[i];
			if(this.distances[next] == this.distMax)
			{
				this.distances[next] = this.distances[pos] + 1;
				this.queue.push(next);
			}
		}

		//Manage teleporters:
		if(this.activateTp && (this.grid[pos] == this.tp))
		{
			for(var j=0; j < this.teleporters.length; j++)
			{
				var next = this.teleporters[j];
				if(this.distances[next] == this.distMax)
				{
					this.distances[next] = this.distances[pos] + 1;
					this.queue.push(next);
				}
			}
		}
	}
	
	//DEBUG TOOLS: /////////////////////////////////////////////////////
	
	//display the grid (debug only !!):
	displayGrid()
	{
		var str = "";
		for(var i=0; i < this.mazeSize; i++)
		{
			str += this.grid[i];
			if(i%(this.mazeWidth+2) == this.mazeWidth+1)
				str += '\n';
		}
		console.log(str);
	}

	//display distances (debug only!!)
	displayDistances()
	{
		var str = "";
		for(var i=0; i < this.mazeSize; i++)
		{
			str += this.distances[i] > 9 ? 'V' : this.distances[i];
			if(i%(this.mazeWidth+2) == this.mazeWidth+1)
				str += '\n';
		}
		console.log(str);
	}
	
	////////////////////////////////////////////////////////////////////
	
}

//Tests:
//Instanciate a pathFinder then compute distances!

//~ var maze = 
//~ [
//~ 1,2,0,0,0,0,0,0,0,0,
//~ 2,2,0,0,0,0,0,0,0,0,
//~ 0,0,2,2,1,2,2,1,0,0,
//~ 0,0,2,2,2,2,2,2,0,0,
//~ 0,0,2,2,2,2,2,2,0,0,
//~ 0,0,0,2,2,2,0,0,0,0,
//~ 0,0,0,2,2,0,0,0,0,0,
//~ 0,0,0,0,2,0,0,0,0,0,
//~ 0,0,0,0,1,0,0,0,2,2,
//~ 0,0,0,0,0,0,0,0,2,1
//~ ];


//~ var pf = new pathFinder(maze,10,10);
//~ pf.displayGrid();
//~ pf.computeDistances(4,4);
//~ pf.displayDistances();
