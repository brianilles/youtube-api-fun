import React from "react";
import styled from "styled-components";
import { Search as SearchI } from "styled-icons/boxicons-regular/Search";

const NavSearch = styled(SearchI)`
  height: 22px;
  width: 22px;
  position: absolute;
  margin: 7px;
  margin-left: 310px;
`;

class Search extends React.Component {
  render() {
    return (
      <div className="search-container">
        <div className="search">
          <span>
            <NavSearch />
          </span>
          <form>
            <input type="text" placeholder="Search" />
          </form>
        </div>
      </div>
    );
  }
}

export default Search;
