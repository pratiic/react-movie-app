import React from "react";

class HomeButton extends React.Component {
	homeButtonClickHandler = () => {
		this.props.reload();
	};

	render() {
		return (
			<button
				className={`button home-button ${this.props.class}`}
				onClick={this.homeButtonClickHandler}
			>
				<i className="fas fa-chevron-left home-button-icon"></i>
				home
			</button>
		);
	}
}

export default HomeButton;
