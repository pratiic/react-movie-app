import React from "react";
import "./css/style.css";
import SearchBar from "./SearchBar.jsx";
import Header from "./Header.jsx";
import Logo from "./Logo.jsx";

class App extends React.Component {
	render() {
		return (
			<React.Fragment>
				<Header>
					<Logo />
					<SearchBar placeholder={"Search for movies..."} />
				</Header>
			</React.Fragment>
		);
	}
}

export default App;
