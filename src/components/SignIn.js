'use strict';

module.exports = async (page, credentials) => {
  try {
    await page.waitForSelector('paper-button[aria-label = "Sign in"]');
    await page.click('paper-button[aria-label = "Sign in"]');

    await page.waitForNavigation();

    await page.type('input[type="email"]', credentials.username, {delay: 100});

    await page.click('#next');

    await page.waitForSelector('input[type="password"]');
    await page.type('input[type="password"]', credentials.password, {
      delay: 100
    });

    await page.click('#signIn');

    console.log('Signed In!');
  } catch (err) {
    throw err;
  }
};
