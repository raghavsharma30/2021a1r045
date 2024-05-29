const axios = require('axios');
const fs = require('fs');

const data = {
    companyName: "raghavsharma",
    clientID: "b141565e-359d-449b-8b3e-57255fd08bbe",
    clientSecret: "FulGGgoUyIohsSaO",
    ownerName: "Raghav",
    ownerEmail: "raghavsharma301103@gmail.com",
    rollNo: "2021a1r045"
};

axios.post('http://20.244.56.144/test/auth', data)
  .then(response => {
    fs.writeFile('auth.json', JSON.stringify(response.data, null, 2), (err) => {
      if (err) {
        console.error('Error writing to file:', err);
      } else {
        console.log('Response saved to auth.json');
      }
    });
  })
  .catch(error => {
    console.error('Error:', error);
  });