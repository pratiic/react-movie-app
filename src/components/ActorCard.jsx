import React from "react";

class ActorCard extends React.Component {
	render() {
		return (
			<div className="actor-card">
				<img
					src={this.props.actorImageURL}
					alt=""
					className="actor-image"
				/>

				<div className="actor-details">
					<p className="actor-name">{this.props.actorName}</p>
					<p className="actor-character">
						{this.props.actorCharacter}
					</p>
				</div>
			</div>
		);
	}
}

export default ActorCard;
