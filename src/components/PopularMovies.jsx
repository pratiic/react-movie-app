import React from "react";
import MovieCard from "./MovieCard.jsx";

class PopularMovies extends React.Component {
	render() {
		return (
			<div className="popular-movies">
				<h1 className="text-center capitalize heading-secondary">
					popular movies
				</h1>

				<div className="popular-movies-main">
					{this.props.popularMovies.map((popularMovie) => {
						return (
							<MovieCard
								imageURL={`${this.props.baseImageURL}${popularMovie.poster_path}`}
								key={popularMovie.id}
							/>
						);
					})}
				</div>
			</div>
		);
	}
}

export default PopularMovies;
