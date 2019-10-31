import React from "react";
import "../../scss/components/Featured.scss";

export default function Featured() {
  return (
    <div className="featured-container">
      <div className="featured">
        <h1>Featured</h1>
        <div className="hashtags">
          <p>
            #test <span>2.81m</span>
          </p>
          <p>
            #test2<span>1.12m</span>
          </p>
          <p>
            #test <span>2.81m</span>
          </p>
          <p>
            #test2<span>1.12m</span>
          </p>
          <p>
            #test <span>2.81m</span>
          </p>
          <p>
            #test2<span>1.12m</span>
          </p>
        </div>
      </div>
    </div>
  );
}
