import React, {Component} from 'react';
import './App.css';

import Person from './Person/Person.js'

class App extends Component {

  state ={
      persons: [
        { name: 'Max', age: 28 },
        { name: 'Manu', age: 29 },
        { name: 'Stephanie', age: 26 }
      ]
  }

  switchNameHandler = (newName) => {
    this.setState({persons: [
      { name: newName, age: 28 },
      { name: 'Manu', age: 29 },
      { name: 'Stephanie', age: 99 }
    ]});
  }

  nameChangeHandler = (event) => {
    this.setState({persons: [
      { name: 'Max', age: 28 },
      { name: event.target.value, age: 29 },
      { name: 'Stephanie', age: 99 }
    ]});
  }

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
  
}

export default App;
