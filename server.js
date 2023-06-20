/*********************************************************************************
 * WEB322 – Assignment 4
 * I declare that this assignment is my own work in accordance with Seneca Academic Policy.
 * No part of this assignment has been copied manually or electronically from any other source
 * (including web sites) or distributed to other students.
 *
 * Name: Hephzibah Nick-Oshomah
 * Student ID: 180580219
 * Date: 19/06/2023
 *
 ********************************************************************************/
var HTTP_PORT = process.env.PORT || 8080;
var express = require("express");
var path = require("path");
var data = require("./modules/officeData.js");
var app = express();

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

// // setup http server to listen on HTTP_PORT
// app.listen(HTTP_PORT, () => {
//   console.log("server listening on port: " + HTTP_PORT);
// });

// setup a 'route' to listen on the default url path
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/views/home.html"));
});
app.get('/storefront', (req, res) => {
  res.sendFile(path.join(__dirname, '/views/storefront.html'));
});
app.get("/audio", (req, res) => {
  res.sendFile(path.join(__dirname, "/views/audio.html"));
});
app.get("/video", (req, res) => {
  res.sendFile(path.join(__dirname, "/views/video.html"));
});
app.get("/list", (req, res) => {
  res.sendFile(path.join(__dirname, "/views/list.html"));
});
app.get("/table", (req, res) => {
  res.sendFile(path.join(__dirname, "/views/table.html"));
});

app.get("/PartTimer", (req, res) => {
  data.getPartTimers().then((data) => {
    res.json(data);
  });
});
app.get("/employee/:employeeNum", (req, res) => {
  data
    .getEmployeeByNum(req.params.employeeNum)
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.json({ message: "no results" });
    });
});

app.use((req, res) => {
  res.status(404).send("Page Not Found");
});
data
  .initialize()
  .then(function () {
    app.listen(HTTP_PORT, function () {
      console.log("app listening on: " + HTTP_PORT);
    });
  })
  .catch(function (err) {
    console.log("unable to start over: " + err);
  });
