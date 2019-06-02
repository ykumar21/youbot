'use strict'

// npm modules
const puppeteer = require('puppeteer');

// Components for bot control
const signIn = require('./components/SignIn.js');
const selectMusic = require('./components/SelectMusic.js');
const getSimilarBands = require('./utils/getSimilarBand.js');

// utilities
const loadCookies = require('./utils/loadCookies.js');
const setCookies = require('./utils/setCookies.js');
const updatePlaylist = require('./utils/updatePlaylist.js');

const fs = require('fs');

module.exports = function BotControl(app, options) {

  const io = app.get('socket.io');

  let scrape = async () => {

    try {
      // Connect to a new chromium instance
      const browser = await puppeteer.launch({
        headless: true
      });
      const page = await browser.newPage();

      page.setViewport({
        width: 1920,
        height: 1080
      });

      const cookieStatus = await loadCookies(page);

      await page.goto('https://youtube.com');

      // The bot is now signed in
      // Current Page: Homepage

      let counter = 0; // Stores the number of songs that need to be served to the user

      await musicController();

      async function musicController() {
        let similarBands = [];
        await getSimilarBands(options.baseBand)
                  .then((response) => {
                    // Make a new copy of response
                    similarBands = response.slice();
                    console.log('Fetched band list!');
                  })
                  .catch((err) => {
                    throw err;
                  });

        await selectMusic(page, similarBands);

        await page.waitFor(5000);

        const currUrl = await page.url();

        console.log(currUrl);

        await updatePlaylist(app, currUrl, page)
                  .then(() => {
                    console.log('playlist updated!');
                    counter++;
                  })
                  .catch((err) => {
                    console.log(err);
                  });

        if (counter < 10) {
          await musicController();
        } else {
          await browser.close();
          io.emit('playlistGenerated');
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  scrape().then(() => {
    console.log('playlist generation complete!');
  });
};
