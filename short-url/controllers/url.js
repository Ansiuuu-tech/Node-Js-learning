const { nanoid } = require("nanoid");
const Url = require("../models/url");   
async function handleGenerateNewShortUrl(req, res) {
    try {
        const longUrl = req.body.longUrl || req.body.url || req.body.long_url;
        const prefersJson = req.is("application/json") || req.get("accept")?.includes("application/json");

        if (!longUrl) {
            if (!prefersJson) {
                return res.status(400).render("home", {
                    shortUrl: null,
                    error: "Please provide a valid URL",
                });
            }

            return res.status(400).json({
                error: "longUrl is required",
                hint: "Send POST /url with JSON like { \"longUrl\": \"https://example.com\" }"
            });
        }

        const shortId = nanoid(8);
        await Url.create({
            shortId,
            longUrl,
            visitHistory: [],
            createdBy: req.user.id
        });

        if (!prefersJson) {
            const baseUrl = `${req.protocol}://${req.get("host")}`;
            return res.status(201).render("home", {
                shortUrl: `${baseUrl}/${shortId}`,
                error: null,
            });
        }

        return res.json({ shortId });
    } catch (error) {
        const prefersJson = req.is("application/json") || req.get("accept")?.includes("application/json");
        if (!prefersJson) {
            return res.status(500).render("home", {
                shortUrl: null,
                error: "Failed to create short URL",
            });
        }

        return res.status(500).json({ error: "Failed to create short URL" });
    }

}

async function handleGetAnalytics(req, res) {
    const shortId = req.params.shortId;
    const result = await Url.findOne({ shortId });
    if (!result) {
        return res.status(404).json({ error: "Short URL not found" });
    }
    return res.json({totalClicks:result.visitHistory.length, visitHistory:result.visitHistory});
}
module.exports = {
    handleGenerateNewShortUrl,
    handleGetAnalytics
}