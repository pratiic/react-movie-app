import React from "react";
import ActorCard from "./ActorCard.jsx";
import Title from "./Title.jsx";

class MovieCast extends React.Component {
	render() {
		return (
			<div className={`movie-cast ${this.props.class}`}>
				<Title
					value={"actors"}
					class={"heading-secondary text-center"}
				/>

				<div className="movie-cast-main">
					{this.props.movieCast
						.filter((cast) => cast.profile_path)
						.map((cast) => {
							return (
								<ActorCard
									key={cast.cast_id}
									actorName={cast.name}
									actorCharacter={cast.character}
									actorImageURL={`${this.props.baseImageURL}${cast.profile_path}`}
								/>
							);
						})}
				</div>
			</div>
		);
	}
}

export default MovieCast;
