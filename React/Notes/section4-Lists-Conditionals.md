# Rendering Lists and Conditional Content

## 问号表达式的使用
```javascript
class App extends Component {

  state = {
    persons: [
      { name: 'Max', age: 28 },
      { name: 'Manu', age: 29 },
      { name: 'Stephanie', age: 26 }
    ],
    otherState: 'some other value',
    showName: false     // 是否显示名字
  }

  // handler
  togglePersonsHandler = () => {
    const doesShow = this.state.showName;
    this.setState({showName: !doesShow});
  }

  render() {
    return (
      <div className="App">
          <h1>Hi, I'm a React App</h1>
          <p>This is really working!</p>
          // 事件监听
          <button onClick={this.togglePersonsHandler}>Switch Name</button>
          {
              // 问号表达式
            this.state.showName ? 
            <div>
              <Person name={this.state.persons[0].name} age={this.state.persons[0].age}></Person>
              <Person name={this.state.persons[1].name} age={this.state.persons[1].age}></Person>
              <Person name={this.state.persons[2].name} age={this.state.persons[2].age}>My hobbies: Racing</Person>
            </div>
            : null
          }
      </div>
    );
  }
}
```

这样做很萌，可以用if else.

## if
```javascript
render() {
    let persons = null;

    if ( this.state.showName ) {
      persons = (
        <div>
          <Person name={this.state.persons[0].name} age={this.state.persons[0].age}></Person>
          <Person name={this.state.persons[1].name} age={this.state.persons[1].age}></Person>
          <Person name={this.state.persons[2].name} age={this.state.persons[2].age}>My hobbies: Racing</Person>
        </div>
      );
    }

    return (
      <div className="App">
          <h1>Hi, I'm a React App</h1>
          <p>This is really working!</p>
          <button onClick={this.togglePersonsHandler}>Switch Name</button>
          {
            persons
          }
      </div>
    );
  }
```


## Outputting lists
```javascript
if ( this.state.showName ) {
      persons = (
        <div>
          {
            this.state.persons.map( person => {
              return <Person name={person.name} age={person.age}></Person>
            })
          }
          </div>
      );
    }
```

## 点击元素删除元素
```javascript
class App extends Component {

  state = {
    persons: [
      { name: 'Max', age: 28 },
      { name: 'Manu', age: 29 },
      { name: 'Stephanie', age: 26 }
    ],
    otherState: 'some other value',
    showName: false
  }

  togglePersonsHandler = () => {
    const doesShow = this.state.showName;
    this.setState({showName: !doesShow});
  }

  deletePersonHandler = (personIndex) => {
    const persons = this.state.persons;
    persons.splice(personIndex, 1);
    this.setState({persons: persons});
  }

  render() {
    let persons = null;

    if ( this.state.showName ) {
      persons = (
        <div>
          {
            this.state.persons.map( (person, index) => {
              return <Person 
                        name={person.name} 
                        age={person.age}
                        click={ () => this.deletePersonHandler(index) }
                      >
                      </Person>
            })
          }
          </div>
      );
    }

    return (
      <div className="App">
          <h1>Hi, I'm a React App</h1>
          <p>This is really working!</p>
          <button onClick={this.togglePersonsHandler}>Switch Name</button>
          {
            persons
          }
      </div>
    );
  }
}
```

```javascript
const person = (props) => {
    return (
        <div>
            <p onClick={props.click}>I'm {props.name} and I am {props.age} years old.</p>
            <p>{props.children}</p>
        </div>
    );
}
```

## Lists & Keys
为什么要加key? why key
这样子高效率一点，因为React就能知道哪些元素要变，哪些元素不要变。？？？

官方文档这么说：
Keys help React identify which items have changed, are added, or are removed. Keys should be given to the elements inside the array to give the elements a stable identity:

```javascript
class App extends Component {

  state = {
    persons: [
      { id: '134', name: 'Max', age: 28 },
      { id: '432', name: 'Manu', age: 29 },
      { id: '321', name: 'Stephanie', age: 26 }
    ],
    otherState: 'some other value',
    showName: false
  }

  togglePersonsHandler = () => {
    const doesShow = this.state.showName;
    this.setState({showName: !doesShow});
  }

  deletePersonHandler = (personIndex) => {
    // const persons = this.state.persons.slice();
    const persons = [...this.state.persons];
    persons.splice(personIndex, 1);
    this.setState({persons: persons});
  }

  render() {
    let persons = null;
    if ( this.state.showName ) {
      persons = (
        <div>
          {
            this.state.persons.map( (person, index) => {
              return <Person 
                        name={person.name} 
                        age={person.age}
                        key={person.id}  // 为什么，这个好像是关键字
                        click={ () => this.deletePersonHandler(index) }
                      >
                      </Person>
            })
          }
          </div>
      );
    }

    return (
      <div className="App">
          <h1>Hi, I'm a React App</h1>
          <p>This is really working!</p>
          <button onClick={this.togglePersonsHandler}>Switch Name</button>
          {
            persons
          }
      </div>
    );
  }
}
```

## 为什么要用immutable state？为什么不要直接修改state？而是重新生成一个对象去替代原来的state
https://www.jianshu.com/p/da84ae0804a3

直接修改state会导致state不可预期。来看一个例子。

to do

```javascript
class App extends Component {

  state = {
    persons: [
      { id: '134', name: 'Max', age: 28 },
      { id: '432', name: 'Manu', age: 29 },
      { id: '321', name: 'Stephanie', age: 26 }
    ],
    otherState: 'some other value',
    showName: false
  }

  nameChangedHandler = ( event, id ) => {
    // The findIndex() method returns the index of the first element in the array 
    // that satisfies the provided testing function.
    const personIndex = this.state.persons.findIndex( p => {
      return p.id === id;
    }); 

    // 我们不要直接改变state，我们生成一个对象
    const person = {
      ...this.state.persons[personIndex]
    };

    person.name = event.target.value;   // 修改目标 
    const persons = [...this.state.persons];    // spread syntax make a deep copy
    persons[personIndex] = person;
    
    // now we change the state
    this.setState({persons: persons});  // 这样整个都会渲染
  }

  togglePersonsHandler = () => {
    const doesShow = this.state.showName;
    this.setState({showName: !doesShow});
  }

  render() {
    let persons = null;
    if ( this.state.showName ) {
      persons = (
        <div>
          {
            this.state.persons.map( (person, index) => {
              return <Person 
                        name={person.name} 
                        age={person.age}
                        key={person.id} 
                        changed={ (event) => this.nameChangedHandler(event, person.id)}
                      >
                      </Person>
            })
          }
          </div>
      );
    }

    return (
      <div className="App">
          <h1>Hi, I'm a React App</h1>
          <p>This is really working!</p>
          <button onClick={this.togglePersonsHandler}>Switch Name</button>
          {
            persons
          }
      </div>
    );
  }
}
```
```javascript
const person = (props) => {
    return (
        <div>
            <p onClick={props.click}>I'm {props.name} and I am {props.age} years old.</p>
            <p>{props.children}</p>
            <input type="text" onChange={props.changed}></input>
        </div>
    );
}
```
