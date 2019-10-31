const express = require("express");
const helmet = require("helmet");
const cors = require("cors");

const youtubeRouter = require("./youtube/youtube-router.js");
const feedsRouter = require("./youtube/feeds-router.js");

const server = express();
server.use(helmet());
server.use(express.json());
server.use(cors());

server.use("/api/feeds/", feedsRouter);

// there needs to be an endpoint for searching the entire realm of social media

// and an endpoint for autocomplete for that search

// there needs to be an endpoint for all usernames

// So a user will be able to search for an enitity and get back a list of likely results from _all_ the platforms
// they will then be able to select the individual accounts to make a conglomeration of all the accounts
// this way we dont get inccorrect combinations

module.exports = server;
