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
		featuredMovie: {},
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
		//the main url
		url: "https://api.themoviedb.org/3",

		//this is common for all types of requests
		base: "?language=en-US&api_key=04d44457631804b60abc176ff4864ecd",

		//for getting popular movies, for searching movies and details of a specific movie
		popularMovies: "/movie/popular",
		movieSearch: "/search/movie",
		movieDetails: "/movie/",

		//the page that gets retrieved
		page: 1,

		//the main url for images
		baseImageURL: "https://image.tmdb.org/t/p/original",
	};

	//this gets all the popular movies
	loadPopularMovies = () => {
		let { url, popularMovies, page, base } = this.apiInfo;

		fetch(`${url}${popularMovies}${base}&page=${page}`)
			.then((response) => response.json())
			.then((data) => {
				if (!this.state.loadedMore) {
					//if no request has been made to load more movies by clicking load more button

					this.setState({
						popularMovies: [
							...this.state.popularMovies,
							...data.results,
						],
						featuredMovie: { ...data.results[2] },
						totalPages: data.total_pages,
					});
				} else {
					//if no request has been made to load more movies by clicking load more button

					this.setState({
						popularMovies: [
							...this.state.popularMovies,
							...data.results,
						],
						featuredMovie: { ...this.state.popularMovies[0] },
						totalPages: data.total_pages,
					});
				}
			})
			.catch((error) => console.log(error));
	};

	componentDidMount() {
		//when the app first loads up popular movies are fetched
		this.loadPopularMovies();
	}

	//when load more button is clicked
	loadMorePopularMovies = () => {
		if (++this.apiInfo.page !== this.state.totalPages) {
			this.loadPopularMovies();
			this.setState({ loadedMore: true });
		}
	};

	//when a movie is searched
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

	//to get the id of a movie
	getMovieId = (id) => {
		this.fetchMovieCastAndCrew(id);
		this.fetchMovieDetails(id);
	};

	//to fetch the cast and crew of a movie
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

	//to fetch details about a movie
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

	//to render details about a movie
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

	//to reload the whole app
	reload = () => {
		window.location.reload();
	};

	//to scroll to the top of the page
	scrollToTop = () => {
		window.scrollTo(0, 0);
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
					featuredMovie={this.state.featuredMovie}
					baseImageURL={this.apiInfo.baseImageURL}
					class={this.state.featuredClass}
				>
					<Button
						class={"view-more-button"}
						value={"view more"}
						function={"view-details"}
						getMovieId={this.getMovieId}
						featuredMovie={this.state.featuredMovie}
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
