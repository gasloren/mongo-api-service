const axios = require('axios');

// ---------------------------------

const headers = {
  'Content-Type': 'application/json',
  'Api-Key': 'TEST'
};

const base_url = 'http://localhost:3001/mongo';

// --------------------------------

const postData = async (path, data) => {

  try {

    const result = await axios({
      method: 'post',
      url: `${base_url}${path}`,
      headers,
      data
    });

    return result.data; // axios anida otro 'data'

  } catch(err) {

    return {
      error: err.response.data.error
    };

  }

}

module.exports = postData;