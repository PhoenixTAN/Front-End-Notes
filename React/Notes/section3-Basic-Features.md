# Understanding the basic features and syntax

## Build Workflow

### npm node package management

### Bundler 
Recommended: Webpack

### Complier (Next-Gen Javascript)
Babel + Preset

## Creating a React app
https://github.com/facebook/create-react-app
1. Download node.js just for the npm tool.
2. 
```
$ npm install create-react-app -g
```
-g means install globally in your machine.

```
$ npm install create-react-app -g
C:\Users\tanzi\AppData\Roaming\npm\create-react-app -> C:\Users\tanzi\AppData\Roaming\npm\node_modules\create-react-app\index.js
+ create-react-app@3.4.1
added 98 packages from 46 contributors in 5.558s

```

3. 
```
$ create-react-app ReactHelloApp
```

会遇到问题
```
create-react-app : File C:\Users\tanzi\AppData\Roaming\npm\create-react-app.ps1 cannot be loaded because running 
scripts is disabled on this system.
```

怎么解决：
- Run the window powershell as an administrator.
```
$ set-executionpolicy remotesigned
```

4. 
```
$ npm start
```

## Folder Structure
- root
    - node_modules
    - public
        - index.html
        - manifest.json: some style settings for index.html
    - src
        - App.css
        - index.css
        - App.js
        - index.js: 调用serviceWorker.js. Pre-cache our js files.
        - serviceWorker.js
        - App.test.js: create unit tests for the different units.
    - package-lock.json
    - package.json
        - dependency: react, react-dom, react-scripts
        - scripts: start, build, test, eject


## Component Class
在index.js里面，有一个root react component,其他自定义的div都放在app.js里面.

App.js里面，我们export了App component,从index.js里面import,

## JSX (syntax extension to JavaScript)
在app.js里面
```javascript
import React, {Component} from 'react';
import './App.css';

class App extends Component {
  render() {
    return React.createElement('div', {className: 'header'}, React.createElement('h1', null, 'Hello React App'));
  }
}

export default App;

```
- className用来指定css style.为什么不用class，因为class已经是关键字。

- 我们不是用的html tag，而是react library提供的关键字。

- 我们不能写多个tag在一个render()里面。

```javascript
class App extends Component {
    render() {
        return (
            <div className="App">
                <h1>Hi, I'm a React App</h1>
                <p>This is really working!</p>
            </div>
        );
    }
}
```

## Creating a Functional Component
自定义标签
- src
    - Person
        - Person.js

```javascript
import React from 'react';

const person = () => {
    return <p>I'm a person.</p>
}

export default person;

```

- src
    - App.js

```javascript
import React, {Component} from 'react';
import './App.css';

import Person from './Person/Person'

class App extends Component {
  render() {
    return (
      <div className="App">
          <h1>Hi, I'm a React App</h1>
          <p>This is really working!</p>
          <Person></Person>
          <Person />
      </div>
    );
  }
}

export default App;
```

## 动态内容

### 随机数加到标签内容里面。
```javascript
import React from 'react';

const person = () => {
return <p>I'm a person and I am {Math.floor(Math.random()*30)} years old.</p>
}

export default person;

```
这样只能执行一句statement.

### 从tag中传参数 props and props.children

App.js
```javascript
class App extends Component {
  render() {
    return (
      <div className="App">
          <h1>Hi, I'm a React App</h1>
          <p>This is really working!</p>
          <Person name="max" age="age"></Person>
          <Person name="Manu" age="29"></Person>
          <Person name="Stephanie" age="26">My hobbies: Racing</Person>
          <Person />
      </div>
    );
  }
}
```

Person.js
```javascript 
import React from 'react';

const person = (props) => {
    return <p>I'm {props.name} and I am {props.age} years old.</p>
}

export default person;
```

props意思是properties.

这样的话，Myhobbies没有显示出来，这需要用到props.children.
```javascript
const person = (props) => {
    return (
        <div>
            <p>I'm {props.name} and I am {props.age} years old.</p>
            <p>{props.children}</p>
        </div>
    );
}
```
这样做，没有children的person标签会出现空的\<p>标签。

```
Hi, I'm a React App
This is really working!

I'm max and I am age years old.

I'm Manu and I am 29 years old.

I'm Stephanie and I am 26 years old.

My hobbies: Racing

I'm and I am years old.
```

