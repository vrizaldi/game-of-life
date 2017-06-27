import React from "react";
import ReactDOM from "react-dom";
import { Router, Route, IndexRoute } from "react-router";

import Layout from "./Layout";
import { board50, board75, board100 } from "./Board";


const app = document.getElementById("app");
ReactDOM.render(
	<Router>
		<Route path="/" components={Layout}>
			<IndexRoute component={board50}></IndexRoute>
			<Route path="50x50" component={board50}></Route>
			<Route path="75x75" component={board75}></Route>
			<Route path="100x100" component={board100}></Route>
		</Route>
	</Router>, 
	app);
