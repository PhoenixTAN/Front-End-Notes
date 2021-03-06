import React, {Component} from 'react';
import './App.css';

import Person from './Person/Person'

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

export default App;



