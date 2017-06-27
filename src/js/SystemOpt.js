import React from "react";

export default class SystemOpt extends React.Component {

	startGame() {
		this.props.startGame();
	}

	pauseGame() {
		this.props.pauseGame();
	}

	reset() {
		this.props.reset(true);
			// randomize
	}

	clear() {
		this.props.reset(false);
			// clear the board
	}

	render() {
		return(
		<div>
			<button onClick={this.startGame.bind(this)}>Start</button>
			<button onClick={this.pauseGame.bind(this)}>Pause</button>
			<button onClick={this.reset.bind(this)}>Reset</button>
			<button onClick={this.clear.bind(this)}>Clear</button>
		</div>
		);
	}
}
