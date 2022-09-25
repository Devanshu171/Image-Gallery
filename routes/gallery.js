const express = require("express");
const multer = require("multer");
const { ObjectId } = require("../data/database");
const router = express.Router();
const db = require("../data/database");

const storageConfig = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "images");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storageConfig });

router.get("/", async function (req, res) {
  const photos = await db.getDb().collection("users").find().toArray();
  res.render("index", { photos: photos });
});
router.get("/add-image", function (req, res) {
  res.render("add-image");
});
router.post("/add-image", upload.single("image"), async function (req, res) {
  const image = req.file;
  const userData = req.body;
  await db.getDb().collection("users").insertOne({
    name: userData.name,
    filePath: image.path,
  });
  res.redirect("/");
});
router.get("/about", function (req, res) {
  res.render("about");
});
router.get("/delete/:id", async function (req, res) {
  const id = new ObjectId(req.params.id);
  await db.getDb().collection("users").deleteOne({ _id: id });
  res.redirect("/");
});

module.exports = router;
