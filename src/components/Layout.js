import React, { Component } from "react";
import { firebaseAuth } from '../initializers/firebase'
class Layout extends Component {

	constructor(props) {
		super(props)

		this.signOut = this.signOut.bind(this)
	}

	signOut() {
		firebaseAuth().signOut();
	}

	render() {
		return (
			<div>
				<div className="container">
					{ this.props.User ? <button className="btn btn-dvicent mt-3" onClick={this.signOut}>Cerrar sesion</button> : '' }
					<div className="row">
						<div className="card mx-auto card-orange mt-5">
							{this.props.children}
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default Layout;
