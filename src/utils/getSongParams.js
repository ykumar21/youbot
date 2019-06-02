module.exports = async function(page) {

  await page.waitFor(4000);

  const params = await page.evaluate(() => {
    const duration = ((document.getElementsByClassName('time-info'))[0]).innerHTML;

    // Each element below returns an array

    const titleWrapper = document.getElementsByClassName('middle-controls')[0];
    const title = (titleWrapper.querySelectorAll('yt-formatted-string'))[0];

    let obj = {
      dur: ((Number(duration.slice(duration.indexOf('/') + 1, duration.indexOf('/') + 3)) * 60) + Number(duration.slice(duration.indexOf('/') + 4, duration.indexOf('/') + 6))) * 1000,
      title: title.innerHTML
    };

    return obj;
  });

  return params;
};
