import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import axios from "axios";
import "../sass/Home.scss";
import styled from "styled-components";
import { Search } from "styled-icons/boxicons-regular/Search";
import { Youtube } from "styled-icons/boxicons-logos/Youtube";

const InputSearch = styled(Search)`
  color: #000;
  height: 22px;
  width: 22px;
  position: absolute;
  margin: 14.5px;
`;

const SmallYoutube = styled(Youtube)`
  color: #ff0000;
  height: 22px;
  width: 22px;
  margin-left: 12.5px;
`;

class Home extends React.Component {
  state = {
    search: "",
    results: null,
    active: false,
    fetchingResults: false
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
      this.setState({ fetchingResults: true });
      const res = await axios.get(endpoint);
      this.setState({ fetchingResults: false });
      this.setState({ results: res.data, active: true });
    } catch (error) {
      this.setState({ fetchingResults: false });
      console.error(error);
    }
  };

  clearSearch = () => {
    if (this.state.active) {
      this.setState({ results: null, active: false });
    }
  };

  render() {
    return (
      <div className="home" onClick={this.clearSearch}>
        <div className="search">
          <div className="focus">
            <h1>A name</h1>
          </div>
          <form onSubmit={this.handleSearch}>
            <div className="search-input-wrapper">
              <InputSearch />
              <input
                type="text"
                name="search"
                autoComplete="off"
                placeholder="Search by username"
                value={this.state.search}
                onChange={this.handleChange}
                className={this.state.results && "active"}
              />
              <button>Search</button>
            </div>
          </form>
          {this.state.fetchingResults ||
            (this.state.results && (
              <div className="results-wrapper">
                <div className="results">
                  {this.state.results ? (
                    this.state.results.map((r, i) => (
                      <div className="result" key={i}>
                        <div className="top">
                          <img
                            src={r.snippet.thumbnails.default.url}
                            alt={r.snippet.channelTitle}
                          />
                          <p>
                            {r.snippet.channelTitle}
                            {/* <span>{r.snippet.description}</span> */}
                          </p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p>fetching results</p>
                  )}
                </div>
              </div>
            ))}
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
