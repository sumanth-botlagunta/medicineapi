var express = require("express");
var cors = require("cors");
var mongo = require("mongodb");
const app = express();
const port = process.env.PORT || 5000;
const mongoClient = mongo.MongoClient;
const url = "mongodb+srv://sumanth:12345@sumanth.w8xsd.mongodb.net/medimax?retryWrites=true&w=majority";
app.use(cors());
var db;

app.get("/", (req, res) => {
  res.send("<h1>Hello welcome to Mediapi</h1>");
});

app.get("/covid-medicines/", (req, res) => {
  var query = {};
  if (req.query.covidID) {
    query = { id: Number(req.query.covidID) };
    console.log(query);
  }
  db.collection("covid")
    .find(query)
    .toArray(function (err, result) {
      if (err) throw err;
      res.send(result);
    });
});

mongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {
  if (err) {
    console.log(err);
    return;
  }
  db = client.db("medimax");
  app.listen(port, () => {
    console.log(`Server started on port ${port}`);
  });
});
