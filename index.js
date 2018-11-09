const _ = require("underscore");
const axios = require("axios");
const cheerio = require("cheerio");
const chalk = require("chalk");

// HTML Parser
const parseHTML = content => {
  return cheerio.load(content);
};

// Decoupled API call. Returns resolved promise.
const getContent = () => {
  return axios.get("https://en.wikipedia.org/wiki/Special:Random");
};

// Returns the title tag from a html document
const getTitle = content => {
  return parseHTML(content)("title").html();
};

// Returns a list of categories from a wikipedia html page
const getCats = content => {
  const list = parseHTML(content)(".catlinks ul")
    .children()
    .find("a");

  const catTitles = [];
  list.each((index, element) => {
    catTitles.push(element.attribs.title);
  });

  return catTitles;
};

// Main processor. Dumps transformed content into STDOUT
const run = async () => {
  const res = await getContent();

  const title = getTitle(res.data);
  const categories = getCats(res.data);

  console.log(chalk`{bold Categories for ${title}}`);
  categories.forEach(category => {
    console.log(category);
  });

  console.log("");
};

_.times(10, run);
