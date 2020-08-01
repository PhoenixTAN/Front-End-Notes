```javascript
const url = 'https://jsonplaceholder.typicode.com/todos';
const fetch1 = fetch(url + '/1').then( (response) => {
  console.log('fetch1');
  return "fetch1";
});


const fetch2 = fetch(url + '/2').then( (response) => {
  console.log('fetch2');
  return "fetch2";
});

const fetch3 = fetch(url + '/3').then( (response) => {
  console.log('fetch3');
  return "fetch3";
});

const fetch4 = new Promise( (resolve, reject) => {
  reject('fetch4 reject');
});


const promiseAll = (promises) => {
    
    const N = promises.length;
    let numberOfResolve = 0;
    let resolveList = new Array(N);
    
    return new Promise( (resolve, reject) => {
      for ( let i = 0; i < N; i++ ) {
        Promise.resolve(promises[i])
          .then( (data) => {
            resolveList[i] = data;
            numberOfResolve++;
            if ( numberOfResolve == N ) {
              return resolve(resolveList);
            }
          }, (error) => {
            return reject(error);
          }
        );
      }
    });
}


promiseAll([fetch1, fetch2, fetch3, fetch4])
.then( (data) => {
  console.log('promise all result:', data);
})
.catch( (error) => {
  console.log(error);
});

```


