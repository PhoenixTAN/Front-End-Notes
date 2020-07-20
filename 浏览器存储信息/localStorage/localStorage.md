# Window.localStorage
The read-only localStorage property allows you to access a Storage object for the Document's origin; the stored data is saved across browser sessions.

```javascript
localStorage.setItem('myCat', 'Tom');
var cat = localStorage.getItem('myCat');
localStorage.removeItem('myCat');
// Clear all items
localStorage.clear();
```