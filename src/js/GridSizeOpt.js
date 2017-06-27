import React from "react";
import Link from "react-router";

export default class GridSizeOpt extends React.Component {

	to50x50() {
		
	}
	render() {
		return() {
		<div>
			<Link to="50x50"><button>50x50</button></Link>
			<Link to="75x75"><button>75x75</button></Link>
			<Link to="100x100"><button>100x100</button></Link>
		</div>
		}
	}
}
