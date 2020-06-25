import React from "react";
import Title from "./Title";

class MovieDetails extends React.Component {
	modify = (number) => {
		if (number) {
			let strNumber = number.toString();
			let arrNumber = Array.from(strNumber);
			let newArrNumber = [];

			let reversify = (array) => {
				let newArray = [];
				for (let i = array.length - 1; i >= 0; i--) {
					newArray.push(array[i]);
				}
				return newArray;
			};

			newArrNumber = reversify(arrNumber);

			let commafy = (array) => {
				let count = Math.floor(array.length / 3);

				for (let i = 0; i <= count; i++) {
					array.splice(3 * i + i, 0, ",");
				}

				return array;
			};

			newArrNumber = commafy(newArrNumber);

			arrNumber = [...reversify(newArrNumber)];

			if (arrNumber[0] === ",") {
				arrNumber = arrNumber.slice(1, arrNumber.length - 1);
			} else {
				arrNumber = arrNumber.slice(0, arrNumber.length - 1);
			}

			strNumber = arrNumber.join("");

			console.log(strNumber);

			return `$${strNumber}`;
		} else {
			return "unknown";
		}
	};

	render() {
		return (
			<div className={`movie-details ${this.props.class}`}>
				<img
					src={`${this.props.baseImageURL}${this.props.backdropURL}`}
					alt=""
					className="backdrop-image"
				/>

				<div className="movie-details-main">
					{/* <div className="poster-image-container">
						<img
							src={`${this.props.baseImageURL}${this.props.posterURL}`}
							alt=""
							className="poster-image"
						/>
					</div> */}

					<div className="movie-details-card">
						<Title
							value={this.props.movieTitle}
							class={"heading-secondary"}
						/>

						<div className="genres">
							{this.props.genres.map((genre) => {
								return (
									<span className="genre" key={genre.name}>
										{genre.name}
									</span>
								);
							})}
						</div>

						<Title value={"plot"} class={"heading-tertiary"} />

						<p className="movie-plot">{this.props.moviePlot}</p>

						{/* <div className="additional-info">
							<span>
								budget:
								<span>
									{this.modify(this.props.movieBudget)}
								</span>
							</span>

							<span>
								revenue:
								<span>
									{this.modify(this.props.movieRevenue)}
								</span>
							</span>

							<span>
								imdb rating:{" "}
								<span>{this.props.imdbRating}</span>
							</span>
						</div> */}
					</div>
				</div>
			</div>
		);
	}
}

export default MovieDetails;
