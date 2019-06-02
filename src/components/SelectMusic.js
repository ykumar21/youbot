/**
  *Fetches an array of bands similar
  * to a given base band and searches
  * for it on youtube and randomly picks
  * up a song to play
*/

'use strict';

function GetRandomBand(arr) {
  let numBands =  arr.length;
  let num = Math.floor(Math.random() * 5);
  console.log('Selected band: ' + arr[num].Name);
  return arr[num].Name;
}

module.exports = async (page, bands) => {
  try {
    let searchBaseUrl = 'https://music.youtube.com/search?q=';
    await page.goto(searchBaseUrl + GetRandomBand(bands));
    console.log('Searched for similar music!');

    await page.waitFor(4000);

    await page.evaluate(() => {
      document.querySelector('[title="Show song results"]').click();
    });

    await page.waitFor(4000);

    await page.evaluate(() => {
      /**
        * ytd-video renderer refers to the
        * tab element of the videos. els returns
        * an array of songs on screen and el is the
        * image contained in a particular
      */
      const cont = document.querySelectorAll('ytmusic-shelf-renderer');

      const els = cont[0].querySelectorAll('ytmusic-responsive-list-item-renderer');
      const thumbs = els[Math.floor(Math.random() * 10)].querySelectorAll('yt-icon');

      thumbs[0].click();
    });

  } catch (err) {
    throw err;
  }
};
