import React from "react";
import "../scss/components/Home.scss";
import Featured from "../components/Home/Featured.js";
import Feed from "../components/Home/Feed.js";
import Footer from "../components/Footer.js";

export default function Home() {
  return (
    <div className="home-container">
      <div className="home">
        <Featured />
        <Feed />
        <Footer />
      </div>
    </div>
  );
}
