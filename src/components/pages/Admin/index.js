import React, { Component } from "react";
import FormUpdateUser from "./UpdateUser/FormUpdateUser";
// import UpdateUser from "./UpdateUser/";
import Layout from "../../Layout";
import { firebaseAuth, firebaseDatabase } from "../../../initializers/firebase";

import "./admin.css";
class Admin extends Component {
	constructor(props) {
		super(props);

		this.state = {
			user: null,
			newName: "",
			newUrlPhoto: "",
			message: "",
			title: "",
			description: "",
			imgUrl: "",
			information: {}
		};

		this.handleNewNameInput = this.handleNewNameInput.bind(this);
		this.handleNewUrlPhotoInput = this.handleNewUrlPhotoInput.bind(this);
		this.handleTitleInput = this.handleTitleInput.bind(this);
		this.handleDescriptionInput = this.handleDescriptionInput.bind(this);
		this.handleImgUrlInput = this.handleImgUrlInput.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		//this.renderFormUpdateUser = this.renderFormUpdateUser.bind(this)
		this.updateUserProfile = this.updateUserProfile.bind(this);
	}

	componentWillMount() {
		this.setState({ user: firebaseAuth().currentUser });
		firebaseDatabase()
			.ref("information")
			.on("value", snapshot => {
				this.setState({
					information: snapshot.val()
				});
			});
	}

	updateUserProfile(e) {
		e.preventDefault();
		let { newName, newUrlPhoto } = this.state;
		firebaseAuth()
			.currentUser.updateProfile({
				displayName: newName,
				photoURL: newUrlPhoto
			})
			.then(() => {
				this.setState({
					message: "perfil de usuario actualizado satifactoriamente",
					newUrlPhoto: "",
					newName: ""
				});
			})
			.catch(e => console.log(e));
	}

	handleNewUrlPhotoInput(e) {
		this.setState({ newUrlPhoto: e.target.value });
	}
	handleNewNameInput(e) {
		this.setState({ newName: e.target.value });
	}

	handleTitleInput(e) {
		this.setState({ title: e.target.value });
	}

	handleDescriptionInput(e) {
		this.setState({ description: e.target.value });
	}
	handleImgUrlInput(e) {
		this.setState({ imgUrl: e.target.value });
	}

	handleSubmit(e) {
		e.preventDefault();
		let { title, description, imgUrl } = this.state;
		firebaseDatabase()
			.ref("information")
			.set({
				title,
				description,
				imgUrl
			});
	}
	render() {
		if (this.state.user.displayName === null) {
			return (
				<FormUpdateUser
					handleNewUrlPhotoInput={this.handleNewUrlPhotoInput}
					handleNewNameInput={this.handleNewNameInput}
					updateUserProfile={this.updateUserProfile}
				/>
			);
		} else {
			return (
				<Layout User={this.state.user}>
					<h2>Bienvenido {this.state.user.displayName}</h2>
					<img
						className="img-dvicent"
						src={
							this.state.information.imgUrl
								? this.state.information.imgUrl
								: this.state.imgUrl
						}
						alt="coloca la imagen"
					/>
					<form onSubmit={this.handleSubmit}>
						<div className="form-group">
							<input
								className="form-control"
								type="text"
								placeholder="Nombre"
								onChange={this.handleTitleInput}
							/>
						</div>
						<div className="form-group">
							<input
								className="form-control"
								type="text"
								placeholder="url de tu imagen"
								onChange={this.handleImgUrlInput}
							/>
						</div>
						<div className="form-group">
							<textarea
								type="text"
								className="form-control"
								placeholder="Tu descripcion"
								onChange={this.handleDescriptionInput}
							/>
						</div>
						<input
							type="submit"
							className="btn btn-dvicent"
							value="save"
						/>
					</form>
				</Layout>
			);
		}
	}
}

export default Admin;
