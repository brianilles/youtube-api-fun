const router = require("express").Router();
const axios = require("axios");

router.get("/public", (req, res) => {
  /*
        -> This endpoint will request all popular posts from Youtube, Instagram, and Twitter 
        in parallel. 
        -> Then it will normalize and package the data to be sent to the FE.
        -> There are three platforms so at 12 posts per platform each chunk would be 36 posts. 
        -> The FE has 4 a row so that is 9 row before next request (5 for screen buffer)
        -> It's pretty basic an endpoint in it of itself. The hard part will be the parallel requests 
        to the 3rd party apis but it is doable.
    */
  res.send("PUBLIC FEEEEEEEEEEEEEED");
});

// there is a featured section which will show trending hashtags
// featured section will also have a trending accounts page

module.exports = router;
