import React from "react";

import Grid from "./Grid";
import SystemOpt from "./SystemOpt";

class Board extends React.Component {
	
	constructor(width, height) {
		super();
		this.width = width;
		this.height = height;

		this.state = {
			grids: [],
			gen: 1
		}
			// [x][y]

		this.loopID = 0;
	}

	componentWillMount() {
	
		this.reset(true);
	}

	reset(random) {
		this.pauseGame();

		// reset game
		var grids = [];
		for(var x = 0; x < this.width; x++) {
			var col = [];
			for(var y = 0; y < this.height; y++) {
				if(random) col.push(Math.random() > 0.9 ? true : false);
				else col.push(false);
			}
			grids.push(col);
		}
		this.setState({
			grids, 
			gen: 1
		});
	}

	startGame() {
		this.pauseGame();
			// prevent double loop
		this.loopID = setInterval(this.mainLoop.bind(this), 1000);
			// tick every 1 second
	}

	mainLoop() {
		var { grids, gen } = this.state;
		var nGrids = [];
		for(var x = 0; x < grids.length; x++) {
			// clone the grid
			nGrids.push(grids[x].slice(0));
		}
		for(var x = 0; x < this.width; x++) {
			for(var y = 0; y < this.height; y++) {
				if(this.hasNeighbours(x, y, 2)) {
					// has 2 neighbour
					if(this.hasNeighbours(x, y, 4)) {
						// overpopulation
						// kill it
						if(grids[x][y]) nGrids[x][y] = false
					}
					if(!grids[x][y]) {
						// reproduction
						// make it alive
						nGrids[x][y] = true;
					}

				} else if(grids[x][y]) {
					// underpopulation
					// and is alive
					// kill it
					nGrids[x][y] = false;
				}
			}
		}
		
		gen++;
		this.setState({grids: nGrids, gen});
	}

	hasNeighbours(x, y, min) {
		var { grids } = this.state;
		var total = 0;
		if(x > 0 && y > 0 && grids[x - 1][y - 1]) total++;			
			// top left
		if(y > 0) {
			if(grids[x][y - 1]) total++;
				// top mid
			if(x < this.width - 1&& grids[x + 1][y - 1]) total++;
				// top right
		}
		if(x > 0) {
			if(grids[x - 1][y]) total++;
				// mid left
			if(y < this.height - 1 && grids[x - 1][y + 1]) total++;
				// bot left
		}
		if(x < this.width - 1 && grids[x + 1][y]) total++;
			// mid right
		if(grids[x][y + 1]) total++;
			// bot mid
		if(x < this.width - 1 && y < this.height - 1 && grids[x + 1][y + 1]) total++;
			// bot right
		
		if(total < min) return false;
		else return true;
	}
	
	pauseGame() {
		clearInterval(this.loopID);
			// terminate the game loop
	}

	toggleAlive(x, y) {
//		console.log("toggling (" + x + ", " + y + ")")
		var grids = this.state.grids;
		grids[x][y] = !grids[x][y];
		this.setState({grids});
	}

	render() {
		return(
		<div>
			<SystemOpt
					startGame={this.startGame.bind(this)}
					pauseGame={this.pauseGame.bind(this)}
					reset={this.reset.bind(this)}/>
			<p id="generation">Generation: {this.state.gen}</p>
			<table>
				<tbody>
					{this.state.grids.map(this.renderGrids.bind(this))}
				</tbody>
			</table>
		</div>
		);
	}

	renderGrids(col, x) {
		var that = this;

		return(
		<tr>
			{col.map(
					function(alive, y) {
						return(<Grid 
											toggleAlive={that.toggleAlive.bind(that)}
											key={x + "," + y}
											posX={x}
											posY={y}
											alive={alive ? "alive" : "dead"} /> ); 	
					})
			}
		</tr>);
	}

}

export class Board50 extends Board {
	constructor() {
		super(50, 50);
	}
}

export class Board75 extends Board {
	constructor() {
		super(75, 75);
	}
}

export class Board100 extends Board {
	constructor() {
		super(100, 100);
	}
}

