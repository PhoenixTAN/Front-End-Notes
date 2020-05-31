

```javascript
// In this example, we have defined a constructor function, like so:
function Person(first, last, age, gender, interests) {
    // property and method definitions
    this.name = {
        'first': first,
        'last' : last
    };
    this.age = age;
    this.gender = gender;
    //...see link in summary above for full definition
}

// We have then created an object instance like this:
let person1 = new Person('Bob', 'Smith', 32, 'male', ['music', 'skiing']);

console.log(Person.prototype);
console.log(Object.prototype);

let person2 = Object.create(person1);

person2.__proto__   // This will return the person1 object.

```


