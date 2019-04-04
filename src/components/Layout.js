import React, { Component } from "react";

class Layout extends Component {
	render() {
		return (
			<div>
				<div className="container">{this.props.children}</div>
			</div>
		);
	}
}

export default Layout;
