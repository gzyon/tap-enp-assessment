const express = require("express");
const cors = require("cors");
const db = require("./queries");

const app = express();
app.use(cors());
const port = process.env.PORT || 8080;

// helper functions
function addToDb(longUrl, res) {
  let shortUrl, params;
  if (longUrl != "") {
    shortUrl = Math.random().toString(36).slice(2, 8);
    params = {longUrl: longUrl, shortUrl: shortUrl}
  }
  db.createUrl(params).then(response => {
    res.json({ shortUrl: shortUrl });
  }).catch(error => {
    res.status(500).send(error);
  });
}

app.get('/', (req, res) => {
  res.send('Hello World!');
});

// shortens url and returns to client
app.get('/api/shorten', (req, res) => {
  const longUrl = req.query.longURL;

  // check if url is in db already
  db.getShortUrl(longUrl).then(response => {
    if (response != null) res.status(200).send(response);
    else addToDb(longUrl, res);
  }).catch(error => {
    res.status(500).send(error);
  });
})

// find url in db and redirect
app.get('/:shortUrl', (req, res) => {
  // get shortened URL
  const params = req.params.shortUrl; 
  const shortUrl = params;

  // query db for long url
  db.getLongUrl(shortUrl).then(response => {
    res.redirect(response);
  }).catch(error => {
    console.log(error)
    res.status(500).send(error);
  });
})

app.get('/delete/:shortUrl', (req, res) => {
  console.log(req.params.shortUrl);
  db.deleteEntry(req.params.shortUrl).then(response => {
    res.status(200).send(response);
  }).catch(error => {
    res.status(500).send(error);
  })
})

app.listen(port, () => {
  console.log(`Example app listening at port ${port}`);
})

module.exports = app;