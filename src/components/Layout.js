import React, { Component } from "react";

class Layout extends Component {
	render() {
		return (
			<div>
				<div className="container">
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
