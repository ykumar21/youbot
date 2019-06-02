const fs = require('fs');

module.exports = async function(page) {
  const cookiePath = '../public/cookies/login.json';
  const prevSession = fs.existsSync(cookiePath);

  if (prevSession) {
    const cookies = JSON.parse(fs.readFileSync(cookiePath));

    if (cookies.length) {
      for (let cookie of cookies) {
        await page.setCookie(cookie);
      }
      console.log('Loaded all cookies');
      return 1;
    }
  } else {
    console.log('no cookies exist');
    return 0;
  }
};
