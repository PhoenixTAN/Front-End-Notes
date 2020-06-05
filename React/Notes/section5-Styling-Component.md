# Styling Component

## 点击按钮，显示名字，按钮变色。

```javascript
if ( this.state.showName ) {
      persons = (
        <div>
          {
            this.state.persons.map( (person, index) => {
              return <Person 
                        name={person.name} 
                        age={person.age}
                        key={person.id} 
                        click={ () => this.deletePersonHandler(index) }
                        changed={ (event) => this.nameChangedHandler(event, person.id)}
                      >
                      </Person>
            })
          }
          </div>
      );
      buttonStyle.backgroundColor = 'red';  // 这里改改就行
    }

```

## 动态改变className

给一个tag加多个class.使用join

```css
.red {
  color: red;
}

.bold {
  font-weight: bold;
}

```

```javascript
const classes = [];
    if ( this.state.persons.length <= 2 ) {
      classes.push('red');
    }
    if ( this.state.persons.length <= 1 ) {
      classes.push('bold');
    }

    return (
      <div className="App">
          <h1>Hi, I'm a React App</h1>
          <p className={classes.join(' ')}>This is really working!</p>
          <button 
            style={buttonStyle}
            onClick={this.togglePersonsHandler}>
              Switch Name
          </button>
          {
            persons
          }
      </div>
    );
```

## inline styling怎么选择伪元素
第三方库 radium allows us to use inline styles with pseudo selectors and media query.
```
$ npm install radium --save
```
### pseudo selectors
```javascript
import Radium from 'radium';

class App extends Component {

    render() {
        const buttonStyle = {
            backgroundColor: 'green',
            color: 'white',
            font: 'inherit',
            border: '1px solid blue',
            padding: '8px',
            cursor: 'pointer',
            ':hover': {
                backgroundColor: 'lightGreen',
                color: 'red'
            }
        }

        buttonStyle[':hover'] = {
            backgroundColor: 'salmon',
            color: 'black'
        }
    }
}

export default Radium(App);
```

### media queries媒体查询

```javascript
// This is not enough!
const person = (props) => {
    const personStyle = {
        '@media (min-width: 500px)': {
            width: '450px'
        }
    }
    return (
        <div className="Person" style={personStyle}>
            <p onClick={props.click}>I'm {props.name} and I am {props.age} years old.</p>
            <p>{props.children}</p>
            <input type="text" onChange={props.changed}></input>
        </div>
    );
}

```
To use plugins requiring `addCSS` (e.g. keyframes, media queries), please wrap your application in the **StyleRoot** component. Component name: `Object`.

把整个App包裹在一个`\<StyleRoot>`里面。
```javascript
import Radium, {StyleRoot} from 'radium';

// 在render(){} 的 return里面:
return (
      <StyleRoot>
        <div className="App">
          <h1>Hi, I'm a React App</h1>
          <p className={classes.join(' ')}>This is really working!</p>
          <button 
            style={buttonStyle}
            onClick={this.togglePersonsHandler}>
              Switch Name
          </button>
          {
            persons
          }
        </div>
      </StyleRoot>
    );

```

## 第三方库styled-components
先删掉之前Radium的东西
```
$ npm install --save styled-components
```

```javascript
import styled from 'style-components'

const Button = styled.button``
```
This Button variable here is now `a React component` that you can use like any other React component! This unusual backtick syntax is a new JavaScript feature called a `tagged template` literal.

Well, now you can also **call functions with backticks!**

you render our lovely component now (just like any other component: \<Button />)

```javascript
const Button = styled.button`
  background: transparent;
  border-radius: 3px;
  border: 2px solid palevioletred;
  color: palevioletred;
  margin: 0 1em;
  padding: 0.25em 1em;
`
```
As you can see, styled-components lets you write actual CSS in your JavaScript. This means you can use all the features of CSS you use and love, `including (but by far not limited to) media queries, all pseudo-selectors, nesting, etc.`

这就可以写媒体查询和为元素了。

```javascript
import React from 'react';
import styled from 'styled-components';

// styled.div会返回一个Component对象
const StyleDiv = styled.div`
    width: 60%;
    margin: auto;
    border: 1px solid #eee;
    box-shadow: 0 2px 3px #ccc;
    padding: 16px;
    text-align: center;

    @media (min-width: 500px) {
        width: 450px;
    }
`

const person = (props) => {
    const personStyle = {
        '@media (min-width: 500px)': {
            width: '450px'
        }
    }
    return (
        // <div className="Person" style={personStyle}>
        <StyleDiv>
            <p onClick={props.click}>I'm {props.name} and I am {props.age} years old.</p>
            <p>{props.children}</p>
            <input type="text" onChange={props.changed}></input>
        </StyleDiv>

    );
}

export default person;
```

在F12里面，这些style加在了`\<head>`里面。
```html
<style data-styled="active" data-styled-version="5.1.1">
    .bGBzx {
        width:60%;
        margin:auto;
        border:1px solid #eee;
        box-shadow:0 2px 3px #ccc;
        padding:16px;
        text-align:center;
    }
    @media (min-width:500px) {
        .bGBzx {
            width:450px;
        }
    }
</style>
<!-- 这个div的class被自动命名了 -->
<div class="sc-AxjAm bGBzx">
    <p>I'm Max and I am 28 years old.</p>
    <p></p>
    <input type="text">
</div>
```

## Dynamic style

点击按钮后，按钮变红色。

```javascript
import React, {Component} from 'react';
import './App.css';
import Person from './Person/Person'
import styled from 'styled-components'

const StyleButton = styled.button`
  background-color: ${props => props.alt ? 'red' : 'green'};
  color: white;
  font: inherit;
  border: 1px solid blue;
  padding: 8px;
  cursor: pointer;
  &:hover {
    background-color: lightGreen;
    color: red
  }
`;

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
                        key={person.id} 
                        click={ () => this.deletePersonHandler(index) }
                        changed={ (event) => this.nameChangedHandler(event, person.id)}
                      >
                      </Person>
            })
          }
          </div>
      );

    }

    const classes = [];
    if ( this.state.persons.length <= 2 ) {
      classes.push('red');
    }
    if ( this.state.persons.length <= 1 ) {
      classes.push('bold');
    }

    return (
        <div className="App">
          <h1>Hi, I'm a React App</h1>
          <p className={classes.join(' ')}>This is really working!</p>
          <StyleButton
            alt={this.state.showName}
            onClick={this.togglePersonsHandler}>
              Switch Name
          </StyleButton>
          {
            persons
          }
        </div>
    );
  }
}

export default App;
```

## working with CSS module
外部式引用CSS
但这样有个问题，你只想让你的CSS class局部起作用。

尝试另一种方法了：
创建一个Button.module.css文件，注意一定要以module为后缀名。

写好CSS样式。
```css
.Button {
    background-color: green;
    color: white;
    font: inherit;
    border: 1px solid blue;
    padding: 8px;
    cursor: pointer;
}

.Button:hover {
    background-color: lightGreen;
    color: red
}
```

在App.js里面
```javascript
import buttonStyle from './Button.module.css';
<button 
    className={buttonStyle.Button}
    alt={this.state.showName}
    onClick={this.togglePersonsHandler}>
      Switch Name
</button>
```

那我们怎么动态改变呢？
再建两个CSS class就好。


