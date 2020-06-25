import React from "react";

class SearchBar extends React.Component {
	state = {
		searchTerm: "",
	};

	inputChangeHandler = (event) => {
		this.setState({ searchTerm: event.target.value });
	};

	formSubmitHandler = (event) => {
		event.preventDefault();

		if (this.state.searchTerm) {
			this.props.fetchSearchedMovie(this.state.searchTerm);
		}
	};

	render() {
		return (
			<form className="form" onSubmit={this.formSubmitHandler}>
				<div className="input-group">
					<i className="fas fa-search search-icon"></i>

					<input
						type="text"
						placeholder={this.props.placeholder}
						value={this.state.searchTerm}
						className="search-bar"
						onChange={this.inputChangeHandler}
					/>
				</div>
			</form>
		);
	}
}

export default SearchBar;
