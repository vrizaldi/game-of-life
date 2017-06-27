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
	
		this.reset();
	}

	reset() {
		clearInterval(this.loopID);
			// the game loop
		var grids = [];
		for(var x = 0; x < this.width; x++) {
			var col = [];
			for(var y = 0; y < this.height; y++) {
				col.push(false);
			}
			grids.push(col);
		}
		this.setState({
			grids, 
			gen: 1
		});
	}

	startGame() {
		this.loopID = setInterval(mainLoop, 1000);
			// tick every 1 second
	}

	mainLoop() {
		var { grids, gen } = this.state;
		for(var x = 0; x < this.width; x++) {
			for(var y = 0; y < this.height; y++) {
				if(this.has3Neighbour(grids[x][y])) {
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
	

	toggleAlive(x, y) {
//		console.log("toggling (" + x + ", " + y + ")")
		var grids = this.state.grids;
		grids[x][y] = !grids[x][y];
		this.setState({grids});
	}

	renderGrids(col, x) {
		var that = this;
		return(
		<tr>
			{col.map(
					function() {
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

	render() {
		return(
		<div>
			<SystemOpt
					startGame={this.startGame.bind(this)}
					pauseGame={this.pauseGame.bind(this)}
					resetGame={this.reset.bind(this)}/>
			<p id="generation">Generation: {this.state.gen}</p>
			<table>
				<tbody>
					{this.state.grids.map(this.renderGrids)}
				</tbody>
			</table>
		</div>
		);
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

