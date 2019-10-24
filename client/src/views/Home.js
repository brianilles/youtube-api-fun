import axios from "axios";
import React from "react";
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import styled from "styled-components";
import { Search } from "styled-icons/boxicons-regular/Search";
import "../sass/Home.scss";
import { BrowserRouter as Router, Switch, Link, Route } from "react-router-dom";

const InputSearch = styled(Search)`
  color: #000;
  height: 22px;
  width: 22px;
  position: absolute;
  margin: 14.5px;
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
  };

  handleRouteChange = (e, r) => {
    console.log(r);
  };

  handleSearch = async e => {
    e.preventDefault();
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
      <>
        <Route exact path={`/`}>
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
                  <button>
                    {this.state.fetchingResults ? (
                      <Loader
                        type="ThreeDots"
                        color="#fff"
                        height={30}
                        width={30}
                      />
                    ) : (
                      "Search"
                    )}
                  </button>
                </div>
              </form>
              {this.state.results && (
                <div className="results-wrapper">
                  <div className="results">
                    {this.state.results.map((r, i) => (
                      <Link
                        to={`/youtube/channel/${r.snippet.channelId}`}
                        className="result"
                        key={i}
                        onClick={this.handleRouteChange}
                      >
                        <div className="top">
                          <img
                            src={r.snippet.thumbnails.default.url}
                            alt={r.snippet.channelTitle}
                          />
                          <span>{r.snippet.channelTitle}</span>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </Route>
        <Switch>
          <Route path={`/youtube/channel/`}>
            <p>hello from channel analytics page!</p>
          </Route>
        </Switch>
      </>
    );
  }
}

export default Home;
