const express = require('express');
const {connectToDb} = require("./connect");
const urlRouter = require("./routes/url");
const Url = require("./models/url");
const app = express();
const port = 8000;
connectToDb("mongodb://localhost:27017/short-url").then(()=>{
    console.log("Connected to MongoDB successfully");
})
app.set("view engine", "ejs");
app.set("views", "./views");

app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.get("/", (req, res) => {
  return res.render("home", { shortUrl: null, error: null });
});

app.get("/test", async (req, res) => {
  return res.render("home", { shortUrl: null, error: null });
});

app.use("/url", urlRouter);

app.get("/:shortId", async (req, res) => {
  const shortId = req.params.shortId;
  const entry = await Url.findOneAndUpdate(
    { shortId },
    {
      $push: {
        visitHistory: {
          timestamp: Date.now(),
        },
      },
    },
    { new: true }
  );

  if (!entry) {
    return res.status(404).render("home", {
      shortUrl: null,
      error: "Short URL not found",
    });
  }

  return res.redirect(entry.longUrl);
});
app.listen(port, () => console.log(`Server started at port:${port}`));


