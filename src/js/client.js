import React from "react";
import ReactDOM from "react-dom";
import { Router, Route, IndexRoute, hashHistory } from "react-router";

import Layout from "./Layout";
import { Board50, Board75, Board100 } from "./Board";


const app = document.getElementById("app");

ReactDOM.render(
		<Router>
			<Route path="/" component={Layout}>
				<IndexRoute component={Board50}></IndexRoute>
				<Route path="50x50" component={Board50}></Route>
				<Route path="75x75" component={Board75}></Route>
				<Route path="100x100" component={Board100}></Route>
			</Route>
		</Router>, 
		app);