## state (A property of Component)
```javascript
class App extends Component {

  state = {
    persons: [
      { name: 'Max', age: 28 },
      { name: 'Manu', age: 29 },
      { name: 'Stephanie', age: 26 }
    ]
  }

  render() {
    return (
      <div className="App">
          <h1>Hi, I'm a React App</h1>
          <p>This is really working!</p>
          <button>Switch Name</button>
          <Person name={this.state.persons[0].name} age={this.state.persons[0].age}></Person>
          <Person name={this.state.persons[1].name} age={this.state.persons[1].age}></Person>
          <Person name={this.state.persons[2].name} age={this.state.persons[2].age}>My hobbies: Racing</Person>
          <Person />
      </div>
    );
  }
}
```

## 事件监听例子
```javascript
class App extends Component {

  state = {
    persons: [
      { name: 'Max', age: 28 },
      { name: 'Manu', age: 29 },
      { name: 'Stephanie', age: 26 }
    ]
  }

  switchNameHandler = () => {
    console.log('Was clicked!');
  }

  render() {
    return (
      <div className="App">
          <h1>Hi, I'm a React App</h1>
          <p>This is really working!</p>
          <button onClick={this.switchNameHandler}>Switch Name</button>
          <Person name={this.state.persons[0].name} age={this.state.persons[0].age}></Person>
          <Person name={this.state.persons[1].name} age={this.state.persons[1].age}></Person>
          <Person name={this.state.persons[2].name} age={this.state.persons[2].age}>My hobbies: Racing</Person>
          <Person />
      </div>
    );
  }
}
```

注意几点：
1. onClick的C要大写。
2. {}里面是执行语句。所以，函数不要加括号，理解为我们值传递这个函数指针。

## Manipulating the State

```javascript
class App extends Component {

  state = {
    persons: [
      { name: 'Max', age: 28 },
      { name: 'Manu', age: 29 },
      { name: 'Stephanie', age: 26 }
    ],
    otherState: 'some other value'
  }

  switchNameHandler = () => {
    console.log('Was clicked!');
    // DON'T DO THIS!! this.state.persons[0].name = "Maximilian";
    this.setState({persons: [
      { name: 'Maxxxxx', age: 28 },
      { name: 'Manu', age: 29 },
      { name: 'Stephanie', age: 99 }
    ]});
  }

  render() {
    return (
      <div className="App">
          <h1>Hi, I'm a React App</h1>
          <p>This is really working!</p>
          <button onClick={this.switchNameHandler}>Switch Name</button>
          <Person name={this.state.persons[0].name} age={this.state.persons[0].age}></Person>
          <Person name={this.state.persons[1].name} age={this.state.persons[1].age}></Person>
          <Person name={this.state.persons[2].name} age={this.state.persons[2].age}>My hobbies: Racing</Person>
          <Person />
      </div>
    );
  }
}
```

注意：
1. 如果要在类的方法里面用this，这个方法就必须用=>来定义，this才能scope到this class.


## Function Components Naming
We'll learn how to manage state in functional components (instead of class-based components).

import React, {useState} from 'react';


```javascript
import React, {useState} from 'react';
import './App.css';

import Person from './Person/Person'

const App = props => {

  const [personsState, setPersonState] = useState(
    {
      persons: [
        { name: 'Max', age: 28 },
        { name: 'Manu', age: 29 },
        { name: 'Stephanie', age: 26 }
      ],
      otherState: 'some other value'
    }
  );

  const switchNameHandler = () => {
    console.log('Was clicked!');
    // DON'T DO THIS!! this.state.persons[0].name = "Maximilian";
    setPersonState({persons: [
      { name: 'Maxxxxx', age: 28 },
      { name: 'Manu', age: 29 },
      { name: 'Stephanie', age: 99 }
    ]});
  }

  return (
    <div className="App">
        <h1>Hi, I'm a React App</h1>
        <p>This is really working!</p>
        <button onClick={switchNameHandler}>Switch Name</button>
        <Person name={personsState.persons[0].name} age={personsState.persons[0].age}></Person>
        <Person name={personsState.persons[1].name} age={personsState.persons[1].age}></Person>
        <Person name={personsState.persons[2].name} age={personsState.persons[2].age}>My hobbies: Racing</Person>
        <Person />
    </div>
  );
}

export default App;
```
useState returns two elements:
- the current state.
- the function that allows us to update the state.
- 注意，这样的Function Components开头要大写。
- **这样做，otherState会被覆盖掉。如果要保留，我们可以再用一次useState.**


