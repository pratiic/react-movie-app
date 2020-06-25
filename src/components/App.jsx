import React from "react";
import "./css/style.css";
import SearchBar from "./SearchBar.jsx";
import Header from "./Header.jsx";
import Logo from "./Logo.jsx";
import Featured from "./Featured.jsx";
import Button from "./Button.jsx";
import Results from "./Results.jsx";
import Title from "./Title.jsx";
import MovieDetails from "./MovieDetails.jsx";
import MovieCast from "./MovieCast.jsx";
import HomeButton from "./HomeButton.jsx";

class App extends React.Component {
	state = {
		popularMovies: [],
		popularMovie: {},
		totalPages: null,
		loadedMore: false,
		searchResults: [],
		searchResultsClass: "hide",
		featuredClass: "show",
		popularMoviesClass: "show",
		showMoreButtonClass: "show",
		movieDetailsClass: "hide",
		movieCastClass: "hide",
		homeButtonClass: "hide",
		showLoader: false,
		movieDetails: {
			genres: [],
		},
		cast: [],
	};

	apiInfo = {
		url: "https://api.themoviedb.org/3",
		base: "?language=en-US&api_key=04d44457631804b60abc176ff4864ecd",

		popularMovies: "/movie/popular",
		movieSearch: "/search/movie",
		movieDetails: "/movie/",

		page: 1,

		baseImageURL: "https://image.tmdb.org/t/p/original",
	};

	loadPopularMovies = () => {
		let { url, popularMovies, page, base } = this.apiInfo;

		fetch(`${url}${popularMovies}${base}&page=${page}`)
			.then((response) => response.json())
			.then((data) => {
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

		this.setState({ showLoader: true, featuredClass: "hide" });

		fetch(`${url}${movieSearch}${base}&page=${page}&query=${searchTerm}`)
			.then((response) => response.json())
			.then((data) => {
				console.log(data);
				this.setState({
					searchResults: [...data.results],
					searchResultsClass: "show",
					movieDetailsClass: "hide",
					showLoader: false,
					popularMoviesClass: "show",
					showMoreButtonClass: "show",
					homeButtonClass: "show",
				});
			})
			.catch((error) => console.log(error));
	};

	scrollToTop = () => {
		window.scrollTo(0, 0);
	};

	renderMovieDetails = () => {
		if (Object.keys(this.state.movieDetails).length > 0) {
			this.setState({
				featuredClass: "hide",
				popularMoviesClass: "hide",
				searchResultsClass: "hide",
				showMoreButtonClass: "hide",
				movieCastClass: "show",
				movieDetailsClass: "show",
				homeButtonClass: "show",
			});

			this.scrollToTop();
		}
	};

	fetchMovieDetails = (id) => {
		let { url, movieDetails, base } = this.apiInfo;

		fetch(`${url}${movieDetails}${id}${base}`)
			.then((response) => response.json())
			.then((data) => {
				this.setState({ movieDetails: { ...movieDetails, ...data } });
			})
			.catch((error) => console.log(error));

		this.renderMovieDetails();
	};

	fetchMovieCastAndCrew = (id) => {
		let { url, base } = this.apiInfo;

		fetch(`${url}/movie/${id}/credits${base}`)
			.then((response) => response.json())
			.then((data) => {
				this.setState({ cast: [...data.cast] });
			})
			.catch((error) => console.log(error));

		this.renderMovieDetails();
	};

	getMovieId = (id) => {
		this.fetchMovieCastAndCrew(id);
		this.fetchMovieDetails(id);
	};

	reload = () => {
		window.location.reload();
	};

	render() {
		return (
			<React.Fragment>
				<Header>
					<Logo reload={this.reload} />
					<SearchBar
						placeholder={"Search for movies..."}
						fetchSearchedMovie={this.fetchSearchedMovie}
					/>
				</Header>

				<HomeButton
					value={"<i className = 'fas fa-chevron-left'></i>home"}
					class={this.state.homeButtonClass}
					reload={this.reload}
				/>

				<Featured
					featuredMovie={this.state.popularMovie}
					baseImageURL={this.apiInfo.baseImageURL}
					class={this.state.featuredClass}
				>
					<Button
						class={"view-more-button"}
						value={"view more"}
						function={"view-details"}
						getMovieId={this.getMovieId}
						featuredMovie={this.state.popularMovie}
					/>
				</Featured>

				<Results
					movies={this.state.searchResults}
					baseImageURL={this.apiInfo.baseImageURL}
					class={`search-results ${this.state.searchResultsClass}`}
					showLoader={this.state.showLoader}
					getMovieId={this.getMovieId}
				>
					<Title
						class={"text-center heading-secondary"}
						value={"search results"}
					/>
				</Results>

				<Results
					movies={this.state.popularMovies}
					baseImageURL={this.apiInfo.baseImageURL}
					class={`popular-movies ${this.state.popularMoviesClass}`}
					getMovieId={this.getMovieId}
				>
					<Title
						class={"text-center heading-secondary"}
						value={"popular movies"}
					/>
				</Results>

				<Button
					class={`load-more-button button-large ${this.state.showMoreButtonClass}`}
					value={"load more"}
					function={"load-more"}
					loadMorePopularMovies={this.loadMorePopularMovies}
				/>

				<MovieDetails
					backdropURL={this.state.movieDetails.backdrop_path}
					posterURL={this.state.movieDetails.poster_path}
					genres={this.state.movieDetails.genres}
					movieTitle={this.state.movieDetails.original_title}
					moviePlot={this.state.movieDetails.overview}
					baseImageURL={this.apiInfo.baseImageURL}
					movieBudget={this.state.movieDetails.budget}
					movieRevenue={this.state.movieDetails.revenue}
					class={this.state.movieDetailsClass}
				/>

				<MovieCast
					movieCast={this.state.cast}
					baseImageURL={this.apiInfo.baseImageURL}
					class={this.state.movieCastClass}
				/>
			</React.Fragment>
		);
	}
}

export default App;
