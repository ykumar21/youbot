const getSongParams = require('./getSongParams.js');

module.exports = async function(app, url, page) {
  let params = await getSongParams(page);

  return new Promise(function(resolve, reject) {
    try {
      const code = url.slice(url.indexOf('=') + 1, url.indexOf('&'));
      const io = app.get('socket.io');

      io.emit('songCode', {
        code: code,
        dur: params.dur,
        title: params.title
      });

      console.log('sending song update request!');
      resolve();
    } catch (err) {
      reject();
    }
  });
};
