import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import axios from "axios";
import "../sass/Home.scss";

class Home extends React.Component {
  state = {
    search: "",
    results: []
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
    // this.handleSearch(e);
  };

  handleSearch = async e => {
    e.preventDefault();
    console.log("searching...");
    try {
      const endpoint = `http://localhost:8100/api/youtube/search/channel/${this.state.search}`;
      const res = await axios.get(endpoint);
      this.setState({ results: res.data });
    } catch (error) {
      console.error(error);
    }
  };

  render() {
    return (
      <div className="home">
        <div className="search">
          <form onSubmit={this.handleSearch}>
            <div className="search-input-wrapper">
              <input
                type="text"
                name="search"
                placeholder="Search for a Youtube channel"
                value={this.state.search}
                onChange={this.handleChange}
                required
              />
              <button>Search</button>
            </div>
          </form>
          {this.state.results && (
            <div className="results-wrapper">
              <div className="results">
                {this.state.results.map((r, i) => (
                  <div className="result" key={i}>
                    <div className="top">
                      <img
                        src={r.snippet.thumbnails.default.url}
                        alt={r.snippet.channelTitle}
                      />
                      <p>
                        {r.snippet.channelTitle}{" "}
                        <span>{r.snippet.description}</span>
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        {/* <Switch>
          <Route path={`${this.props.match.path}/:`}>
            <p>hello</p>
          </Route>
          <Route path={match.path}>
            <h3>Please select a topic.</h3>
          </Route>
        </Switch> */}
      </div>
    );
  }
}

export default Home;
