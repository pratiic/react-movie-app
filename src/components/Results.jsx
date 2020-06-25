import React from "react";
import MovieCard from "./MovieCard.jsx";
import Loader from "./Loader.jsx";

class Results extends React.Component {
	render() {
		if (!this.props.movies.length > 0 && this.props.showLoader) {
			return <Loader />;
		} else {
			return (
				<div className={`results ${this.props.class}`}>
					{this.props.children}

					<div className="results-main">
						{this.props.movies
							.filter((movie) => movie.poster_path)
							.map((movie) => {
								return (
									<MovieCard
										imageURL={`${this.props.baseImageURL}${movie.poster_path}`}
										key={movie.id}
										movieName={movie.original_title}
										movieReleaseDate={movie.release_date}
										id={movie.id}
										getMovieId={this.props.getMovieId}
									/>
								);
							})}
					</div>
				</div>
			);
		}
	}
}

export default Results;
