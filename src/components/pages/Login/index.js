import React, { Component } from "react";
import { firebaseAuth } from "../../../initializers/firebase";
import Layout from "../../Layout";

class Login extends Component {

	constructor(props) {
		super(props)

		this.state = {
			email: '',
			password: ''
		}

		this.handleLogin = this.handleLogin.bind(this);
		this.handleEmailInput = this.handleEmailInput.bind(this);
		this.handlePasswordInput = this.handlePasswordInput.bind(this);
	}

	handleLogin(e) {
		e.preventDefault();

		firebaseAuth().signInWithEmailAndPassword(this.state.email, this.state.password)
			.catch(e => console.log(e))
	}

	handleEmailInput(e) {
		this.setState({ email: e.target.value })
	}
	handlePasswordInput(e) {
		this.setState({ password: e.target.value })
	}

	render() {
		return (
			<Layout>
				<h3>Inicia Sesión</h3>
				<form onSubmit={this.handleLogin}>
					<div className="form-group">
						<input className="form-control" placeholder="Correo electronico" type="text" onChange={this.handleEmailInput}/>
					</div>
					<div className="form-group">
						<input className="form-control" placeholder="Clave" type="password" onChange={this.handlePasswordInput}/>
					</div>
					<input type="submit" className="btn btn-info"/>
				</form>
			</Layout>
		);
	}
}

export default Login;
