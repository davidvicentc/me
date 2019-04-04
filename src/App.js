import React, { Component } from "react";

import { firebaseDatabase } from "./initializers/firebase";
import "./app.css";

import Layout from "./components/Layout";
class App extends Component {
	constructor() {
		super();
		this.state = {
			information: null,
			title: "",
			description: "",
			isLoading: false
		};

		this.handleTitleInput = this.handleTitleInput.bind(this);
		this.handleDescriptionInput = this.handleDescriptionInput.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}
	componentWillMount() {
		this.handleInformation();
	}

	handleInformation() {
		this.setState({ isLoading: true });
		firebaseDatabase()
			.ref("information")
			.on("value", snapshot => {
				this.setState({
					information: snapshot.val(),
					isLoading: false
				});
			});
	}
	handleTitleInput(e) {
		this.setState({ title: e.target.value });
	}

	handleDescriptionInput(e) {
		this.setState({ description: e.target.value });
	}

	handleSubmit(e) {
		e.preventDefault();
		firebaseDatabase()
			.ref("information")
			.set({
				title: this.state.title,
				description: this.state.description
			});
	}

	renderText() {
		if (this.state.isLoading) {
			return <h1>Cargando</h1>;
		} else {
			return (
				<div>
					<h1>{this.state.information.title}</h1>
					<p>{this.state.information.description}</p>
				</div>
			);
		}
	}

	render() {
		return (
			<Layout>
				<div className="row">
					<div className="card mx-auto card-orange mt-5">
						{this.renderText()}
					</div>

					{/* <form onSubmit={this.handleSubmit}>
            <input
              className="form-control"
              type="text"
              placeholder="Title"
              onChange={this.handleTitleInput}
            />
            <input
              type="text"
              className="form-control"
              placeholder="description"
              onChange={this.handleDescriptionInput}
            />
            <input type="submit" value="save" />
          </form> */}
				</div>
			</Layout>
		);
	}
}

export default App;
