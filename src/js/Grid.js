import React from "react";

export default class Grid extends React.Component {
	
	toggleAlive() {
		this.props.toggleAlive(this.props.posX, this.props.posY);
	}

	render() {
		return(
		<td onClick={this.toggleAlive.bind(this)} className={this.props.alive}></td>
		);
	}
}
