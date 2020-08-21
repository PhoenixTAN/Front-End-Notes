# Built-in collection type and function. Array, Object, Map, Set

## Array

https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array

See the notes before.

## Object

https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object

Constructor

Object()

Creates a new Object object. It is a wrapper for the given value.

```javascript
let o = new Object()
o.foo = 42

console.log(o)
// Object { foo: 42 }
```

Object.create()

Creates a new object with the specified prototype object and properties.


## Map
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map

The Map object holds key-value pairs and remembers **the original insertion order of the keys**.

```javascript
let myMap = new Map()   // Constructor
myMap.set('bla','blaa')
myMap.set('bla2','blaa2')
console.log(myMap)  // Map { 'bla' => 'blaa', 'bla2' => 'blaa2' }

myMap.has('bla')    // true
myMap.delete('bla') // true
console.log(myMap)  // Map { 'bla2' => 'blaa2' }
```

### Example
```javascript
let myMap = new Map()

let keyString = 'a string'
let keyObj    = {}
let keyFunc   = function() {}

// setting the values
myMap.set(keyString, "value associated with 'a string'")
myMap.set(keyObj, 'value associated with keyObj')
myMap.set(keyFunc, 'value associated with keyFunc')

myMap.size              // 3

// getting the values
myMap.get(keyString)    // "value associated with 'a string'"
myMap.get(keyObj)       // "value associated with keyObj"
myMap.get(keyFunc)      // "value associated with keyFunc"

myMap.get('a string')    // "value associated with 'a string'"
                         // because keyString === 'a string'
myMap.get({})            // undefined, because keyObj !== {}
myMap.get(function() {}) // undefined, because keyFunc !== function () {}
```

### Using NaN as Map keys
```javascript
let myMap = new Map()
myMap.set(NaN, 'not a number')

myMap.get(NaN) 
// "not a number"

let otherNaN = Number('foo')
myMap.get(otherNaN) 
// "not a number"
```

### Iterating Map with for..of
```javascript
let myMap = new Map()
myMap.set(0, 'zero')
myMap.set(1, 'one')

for (let [key, value] of myMap) {
  console.log(key + ' = ' + value)
}
// 0 = zero
// 1 = one

for (let key of myMap.keys()) {
  console.log(key)
}
// 0
// 1

for (let value of myMap.values()) {
  console.log(value)
}
// zero
// one

for (let [key, value] of myMap.entries()) {
  console.log(key + ' = ' + value)
}
// 0 = zero
// 1 = one
```

### Iterating Map with forEach()
```javascript
myMap.forEach(function(value, key) {
  console.log(key + ' = ' + value)
})
// 0 = zero
// 1 = one
```

### Relation with Array objects
```javascript
let kvArray = [['key1', 'value1'], ['key2', 'value2']]

// Use the regular Map constructor to transform a 2D key-value Array into a map
let myMap = new Map(kvArray)

myMap.get('key1') // returns "value1"

// Use Array.from() to transform a map into a 2D key-value Array
console.log(Array.from(myMap)) // Will show you exactly the same Array as kvArray

// A succinct way to do the same, using the spread syntax
console.log([...myMap])

// Or use the keys() or values() iterators, and convert them to an array
console.log(Array.from(myMap.keys())) // ["key1", "key2"]
```

### Cloning and merging Maps
```javascript
let original = new Map([
  [1, 'one']
])

let clone = new Map(original)

console.log(clone.get(1))       // one
console.log(original === clone) // false (useful for shallow comparison)
```

### Maps can be merged, maintaining key uniqueness:
```javascript
let first = new Map([
  [1, 'one'],
  [2, 'two'],
  [3, 'three'],
])

let second = new Map([
  [1, 'uno'],
  [2, 'dos']
])

// Merge two maps. The last repeated key wins.
// Spread operator essentially converts a Map to an Array
let merged = new Map([...first, ...second])

console.log(merged.get(1)) // uno
console.log(merged.get(2)) // dos
console.log(merged.get(3)) // three
```

### Maps can be merged with Arrays, too:
```javascript
let first = new Map([
  [1, 'one'],
  [2, 'two'],
  [3, 'three'],
])

let second = new Map([
  [1, 'uno'],
  [2, 'dos']
])

// Merge maps with an array. The last repeated key wins.
let merged = new Map([...first, ...second, [1, 'eins']])

console.log(merged.get(1)) // eins
console.log(merged.get(2)) // dos
console.log(merged.get(3)) // three
```

