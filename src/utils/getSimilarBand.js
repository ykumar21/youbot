const axios = require('axios');

module.exports = async (query, callback) => {
  let baseUrl = 'https://tastedive.com/api/similar?q=';
  let key = process.env.TASTEKID_APIKEY;
  return new Promise(function HandlePromise(resolve, reject) {
    axios({
      method: 'get',
      url: baseUrl + query + '&k=' + key
    })
    .then((response) => {
      resolve(response.data.Similar.Results);
    })
    .catch((err) => {
      throw err;
      reject();
    });
  });

};
