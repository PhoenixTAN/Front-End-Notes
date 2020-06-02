/**
 * Background
 *
 * We would like to send a request to a URL, but the URL may not be ready at that time.
 * Please write a function to implement auto resend the request until succeed.
 */

// type "npm start" in terminal
const http = require("http");
const baidu = "http://www.baidu1.com";
const maxRetryNumber = 3;
const waitTime = 2000; // ms

// This is an async function that use callback to fetch data from a url
/*const fetch = (url, callback) => {
  http
    .get(url, resp => {
      let data = "";
      resp.on("data", chunk => (data += chunk));
      resp.on("end", () => callback(null, data));
    })
    .on("error", err => {
      callback(err);
    });
};*/

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
/*const autoRefetch = (url, maxRetryNumber, waitTime, callback) => {
  console.info("Testing autoRefetch...");

  let times = 0;

  function delay() {
    setTimeout(callback, waitTime, url, (err, data) => {
      times++;
      console.info(new Date().getSeconds());
      if (!err) {
        console.info("success", data);
        return;
      }
      console.error("error", err);
      if (times < maxRetryNumber) {
        delay();
      }
    });
  }

  callback(url, (err, data) => {
    console.log(new Date().getSeconds());
    if (!err) {
      console.info("success", data);
      return;
    }
    console.error("error", err);
    times++;
    delay(); // recursion
  });
};*/

/**
 *  TASK 2: Implement the same function in TASK 1 using Promise
 *
 *  Requirement:
 *    1. Please implement your function use Promise.
 *    2. Please use fetch(url, callback) function providded above.
 */
const autoRefetchPromise = (url, maxRetryNumber, waitTime) => {
  // TODO: Write you implementation here
  console.info("Testing autoRefetchPromise...");
  console.info(new Date().getSeconds());
  let fetchPromise = new Promise((resolve, reject) => {
    // re-use fetch(url, callback)
    fetch(url, (err, data) => {
      if (!err) {
        resolve(data);
      }
      reject(err);
    });
  });

  fetchPromise.then(
    // fulfill handler
    data => {
      console.info("success", data);
    },
    // reject handler
    err => {
      console.error("error", err);
      var times = 1;

      function delay() {
        setTimeout(() => {
          fetch(url, (err, data) => {
            times++;
            console.info(new Date().getSeconds());
            if (!err) {
              console.info("success", data);
              return;
            }
            console.error("error", err);
            if (times < maxRetryNumber) {
              delay(); // recursion
            }
          });
        }, waitTime);
      }
      delay(); // call the function above
    }
  );
};

/**
 * TASK 3: Implement the same function in TASK 1 using async/await
 *
 * Requirement:
 *    1. Please implement your function use async/await.
 *    2. Please use fetch(url, callback) function providded above.
 */
/*const autoRefetchAsync = async (url, maxRetryNumber, timeout) => {
  // TODO: Write you implementation here
  console.info("Testing autoRefetchAsync...");
  var times = 0;

  function delay() {
    setTimeout(fetch, waitTime, url, (err, data) => {
      times++;
      console.info(new Date().getSeconds());
      if (!err) {
        console.info("success", data);
        return;
      }
      console.error("error", err);
      if (times < maxRetryNumber) {
        delay();
      }
    });
  }
  let promise = new Promise((resolve, reject) => {
    fetch(url, (err, data) => {
      if (!err) {
        // console.info("success", data);
        resolve(data);
        return;
      }
      console.error("error", err);
      times++;
      delay();
    });
  });

  let result = await promise;
  console.info(result);
};*/

// autoRefetch(baidu, maxRetryNumber, waitTime, fetch);
// autoRefetchPromise(baidu, maxRetryNumber, waitTime);
// autoRefetchAsync(baidu, maxRetryNumber, waitTime);


/**
 * About fetch
 */
const fetch = require("node-fetch");
google = "http://www.google23.com";

// fetch returns a Promise.
/*fetch(google, {method: 'GET'})
.then(res => {
    console.info("success", res);
})
.catch(err => {
    console.error("error", err);
});*/

/*function fetch_retry(url, options, n) {
    console.info(new Date().getSeconds());
    return fetch(url, options)
            .then( (result) => {
                /* on success 
                console.info(result);
            })
            .catch( (err) => {
                console.error("error", err);
                if (n === 1) {
                    return ;
                }
                setTimeout( () => {
                    fetch_retry(url, options, n - 1);   // recursion
                }, 3000);
            });
}*/

const fetch_retry = async (url, options, n) => {
    let error;
    for (let i = 0; i < n; i++) {
        console.info(new Date().getSeconds());
        try {
            await fetch(url, options);
        } catch (err) {
            error = err;
        }
    }
    throw error;
};



fetch_retry(google, {method: 'GET'}, 3);
