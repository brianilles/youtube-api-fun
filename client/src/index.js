import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import "./scss/global/reset.scss";
import "./scss/global/global.scss";
import * as serviceWorker from "./serviceWorker";

ReactDOM.render(<App />, document.getElementById("entry"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
