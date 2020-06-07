import React, {useEffect} from 'react';

import classes from './Cockpit.module.css';


const Cockpit = ( props ) => {
    
    useEffect( () => {
      console.log('[cockpit] useEffect');

      // HTTP Request...
      const timer = setTimeout(
        () => {
          alert('Saved data to cloud!');
        }, 2000);

        return () => {
          clearTimeout(timer);
          console.log('[cockpit] cleanup work in useEffect');
        };  // this function will run after every render cycle
        // To be more precise, it runs BEFORE the main useEffect function runs,
        // but after the (first) render cycle!
    }, [props.persons]);
    // this useEffect() only will be executed when the [props.persons] changed

    useEffect( () => {
      console.log('[Cocopit] 2nd useEffect');
      return () => {
        console.log('[cockpit] cleanup work in useEffect');
      }; 
    });

    const assignedClasses = [];
    let btnClass = '';
    if (props.showPersons) {
        btnClass = classes.Red;
    }

    if ( props.personsLength <= 2 ) {
      assignedClasses.push( classes.red ); // classes = ['red']
    }
    if ( props.personsLength <= 1 ) {
      assignedClasses.push( classes.bold ); // classes = ['red', 'bold']
    }

    return (
        <div className={classes.Cockpit}>
            <h1>{props.title}</h1>
            <p className={assignedClasses.join( ' ' )}>This is really working!</p>
            <button
                className={btnClass}
                onClick={props.clicked}>Toggle Persons</button>
        </div>
    );
};

export default React.memo(Cockpit);   
// 如果props和state都不变，就不会re-render