## stateless components v.s. stateful components
尽量少用stateful components.

## Passing Method Reference Between Components

```javascript
import React, {Component} from 'react';
import './App.css';

import Person from './Person/Person'

class App extends Component {

  state ={
      persons: [
        { name: 'Max', age: 28 },
        { name: 'Manu', age: 29 },
        { name: 'Stephanie', age: 26 }
      ]
  }

  switchNameHandler = () => {
    this.setState({persons: [
      { name: 'Maxxxxx', age: 28 },
      { name: 'Manu', age: 29 },
      { name: 'Stephanie', age: 99 }
    ]});
  }
  render() {
    return (
      <div className="App">
          <h1>Hi, I'm a React App</h1>
          <p>This is really working!</p>
          <button onClick={this.switchNameHandler}>Switch Name</button>
          <Person 
            name={this.state.persons[0].name} 
            age={this.state.persons[0].age}
            click={this.switchNameHandler}
          >
          </Person>
          <Person name={this.state.persons[1].name} age={this.state.persons[1].age}></Person>
          <Person name={this.state.persons[2].name} age={this.state.persons[2].age}>My hobbies: Racing</Person>
          
          <Person />
      </div>
    );
  }
  
}

export default App;
```

```javascript
import React from 'react';

const person = (props) => {
    return (
        <div>
            <p onClick={props.click}>I'm {props.name} and I am {props.age} years old.</p>
            <p>{props.children}</p>
        </div>
    );
}

export default person;
```

怎么传递参数呢？
```javascript
switchNameHandler = (newName) => {
    this.setState({persons: [
      { name: newName, age: 28 },
      { name: 'Manu', age: 29 },
      { name: 'Stephanie', age: 99 }
    ]});
  }
  render() {
    return (
      <div className="App">
          <h1>Hi, I'm a React App</h1>
          <p>This is really working!</p>
          <button onClick={this.switchNameHandler.bind(this, 'newwwwName')}>Switch Name</button>
          <Person 
            name={this.state.persons[0].name} 
            age={this.state.persons[0].age}
            click={this.switchNameHandler.bind(this, 'nnnnnnnnn')}
          >
          </Person>
          <Person name={this.state.persons[1].name} age={this.state.persons[1].age}></Person>
          <Person name={this.state.persons[2].name} age={this.state.persons[2].age}>My hobbies: Racing</Person>
          
          <Person />
      </div>
    );
```

还有另一种方法，但是这种方法不高效。
I don't understand.
```javascript
<button onClick={ () => this.switchNameHandler("aaaaaa") }>Switch Name</button>
```

## Adding styling with stylesheets
给component加CSS.

方法一：外部式
```css
.Person {
    width: 60%;

    margin: auto;

    box-shadow: 0 2px 3px #ccc;

    padding: 16px;

    text-align: center;
}
```

```javascript
import React from 'react';

import './Person.css'

const person = (props) => {
    return (
        <div className="Person">
            <p onClick={props.click}>I'm {props.name} and I am {props.age} years old.</p>
            <p>{props.children}</p>
            <input type="text" onChange={props.changed}></input>
        </div>
    );
}

export default person;
```

方法二: inline style
```javascript
render() {

    const myStyle = {
      backgroundColor: 'white',
      font: 'inherit',
      border: '1px solid blue',
      padding: '8px',
      cursor: 'pointer'
    };

    return (
      <div className="App">
          <h1>Hi, I'm a React App</h1>
          <p>This is really working!</p>
          <button 
            style={myStyle} 
            onClick={ () => this.switchNameHandler("aaaaaa")}>
              Switch Name
          </button>
          <Person 
            name={this.state.persons[0].name} 
            age={this.state.persons[0].age}
            click={this.switchNameHandler.bind(this, 'nnnnnnnnn')}
            changed={this.nameChangeHandler}
          >
          </Person>
          <Person name={this.state.persons[1].name} age={this.state.persons[1].age}></Person>
          <Person name={this.state.persons[2].name} age={this.state.persons[2].age}>My hobbies: Racing</Person>

      </div>
    );
  }
```

方法三：用第三方库，写在\<head>里面

