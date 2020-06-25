import React from "react";
import "./css/style.css";
import SearchBar from "./SearchBar.jsx";
import Header from "./Header.jsx";
import Logo from "./Logo.jsx";
import Featured from "./Featured.jsx";
import Button from "./Button.jsx";
import Results from "./Results.jsx";
import Title from "./Title.jsx";

class App extends React.Component {
	state = {
		popularMovies: [],
		popularMovie: {},
		totalPages: null,
		loadedMore: false,
		searchResults: [],
		searchResultsClass: "hide",
		featuredClass: "show",
	};

	apiInfo = {
		url: "https://api.themoviedb.org/3",
		base: "?language=en-US&api_key=04d44457631804b60abc176ff4864ecd",
		popularMovies: "/movie/popular",
		movieSearch: "/search/movie",
		page: 1,
		language: "en-US",
		key: "04d44457631804b60abc176ff4864ecd",
		baseImageURL: "https://image.tmdb.org/t/p/original",
	};

	loadPopularMovies = () => {
		let { url, popularMovies, page, base } = this.apiInfo;

		fetch(`${url}${popularMovies}${base}&page=${page}`)
			.then((response) => response.json())
			.then((data) => {
				console.log(data);
				if (!this.state.loadedMore) {
					this.setState({
						popularMovies: [
							...this.state.popularMovies,
							...data.results,
						],
						popularMovie: { ...data.results[4] },
						totalPages: data.total_pages,
					});
				} else {
					this.setState({
						popularMovies: [
							...this.state.popularMovies,
							...data.results,
						],
						popularMovie: { ...this.state.popularMovies[4] },
						totalPages: data.total_pages,
					});
				}
			})
			.catch((error) => console.log(error));
	};

	componentDidMount() {
		this.loadPopularMovies();
	}

	loadMorePopularMovies = () => {
		if (++this.apiInfo.page !== this.state.totalPages) {
			this.loadPopularMovies();
			this.setState({ loadedMore: true });
		}
	};

	fetchSearchedMovie = (searchTerm) => {
		let { url, movieSearch, page, base } = this.apiInfo;

		fetch(`${url}${movieSearch}${base}&page=${page}&query=${searchTerm}`)
			.then((response) => response.json())
			.then((data) => {
				console.log(data);
				this.setState({
					searchResults: [...data.results],
					searchResultsClass: "show",
					featuredClass: "hide",
				});
			})
			.catch((error) => console.log(error));
	};

	render() {
		return (
			<React.Fragment>
				<Header>
					<Logo />
					<SearchBar
						placeholder={"Search for movies..."}
						fetchSearchedMovie={this.fetchSearchedMovie}
					/>
				</Header>

				<Featured
					featuredMovie={this.state.popularMovie}
					baseImageURL={this.apiInfo.baseImageURL}
					class={this.state.featuredClass}
				>
					<Button class={"view-more-button"} value={"view more"} />
				</Featured>

				<Results
					movies={this.state.searchResults}
					baseImageURL={this.apiInfo.baseImageURL}
					class={`search-results ${this.state.searchResultsClass}`}
				>
					<Title
						class={"text-center heading-secondary"}
						value={"search results"}
					/>
				</Results>

				<Results
					movies={this.state.popularMovies}
					baseImageURL={this.apiInfo.baseImageURL}
					class={"popular-movies"}
				>
					<Title
						class={"text-center heading-secondary"}
						value={"popular movies"}
					/>
				</Results>

				<Button
					class={"load-more-button button-large"}
					value={"load more"}
					function={"load-more"}
					loadMorePopularMovies={this.loadMorePopularMovies}
				/>
			</React.Fragment>
		);
	}
}

export default App;
