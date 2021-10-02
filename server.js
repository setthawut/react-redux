const webpack = require("webpack");
const webpackDevMiddleware = require("webpack-dev-middleware");
const webpackHotMiddleware = require("webpack-hot-middleware");
const express = require("express");
const config = require("./webpack.config");
const multiparty = require("connect-multiparty");
const bodyparser = require("body-parser");
const path = require("path");
const fs = require("fs");

const compiler = webpack(config);
const MuiltiPartyMiddleware = multiparty({ uploadDir: "./images" });

const app = express();
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());
app.use(
  webpackDevMiddleware(compiler, {
    publicPath: config.output.publicPath,
    historyApiFallback: true,
  }),
);

app.use(webpackHotMiddleware(compiler));

app.use(express.static("uploads"));
app.use(express.static("public"));
app.use(express.static("dist"));
app.use("/bower_components", express.static(__dirname + "/bower_components"));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.post("/upload", MuiltiPartyMiddleware, (req, res) => {
  var TempFile = req.files.upload;
  var TempPathfile = TempFile.path;

  const targetPathUrl = path.join(__dirname, "./uploads/" + TempFile.name);

  if (
    path.extname(TempFile.originalFilename).toLowerCase() === ".png" ||
    ".jpg"
  ) {
    fs.rename(TempPathfile, targetPathUrl, (err) => {
      res.status(200).json({
        uploaded: true,
        url: `/${TempFile.originalFilename}`,
      });

      if (err) return console.log(err);
    });
  }
});

app.listen(8096, (err) => {
  if (err) {
    return console.error(err); // eslint-disable-line no-console
  }
  console.log("Listening at http://localhost:8096"); // eslint-disable-line no-console
});
