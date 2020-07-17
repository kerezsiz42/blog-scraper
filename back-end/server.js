require('dotenv').config()
const express = require('express');
const server = express();
const cors = require('cors');

server.use(cors());
server.use(express.json());
server.use(express.urlencoded({extended: true}));

const getFilteredLinks = require('./getFilteredLinks');

server.get('/', (req, res) => {
  res.json('Welcome to Blog Scraper API. Use the /getFilteredLinks endpoint to gather posts from blog.risingstack.com.');
});

server.get('/getFilteredLinks', async (req, res) => {
  try {
    console.log(req.query.numberOfPages)
    const success = await getFilteredLinks(req.query.numberOfPages);
    res.json({ success });
  } catch(error) {
    res.status('400').json({ error });
  }
});

server.listen(process.env.PORT, () => {
  console.log(`Server is listening on port ${process.env.PORT}`)
});