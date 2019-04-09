import React, { Component } from 'react';
import FormUpdateUser from './UpdateUser/FormUpdateUser';
import UpdateUser from './UpdateUser/'
import Layout from "../../Layout"
import { firebaseAuth } from "../../../initializers/firebase";
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom'

import './admin.css'
class Admin extends Component {
	constructor(props) {
		super(props)

		this.state= {
			user: null,
			newName: '',
			newUrlPhoto: '',
			message: ''
		}

		this.handleNewNameInput = this.handleNewNameInput.bind(this)
		this.handleNewUrlPhotoInput = this.handleNewUrlPhotoInput.bind(this)
		//this.renderFormUpdateUser = this.renderFormUpdateUser.bind(this)
		//this.updateUserProfile = this.updateUserProfile.bind(this)
	}

	componentWillMount() {

		this.setState({ user: firebaseAuth().currentUser })
	
	}

	updateUserProfile(e) {
		e.preventDefault();
		let { newName, newUrlPhoto } = this.state;
		firebaseAuth().currentUser.updateProfile({
			displayName: newName,
			photoURL: newUrlPhoto,
		}).then(() => {
			this.setState({ 
				message: 'perfil de usuario actualizado satifactoriamente',
				newUrlPhoto: '',
				newName: ''
			})
		}).catch(e => console.log(e))
	}

	handleNewUrlPhotoInput(e) {
		this.setState({ newUrlPhoto: e.target.value })
	}
	handleNewNameInput(e) {
		this.setState({ newName: e.target.value })
	}

	Home() {
		return (
			<div>
				<h1>Bienvenido {this.state.user.displayName}</h1>
				<div className="row">
					<div className="col-md-4">
						<button className="btn btn-dvicent">enviar</button>
					</div>
					<div className="col-md-4">
						<button className="btn btn-dvicent">enviar</button>
					</div>
					<div className="col-md-4">
						<button className="btn btn-dvicent">enviar</button>
					</div>
				</div>
			</div>
		)
	}

	render() {

		if(this.state.user.displayName === null) {
			return <FormUpdateUser handleNewUrlPhotoInput={this.handleNewUrlPhotoInput} handleNewNameInput={this.handleNewNameInput} updateUserProfile={this.updateUserProfile}/>
		} else {
			return(
				<Layout User={this.state.user}>
					{/*
					
					*/}
						<Switch>
							<Route path="update-user/" component={UpdateUser} />
							<Route exact path="/" component={this.Home} />
							<Route path="**" component={() => <h1>404admin</h1>} />
						</Switch>
				</Layout>
			)
		}
		
	}
}

export default Admin