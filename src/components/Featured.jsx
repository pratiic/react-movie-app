import React from "react";

class Featured extends React.Component {
	render() {
		return (
			<div className={`featured ${this.props.class}`}>
				<img
					src={`${this.props.baseImageURL}${this.props.featuredMovie.poster_path}`}
					alt=""
				/>

				<div className="featured-movie-info">
					<h1 className="featured-movie-title capitalize heading-primary">
						{this.props.featuredMovie.original_title}
					</h1>
					<p className="featured-movie-overview">
						{this.props.featuredMovie.overview}
					</p>
					{this.props.children}
				</div>
			</div>
		);
	}
}

export default Featured;
