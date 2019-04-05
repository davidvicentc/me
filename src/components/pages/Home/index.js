import React, { Component } from "react";
import Layout from "../../Layout";
import { firebaseDatabase } from "../../../initializers/firebase";

/*
 <form onSubmit={this.handleSubmit}>
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
</form> 
*/

class Home extends Component {
	constructor() {
		super();
		this.state = {
			information: null,
			isLoading: false
		};
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
		return <Layout>{this.renderText()}</Layout>;
	}
}
export default Home;
