const axios = require('axios');
const cheerio  = require('cheerio');

const getLinksFromPage = (pageNumber) => {
  return new Promise(async (resolve, reject) => {
    try {
      let links = [];
      const uri = pageNumber > 1 ? `https://blog.risingstack.com/page/${pageNumber}` : 'https://blog.risingstack.com';
      const html = await axios.get(uri);
      const $ = cheerio.load(html.data);
      $('article').each((i, el) => {
        const article = {};
        article.title = $(el)
          .find('h1')
          .text();
        article.link = $(el)
          .find('h1 > a')
          .attr('href');
        article.link = 'https://blog.risingstack.com' + article.link;
        links.push(article);
      });
      if(pageNumber > 1) {
        const otherLinks = await getLinksFromPage(pageNumber - 1);
        links = links.concat(otherLinks);
      }
      resolve(links);
    } catch {
      reject('Invalid input');
    }
  });
}

const hasLinkToApex = async (article) => {
  try {
    let hasLink = false;
    const html = await axios.get(article.link);
    const $ = cheerio.load(html.data);
    $('.post').find('iframe').remove();
    $('.post a').each((i, el) => {
      const href = $(el).attr('href');
      if(href && href.includes('://risingstack.com')) {
        hasLink = true;
        // You have to return false to stop executing
        return false;
      }
    });
    return hasLink;
  } catch(err) {
    throw err;
  }
}

const getFilteredLinks = async (numberOfPages = 1) => {
  try {
    const links = await getLinksFromPage(numberOfPages);
    const results = [];
    // Filter
    await Promise.all(links.map(async link => {
      const result = await hasLinkToApex(link);
      if(!result) {
        results.push(link);
      }
    }));
    return results;
  } catch(err){
    throw err;
  }
}

module.exports = getFilteredLinks;