import React, { Component } from "react";

import {
	BrowserRouter as Router,
	Route,
	Switch,
	Redirect
} from "react-router-dom";
import { firebaseAuth } from "./initializers/firebase";
import Home from "./components/pages/Home/";
import Login from "./components/pages/Login/";

import "./app.css";

const PrivateRoute = ({ component: Component, authed, rest }) => (
	<Route
		{...rest}
		render={props =>
			authed === true ? (
				<Component {...props} />
			) : (
				<Redirect
					to={{
						pathname: "/login",
						state: { from: props.location }
					}}
				/>
			)
		}
	/>
);

const PublicRoute = ({ component: Component, authed, rest }) => (
	<Route
		{...rest}
		render={props =>
			authed === false ? (
				<Component {...props} />
			) : (
				<Redirect to="/me/ordep-admin" />
			)
		}
	/>
);

class App extends Component {
	constructor(...props) {
		super(...props);

		this.state = {
			authed: false,
			loading: true
		};
	}
	componentDidMount() {
		firebaseAuth().setPersistence(firebaseAuth.Auth.Persistence.SESSION);

		firebaseAuth().onAuthStateChanged(user => {
			if (user) {
				this.setState({ authed: true, loading: false });
			} else {
				this.setState({ authed: false, loading: false });
			}
		});
	}

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
		return this.state.loading ? (
			<h1>Cargando</h1>
		) : (
			<Router>
				<Switch>
					<Route exact path="/" component={Home} />
					<PublicRoute
						authed={this.state.authed}
						path="/login"
						component={Login}
					/>
					<PrivateRoute
						authed={this.state.authed}
						path="/admin"
						component={() => <h1>hola admin</h1>}
					/>
				</Switch>
			</Router>
		);
	}
}

export default App;
