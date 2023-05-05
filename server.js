const express = require("express");
const app = express();
const path = require("path");
const jimp = require("jimp");
const fs = require("fs");
const sharp = require("sharp");
const bodyParser = require("body-parser");
const { request } = require("http");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");

app.get("/score", (req, res) => {
  res.render("score");
});
app.get("/blur1", (req, res) => {
  res.render("1");
});
app.get("/blur2", (req, res) => {
  res.render("2");
});
app.get("/blur3", (req, res) => {
  res.render("3");
});
app.get("/blur4", (req, res) => {
  res.render("4");
});

app.post("/makeblur", (req, res) => {
  const id = req.query.id;
  const clarity = parseInt(req.body.imageclarity);

  jimp
    .read(`public/images/${id}src.jpeg`)
    .then((image) => {
      image.resize(clarity, clarity, jimp.RESIZE_BEZIER);
      image.write(`public/images/${id}target.jpeg`, (err, data) => {
        const mydata = fs.readFileSync(`public/images/${id}target.jpeg`);
        image.getBase64(jimp.MIME_JPEG, (err, data) => {
          res.send(mydata);
        });
      });
    })
    .catch((err) => {
      console.log(err);
    });
});
app.get("/", function (req, res) {
  res.render("enter");
});

app.listen(3000, (err) => {
  if (err) throw err;
  console.log("app started on port 3000...");
});
