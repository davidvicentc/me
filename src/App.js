import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./components/pages/Home";

// import { firebaseDatabase } from "./initializers/firebase";
import "./app.css";

class App extends Component {
	//form
	// handleTitleInput(e) {
	// 	this.setState({ title: e.target.value });
	// }

	// handleDescriptionInput(e) {
	// 	this.setState({ description: e.target.value });
	// }

	// handleSubmit(e) {
	// 	e.preventDefault();
	// 	firebaseDatabase()
	// 		.ref("information")
	// 		.set({
	// 			title: this.state.title,
	// 			description: this.state.description
	// 		});
	// }

	render() {
		return (
			<Router>
				<Switch>
					<Route exact path="/" component={Home} />
				</Switch>
			</Router>
		);
	}
}

export default App;
