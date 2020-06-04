/**
 * Background
 *
 * We would like to send a request to a URL, but the URL may not be ready at that time.
 * Please write a function to implement auto resend the request until succeed.
 */

// type "npm install" in the ternimal to install dependencies.
// type "npm start" in terminal.
const http = require("http");
const baidu = "http://www.baidu1.com";
const maxRetryNumber = 3;
const waitTime = 2000; // ms

// This is an async function that use callback to fetch data from a url

const fetch = (url, callback) => {
  http
    .get(url, resp => {
      let data = "";
      resp.on("data", chunk => (data += chunk));
      resp.on("end", () => callback(null, data));
    })
    .on("error", err => {
      callback(err);
    });
};

// This is an example how to use fetch
// Fetch Success
/*
fetch("http://www.google.com", (err, data) => {
  console.info("fetching www.google.com");
  if (!err) {
    console.info("success", data);
    return;
  }
  console.error("error", err);
});
*/

// Fetch Failed
/*
fetch("http://www.google1234.com", (err, data) => {
  console.info("fetching www.google1234.com");
  if (!err) {
    console.info("success", data);
    return;
  }
  console.error("error", err);
});
*/

// ****** DO NOT MODIFY THE CODE ABOVE ******** //

/* information about fetch */

/**
 * TASK 1: Implement a function that can auto refetch a url
 *  until success or the maximum retry number is reached.
 *
 *  When a fetch is failed, wait 'waitTime' seconds before the next fetch.
 *
 *  Requirement:
 *    1. Implement the function use callback, callback function signiture is same as fetch()
 *    2. Please use fetch(url, callback) function providded above.
 */
const autoRefetch = (url, maxRetryNumber, waitTime, callback) => {
  console.info("Testing autoRefetch...");
  let times = 0;
  const fetchWithDelay = (url, counter) => {
    if ( counter <= 0 ) {
      return callback(new Error("Reach maximum try times."));
    }
    fetch(url, (err, data) => {
      console.info(`Fetch ${maxRetryNumber - counter + 1} time`);
      if (!err) {
        return callback(null, data);
      }
      setTimeout( () => {
        fetchWithDelay(url, counter - 1);
      }, waitTime);
    });
  }
  fetchWithDelay(url, maxRetryNumber);
};

/**
 *  TASK 2: Implement the same function in TASK 1 using Promise
 *
 *  Requirement:
 *    1. Please implement your function use Promise.
 *    2. Please use fetch(url, callback) function providded above.
 */
const fetchPromise = (url) => {
  return new Promise((resolve, reject) => {
    fetch(url, (err, data) => {
      console.info(new Date().getSeconds());
      if (!err) {
        resolve(data);
      }
      reject(err);
    });
  });
};

const autoRefetchPromise = (url, maxRetryNumber, waitTime) => {
  if ( maxRetryNumber <= 0 ) {
    return Promise.reject(new Error("Reach retry limit."));
  }
  
  return fetchPromise(url).catch( (err) => {
    console.info("fail", err);
    return new Promise(resolve => {
      setTimeout(
        () => {
          autoRefetchPromise(url, maxRetryNumber - 1, waitTime);
        }, waitTime);
    });
  });
};

/**
 * TASK 3: Implement the same function in TASK 1 using async/await
 *
 * Requirement:
 *    1. Please implement your function use async/await.
 *    2. Please use fetch(url, callback) function providded above.
 */

const autoRefetchAsync = async (url, maxRetryNumber, timeout) => {
  try {
    console.info(`Fetching Start ${maxRetryNumber}`);
    const data = await fetchPromise(url);
    console.info(`Fetch ${maxRetryNumber} Success`, data);
  }
  catch (err) {
    console.info(`Fetch ${maxRetryNumber} Failed`);
    if ( maxRetryNumber <= 1 ) {
      throw new Error("Reach retry limit");
    }
    return await setTimeout(() => {
      autoRefetchAsync(url, maxRetryNumber - 1, timeout);
    }, timeout);
  }
};

// test autoRefetch
/*
autoRefetch(baidu, maxRetryNumber, waitTime, (err, data) => {
  if (!err) {
    console.info("success", data);
  }
  console.error("error", err);
});
*/

// test autoRefetchPromise
/*
autoRefetchPromise(baidu, maxRetryNumber, waitTime)
.then( data => {
  console.info("success", data);
} )
.catch(
  err => {
    console.error("error", err);
  }
);*/

// test autoRefetchAsync
autoRefetchAsync(baidu, maxRetryNumber, waitTime)
.then( data => {
  console.info("success", data);
} )
.catch(
  err => {
    console.error("error", err);
  }
);


