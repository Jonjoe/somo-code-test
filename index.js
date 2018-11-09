/*

 *** Somo - Javascript **********************************************
 *
 * Background:
 * 
 * - This test is just to understand your ability to code
 *   in JavaScript and your understanding of a typical Jira ticket.
 * 
 * - As with any development environment this is an open book task,
 *   so please feel free to use Google or StackOverflow.
 * 
 * - Bonus marks for suitable comments in your code.
 *
 * - If you do not understand a part of the test please add a comment to
 *   your code explaining the issues if it was a Jira comment.
 *
 ********************************************************************

Task: 

1/ Write a function that when run, calls out to the following 
   wikipedia page “https://en.wikipedia.org/wiki/Special:Random” 

2/ Using the html text returned display the value in the "<title>" tag.

3/ Stretch task: Find and display all the values in the "Categories" 
   section which are displayed at the bottom of the page.

The code should compile and run in Coderpad window, and example project
is below for reference please remove and write your own code below.

*/

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
