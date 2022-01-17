import axios from 'axios'

const simpleGetCall = (url) => {
  const headers = {
    'Content-Type': 'application/json;charset=UTF-8',
    "Access-Control-Allow-Origin": "*",
  }
  return axios.get(url, {
    headers: headers,
  })
    .then(function (response) {
      return response
    })
    .catch(function (error) {
      return error
    });
}


const simplePostCall = async (url, body) => {
  const headers = {
    'Content-Type': 'application/json;charset=UTF-8',
    crossorigin: true,
    'Access-Control-Allow-Credentials': true,
    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
    "Access-Control-Allow-Origin": "*",
  }
  return axios.post(url, body, {
    headers: headers,
  })
    .then(function (response) {
      return response
    })
    .catch(function (error) {
      return error
    });
}

export {
  simpleGetCall,
  simplePostCall
}