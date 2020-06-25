import React from "react";

class Button extends React.Component {
	buttonClickHandler = () => {
		if (this.props.function === "load-more") {
			this.props.loadMorePopularMovies();
		} else if (this.props.function === "view-details") {
			this.props.getMovieId(this.props.featuredMovie.id);
		}
	};

	render() {
		return (
			<button
				className={`button ${this.props.class}`}
				type={this.props.type}
				onClick={this.buttonClickHandler}
			>
				{this.props.value}
			</button>
		);
	}
}

export default Button;
