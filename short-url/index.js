const express = require('express');
const {connectToDb} = require("./connect");
const Url = require("./models/url");
const urlRouter = require("./routes/url");
const staticRouter = require("./routes/staticRouter");
const cookieParser = require("cookie-parser");
const UserRouter=require("./routes/user");
const app = express();
const port = 8001;
const { checkForAuthenticatedUser, restrictTo } = require('./middleware/auth');
connectToDb("mongodb://localhost:27017/short-url").then(()=>{
    console.log("Connected to MongoDB successfully");
})
app.set("view engine", "ejs");
app.set("views", "./views");

app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cookieParser());
app.use( checkForAuthenticatedUser);
app.use("/", staticRouter);
app.get("/test", async (req, res) => {
  return res.render("home", { shortUrl: null, error: null });
});

app.use("/url", restrictTo(["NORMAL"]), urlRouter);
app.use("/user",UserRouter);

app.get("/:shortId", async (req, res) => {
  const shortId = req.params.shortId;
  try {
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
  } catch (error) {
    return res.status(500).render("home", {
      shortUrl: null,
      error: "Something went wrong. Please try again later.",
    });
  }
});
app.listen(port, () => console.log(`Server started at port:${port}`));