## Set
```javascript
let mySet = new Set()

mySet.add(1)           // Set [ 1 ]
mySet.add(5)           // Set [ 1, 5 ]
mySet.add(5)           // Set [ 1, 5 ]
mySet.add('some text') // Set [ 1, 5, 'some text' ]
let o = {a: 1, b: 2}
mySet.add(o)

mySet.add({a: 1, b: 2})   // o is referencing a different object, so this is okay

mySet.has(1)              // true
mySet.has(3)              // false, since 3 has not been added to the set
mySet.has(5)              // true
mySet.has(Math.sqrt(25))  // true
mySet.has('Some Text'.toLowerCase()) // true
mySet.has(o)       // true

mySet.size         // 5

mySet.delete(5)    // removes 5 from the set
mySet.has(5)       // false, 5 has been removed

mySet.size         // 4, since we just removed one value

console.log(mySet)
// logs Set(4) [ 1, "some text", {…}, {…} ] in Firefox
// logs Set(4) { 1, "some text", {…}, {…} } in Chrome
```

### Iterating Sets
```javascript
// iterate over items in set
// logs the items in the order: 1, "some text", {"a": 1, "b": 2}, {"a": 1, "b": 2} 
for (let item of mySet) console.log(item)

// logs the items in the order: 1, "some text", {"a": 1, "b": 2}, {"a": 1, "b": 2} 
for (let item of mySet.keys()) console.log(item)
 
// logs the items in the order: 1, "some text", {"a": 1, "b": 2}, {"a": 1, "b": 2} 
for (let item of mySet.values()) console.log(item)

// logs the items in the order: 1, "some text", {"a": 1, "b": 2}, {"a": 1, "b": 2} 
// (key and value are the same here)
for (let [key, value] of mySet.entries()) console.log(key)

// convert Set object to an Array object, with Array.from
let myArr = Array.from(mySet) // [1, "some text", {"a": 1, "b": 2}, {"a": 1, "b": 2}]

// the following will also work if run in an HTML document
mySet.add(document.body)
mySet.has(document.querySelector('body')) // true

// converting between Set and Array
mySet2 = new Set([1, 2, 3, 4])
mySet2.size                    // 4
[...mySet2]                    // [1, 2, 3, 4]

// intersect can be simulated via 
let intersection = new Set([...set1].filter(x => set2.has(x)))

// difference can be simulated via
let difference = new Set([...set1].filter(x => !set2.has(x)))

// Iterate set entries with forEach()
mySet.forEach(function(value) {
  console.log(value)
})

// 1
// 2
// 3
// 4
```

### Implementing basic set operations
```javascript
function isSuperset(set, subset) {
    for (let elem of subset) {
        if (!set.has(elem)) {
            return false
        }
    }
    return true
}

function union(setA, setB) {
    let _union = new Set(setA)
    for (let elem of setB) {
        _union.add(elem)
    }
    return _union
}

function intersection(setA, setB) {
    let _intersection = new Set()
    for (let elem of setB) {
        if (setA.has(elem)) {
            _intersection.add(elem)
        }
    }
    return _intersection
}

function symmetricDifference(setA, setB) {
    let _difference = new Set(setA)
    for (let elem of setB) {
        if (_difference.has(elem)) {
            _difference.delete(elem)
        } else {
            _difference.add(elem)
        }
    }
    return _difference
}

function difference(setA, setB) {
    let _difference = new Set(setA)
    for (let elem of setB) {
        _difference.delete(elem)
    }
    return _difference
}

// Examples
let setA = new Set([1, 2, 3, 4])
let setB = new Set([2, 3])
let setC = new Set([3, 4, 5, 6])

isSuperset(setA, setB)          // => true
union(setA, setC)               // => Set [1, 2, 3, 4, 5, 6]
intersection(setA, setC)        // => Set [3, 4]
symmetricDifference(setA, setC) // => Set [1, 2, 5, 6]
difference(setA, setC)          // => Set [1, 2]
```

### Relation with Array objects
```javascript
let myArray = ['value1', 'value2', 'value3']

// Use the regular Set constructor to transform an Array into a Set
let mySet = new Set(myArray)

mySet.has('value1')     // returns true

// Use the spread operator to transform a set into an Array.
console.log([...mySet]) // Will show you exactly the same Array as myArray
```

### Remove duplicate elements from the array
```javascript
// Use to remove duplicate elements from the array 

const numbers = [2,3,4,4,2,3,3,4,4,5,5,6,6,7,5,32,3,4,5]

console.log([...new Set(numbers)]) 

// [2, 3, 4, 5, 6, 7, 32]
```

### Relation with Strings
```javascript
let text = 'India'

let mySet = new Set(text)  // Set ['I', 'n', 'd', 'i', 'a']
mySet.size  // 5

//case sensitive & duplicate ommision
new Set("Firefox")  // Set(7) [ "F", "i", "r", "e", "f", "o", "x" ]
new Set("firefox")  // Set(6) [ "f", "i", "r", "e", "o", "x" ]
```


