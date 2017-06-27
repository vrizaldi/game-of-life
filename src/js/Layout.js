import React from "react";

export default class Layout extends React.Component {

	constructor() {
		super();	

		this.state = {
			width: 50,
			hieght: 50
		}
	}
	
	changeSize(width, height) {
		this.setState({width, height});
	}

	changeGameState(state) {
		switch(state) {
			case "START":
				this.start();
				break;
			case "PAUSE":
				this.pause();
				break;
			case "RESET":
				this.reset();
				break;
		}
	}

	render() {
		return(
		<div>
			<Title />
			<GridSizeOpt changeSize={this.changeSize.bind(this)} />
			<SystemOpt changeGameState={this.changeGameState.bind(this)}>
			{this.props.children}
		</div>
		);
	}
}
