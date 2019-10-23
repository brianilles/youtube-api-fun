const express = require("express");
const helmet = require("helmet");
const cors = require("cors");

const youtubeRouter = require("./youtube/youtube-router.js");

const server = express();
server.use(helmet());
server.use(express.json());
server.use(cors());

server.use("/api/youtube", youtubeRouter);

module.exports = server;
