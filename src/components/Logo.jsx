import React from "react";

class Logo extends React.Component {
	logoClickHandler = () => {
		this.props.reload();
	};

	render() {
		return (
			<div
				className="logo text-center uppercase"
				onClick={this.logoClickHandler}
			>
				<p className="logo-upper">movie</p>
				<p className="logo-lower">search</p>
			</div>
		);
	}
}

export default Logo;
