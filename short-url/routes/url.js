const express = require('express');
const {handleGenerateNewShortUrl,handleGetAnalytics} = require("../controllers/url");
const router = express.Router();

router.post("/", handleGenerateNewShortUrl);
router.get('/analytics/:shortId', handleGetAnalytics);
router.get("/", (req, res) => {
	res.status(405).json({ error: "Use POST /url with longUrl in the request body" });
});

module.exports = router;