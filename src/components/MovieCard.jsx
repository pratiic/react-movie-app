import React from "react";

class MovieCard extends React.Component {
	render() {
		return (
			<div className="movie-card">
				<img src={this.props.imageURL} alt="" />
			</div>
		);
	}
}

export default MovieCard;
