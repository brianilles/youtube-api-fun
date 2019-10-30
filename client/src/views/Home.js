import React from "react";
import "../scss/components/Home.scss";
import Featured from "../components/Home/Featured.js";
import Feed from "../components/Home/Feed.js";

export default function Home() {
  return (
    <div className="home-container">
      <div className="home">
        <div className="left-pane">
          <Feed />
        </div>
        <div className="right-pane">
          <Featured />
        </div>
      </div>
    </div>
  );
}
