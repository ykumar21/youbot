const pup = require('./bot.js');

module.exports = function(app) {
  app.get('/', function(req, res) {
    res.render('index');
  });

  app.get('/room/:band', function(req, res) {
    pup(app, {
      username: process.env.BOT_EMAIL,
      password: process.env.BOT_PASS,
      baseBand: req.params.band,
    });

    res.render('player');
  });
};
