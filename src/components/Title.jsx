import React from "react";

class Title extends React.Component {
	render() {
		return (
			<h1 className={`title capitalize ${this.props.class}`}>
				{this.props.value}
			</h1>
		);
	}
}

export default Title;
