import React from "react";
import "./css/style.css";
import SearchBar from "./SearchBar.jsx";
import Header from "./Header.jsx";
import Logo from "./Logo.jsx";
import Featured from "./Featured.jsx";
import Button from "./Button.jsx";
import PopularMovies from "./PopularMovies.jsx";

class App extends React.Component {
	state = {
		popularMovies: [],
		popularMovie: {},
		totalPages: null,
		loadedMore: false,
	};

	apiInfo = {
		url: "https://api.themoviedb.org/3",
		popularMovies: "/movie/popular",
		page: 1,
		language: "en-US",
		key: "04d44457631804b60abc176ff4864ecd",
		baseImageURL: "https://image.tmdb.org/t/p/original",
	};

	loadPopularMovies = () => {
		let { url, popularMovies, page, language, key } = this.apiInfo;

		fetch(
			`${url}${popularMovies}?api_key=${key}&page=${page}&language=${language}`
		)
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

	render() {
		return (
			<React.Fragment>
				<Header>
					<Logo />
					<SearchBar placeholder={"Search for movies..."} />
				</Header>

				<Featured
					featuredMovie={this.state.popularMovie}
					baseImageURL={this.apiInfo.baseImageURL}
				>
					<Button class={"view-more-button"} value={"view more"} />
				</Featured>

				<PopularMovies
					popularMovies={this.state.popularMovies}
					baseImageURL={this.apiInfo.baseImageURL}
				/>

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
