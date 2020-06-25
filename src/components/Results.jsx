import React from "react";
import MovieCard from "./MovieCard.jsx";

class Results extends React.Component {
	render() {
		{
			console.log(this.props.class);
		}
		return (
			<div className={`results ${this.props.class}`}>
				{this.props.children}

				<div className="results-main">
					{this.props.movies.map((movie) => {
						return (
							<MovieCard
								imageURL={`${this.props.baseImageURL}${movie.poster_path}`}
								key={movie.id}
								movieName={movie.original_title}
								movieReleaseDate={movie.release_date}
							/>
						);
					})}
				</div>
			</div>
		);
	}
}

export default Results;
