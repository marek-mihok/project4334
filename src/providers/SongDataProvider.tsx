import React from 'react';

// https://4334.sk/wp-json/wp/v2/song?orderby=date&order=desc&orderby=date&after=2020-05-24T13:00:00

const userAction = async () => {
  const response = await fetch('https://4334.sk/wp-json/wp/v2/song/');
  const myJson = await response.json(); //extract JSON from the http response
  // do something with myJson
  console.log(myJson);
};
