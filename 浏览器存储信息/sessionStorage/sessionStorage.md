# Window.sessionStorage

The sessionStorage property accesses a session Storage object for the current origin.

sessionStorage is similar to localStorage; **the difference is that while data in localStorage doesn't expire, data in sessionStorage is cleared when the page session ends.**

```javascript
// Save data to sessionStorage
sessionStorage.setItem('key', 'value');

// Get saved data from sessionStorage
let data = sessionStorage.getItem('key');

// Remove saved data from sessionStorage
sessionStorage.removeItem('key');

// Remove all saved data from sessionStorage
sessionStorage.clear();
```

敏感账号一次性登录。
