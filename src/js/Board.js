import React from "react";

class Board extends React.Component {
	
	constructor(width, height) {
		super();
		this.width = width;
		this.height = height;
	}

	render() {
		return(
		<div>
			<h1>{this.width + " x " + this.height}</h1>
		</div>
		);
	}
}

export default {
	board50: new Board(50, 50),
	board75: new Board(75, 75),
	board100: new Board(100, 100)
}
