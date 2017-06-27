import React from "react";
import { Link } from "react-router";

import Title from "./Title";
import GridSizeOpt from "./GridSizeOpt";
import SystemOpt from "./SystemOpt";

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
			<Link to="50x50"><button>50x50</button></Link>
			<Link to="75x75"><button>75x75</button></Link>
			<Link to="100x100"><button>100x100</button></Link>
			<SystemOpt changeGameState={this.changeGameState.bind(this)} />
			{this.props.children}
		</div>
		);
	}
}
