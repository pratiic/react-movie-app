import React from "react";

class MovieCard extends React.Component {
	render() {
		return (
			<div className="movie-card">
				<div className="movie-image">
					<img src={this.props.imageURL} alt={this.props.movieName} />
				</div>
				<div className="movie-info">
					<p className="movie-name">{this.props.movieName}</p>
					<small className="movie-release-date">
						{this.props.movieReleaseDate}
					</small>
				</div>
			</div>
		);
	}
}

export default MovieCard;
