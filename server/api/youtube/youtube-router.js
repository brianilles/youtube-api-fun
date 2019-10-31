const router = require("express").Router();
const axios = require("axios");

router.get("/search/channel/:channel", async (req, res) => {
  const { channel } = req.params;
  try {
    const r = await axios.get("https://www.googleapis.com/youtube/v3/search", {
      params: {
        part: "snippet",
        q: channel,
        type: "channel",
        maxResults: 10,
        key: "AIzaSyDDKNauQQXppEQAvr1I33ukU5egBHIPmN8"
      }
    });
    res.status(200).json(r.data.items);
  } catch (error) {
    console.error(error);
    res.status(500).end();
  }
});

module.exports = router;
