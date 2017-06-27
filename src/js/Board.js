import React from "react";

import Grid from "./Grid";
import SystemOpt from "./SystemOpt";

class Board extends React.Component {
	
	constructor(width, height) {
		super();
		this.width = width;
		this.height = height;

		this.state = {
			grids: []
		}
		this.loopID = 0;
			// [x][y]
	}

	componentWillMount() {
	
		this.reset();
	}

	reset() {
		var grids = [];
		for(var x = 0; x < this.width; x++) {
			var col = [];
			for(var y = 0; y < this.height; y++) {
				col.push(false);
			}
			grids.push(col);
		}
		this.setState({grids});
	}

	toggleAlive(x, y) {
		console.log("toggling (" + x + ", " + y + ")")
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
					resetGame={this.reset.bind(this)}/>
			<table>
				<tbody>
					{this.state.grids.map(
							(col, x) => {
								return(
								<tr>
									{
										col.map(
											(alive, y) => {
												return(<Grid 
																	toggleAlive={this.toggleAlive.bind(this)}
																	key={x + "," + y}
																	posX={x}
																	posY={y}
																	alive={alive ? "alive" : "dead"} />); 	
											})
									}
								</tr>);
							})}
				</tbody>
			</table>
		<div>
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
/*
						alive ? 
													(<td onClick={} 
															className="alive"></td>)
													: (<td 
															className="dead"></td>);
															*/
