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
				if(random) col.push(Math.random() > 0.5 ? true : false);
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
		this.loopID = setInterval(this.mainLoop.bind(this), 1000);
			// tick every 1 second
	}

	mainLoop() {
		var { grids, gen } = this.state;
		for(var x = 0; x < this.width; x++) {
			for(var y = 0; y < this.height; y++) {
				if(this.has3Neighbours(x, y)) {
					// has 3 neighbour
					if(!grids[x][y]) {
						// and is previously dead
						// make it alive
						this.toggleAlive(x, y);
					}

				} else if(grids[x][y]) {
					// doesn't have 3 neighbours
					// and is alive
					// kill it
					this.toggleAlive(x, y);
				}
			}
		}
		
		gen++;
		this.setState({grids, gen});
	}

	has3Neighbours(x, y) {
		var { grids } = this.state;
		var total = 0;
		if(x > 0 && y > 0 && grids[x - 1][y - 1]) total++;			
			// top left
		if(y > 0) {
			if(grids[x][y - 1]) total++;
				// top mid
			if(grids[x + 1][y - 1]) total++;
				// top right
		}
		if(x > 0) {
			if(grids[x - 1][y]) total++;
				// mid left
			if(grids[x - 1][y + 1]) total++;
				// bot left
		}
		if(grids[x + 1][y]) total++;
			// mid right
		if(grids[x][y + 1]) total++;
			// bot mid
		if(grids[x + 1][y + 1]) total++;
		
		if(total < 3) return false;
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

