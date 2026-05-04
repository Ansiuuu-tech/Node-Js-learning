const express = require("express");
const path = require("path");
const fs = require("fs");
const app = express();
const multer = require("multer");

const uploadDir = path.join(__dirname, "uploads");
fs.mkdirSync(uploadDir, { recursive: true });

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    return cb(null, uploadDir)
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    const extension = path.extname(file.originalname)
    cb(null, file.fieldname + '-' + uniqueSuffix + extension)
  }
})
const upload = multer({storage})

const port = 8000
app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({extended:false}))
app.use('/uploads', express.static(uploadDir))

app.get("/",(req,res) => {
  return res.render("homepage", { imagePath: null });
})
app.get('/upload', (req, res) => {
  return res.render('homepage', { imagePath: null });
})
app.post('/upload',upload.single('profileImage'),(req,res) => {
    console.log(req.body);
    console.log(req.file);
  return res.render("homepage", { imagePath: `/uploads/${req.file.filename}` });
})
app.listen(port,()=> console.log(`Server is running on port ${port}`))