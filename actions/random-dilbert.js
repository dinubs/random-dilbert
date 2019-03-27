const request = require('request');

const API_ENDPOINT = 'https://coolql.cool/graphql';

const FIRST_DILBERT = new Date(1989, 03, 17);

function randomDate(start = FIRST_DILBERT, end = new Date()) {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

function buildQuery(date) {
  return `{
    site(url: "https://dilbert.com/strip/${date}") {
      permalink: select(elem: ".comic-title-link") {
        href
      }
      title: select(elem: ".comic-title") {
        date: select(elem: ".comic-title-date") {
          text
        }
        name: select(elem: ".comic-title-name") {
          text
        }
      }
      image: select(elem: ".img-comic") {
        src: attr(name: "src")
        alt: attr(name: "alt")
      }
    }
  }`;
}

function getDilbert(callback) {
  const options = {
    url: API_ENDPOINT,
    json: true,
    form: {
      query: buildQuery(randomDate()),
    },
    headers: {
      'content-type': 'application/json',
    }
  };
  request.post(options, callback);
}

module.exports = (req, res) => {
  getDilbert(function(error, response, body) {
    res.end(JSON.stringify(body.data.site));
  });
}
