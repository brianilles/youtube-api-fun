const router = require("express").Router();
const axios = require("axios");

router.get("/public/:page", async (req, res) => {
  const { page } = req.params;
  try {
    if (page !== "0") {
      const yRes = await axios.get(
        "https://www.googleapis.com/youtube/v3/videos",
        {
          params: {
            part: "snippet,statistics",
            chart: "mostPopular",
            maxResults: 28,
            pageToken: page,
            key: process.env.YOUTUBE_API_KEY
          }
        }
      );
      res.status(200).json(yRes.data);
    } else {
      const yRes = await axios.get(
        "https://www.googleapis.com/youtube/v3/videos",
        {
          params: {
            part: "snippet,statistics",
            chart: "mostPopular",
            maxResults: 28,
            key: process.env.YOUTUBE_API_KEY
          }
        }
      );
      res.status(200).json(yRes.data);
    }
  } catch (error) {
    console.error(error);
    res.status(500).end();
  }
});

module.exports = router;
