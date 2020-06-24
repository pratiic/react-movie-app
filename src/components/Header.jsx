import React from "react";

class Header extends React.Component {
	render() {
		return (
			<div className="header">
				{this.props.children[0]}
				{this.props.children[1]}
			</div>
		);
	}
}

export default Header;
