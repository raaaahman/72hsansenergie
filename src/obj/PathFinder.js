//Path finding:
class PathFinder {

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
		for(var j = 0; j< this.mazeHeight; j++)
		{
			for(var i = 0; i < this.mazeWidth; i++)
			{
					var id = mazeArray.getTile(i,j,'mazeLayer',true).index;
					var pos = (1 + i) + (this.mazeWidth + 2) * (j + 1);

					this.grid[pos] = this.emptyCell;

					if(id <= 26)
						this.grid[pos] = this.wall;

					if(this.grid[pos] == this.tp)
						this.teleporters.push(pos);
			}
		}


	}

	//Init some variables here:
	constructor(mazeArray)
	{
		this.mazeHeight = mazeArray.height;
		this.mazeWidth = mazeArray.width;
		this.mazeSize = (this.mazeHeight + 2) * (this.mazeWidth + 2);
		this.dirs = [-(this.mazeWidth+2),(this.mazeWidth+2),-1,1,0];
		this.emptyCell = 2;
		this.wall = 0;
		this.tp = 1;
		this.teleporters = [];
		this.activateTp = true;
		this.useTp = false;
		this.tpPos = 0;
		this.grid = new Array(this.mazeSize);
		this.distances = new Array(this.mazeSize);
		this.distMax = 1000;
		this.lastBestDist = this.distMax;
		this.queue = {tab:[], offset:0, length:0,
			push: function(v){
				this.tab.push(v);
				this.length++;
			},

			shift: function()
			{
				if(this.length <= 0)
					console.error("Error while shifting queue: queue is empty!");

				var val = this.tab[this.offset];
				this.offset++;
				this.length--;
				return val;
			}
		};
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

	//Convert coordinates from a layer (phaser.io) into a position:
	pos(x,y)
	{
		return (1 + x) + (this.mazeWidth + 2) * (y + 1);
	}

	//Convert a position into layer coordinates (X,Y):  
	coordX(pos)
	{
		return (pos % (this.mazeWidth + 2)) -1;
	}
	
	coordY(pos)
	{
		return Math.floor(pos / (this.mazeWidth + 2)) - 1;
	}

	//Find direction to follow the player:
	bestDir(x,y)
	{
		this.useTp = false;
		var dist = this.distMax;
		var pos = this.pos(x,y);
		var bestDir = 4;

		//Check directions:
		for(var i=0; i < 4; i++)
		{
			var next = pos + this.dirs[i];
			var newDist = this.distances[next];

			if(newDist < dist)
			{
					dist = newDist;
					bestDir = i;
			}
			else if(newDist == dist && Math.random() < 0.5)
			{
				dist = newDist;
				bestDir = i;
			}
		}
		
		//Check teleporters:
		if(this.activateTp && (this.grid[pos] == this.tp))
		{
			for(var j=0; j < teleporters.length; j++)
			{
				var next = this.teleporters[j];
				var newDist = this.distances[next];
				
				if(newDist < dist)
				{
						dist = newDist;
						bestDir = 5;
						this.useTp = true;
						this.tpPos = next;
				}
				else if(newDist == dist && Math.random() < 0.5)
				{
					dist = newDist;
					bestDir = 5;
					this.useTp = true;
					this.tpPos = next;
				}
			}
		}
		
				
		this.LastBestDist = dist;
		return bestDir;
	}


	//Find direction for running away:
	worstDir(x,y)
	{
		var dist = 0;
		var pos = this.pos(x,y);
		var bestDir = 4;

		for(var i=0; i < 4; i++)
		{
			var next = pos + this.dirs[i];
			var newDist = this.distances[next];

			if(newDist > dist && newDist < this.distMax)
			{
					dist = newDist;
					bestDir = i;
			}
			else if(newDist == dist && Math.random() < 0.5)
			{
				dist = newDist;
				bestDir = i;
			}
		}

		return bestDir;
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

//~ function TEST_PathFinder()
//~ {

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

//~ }
