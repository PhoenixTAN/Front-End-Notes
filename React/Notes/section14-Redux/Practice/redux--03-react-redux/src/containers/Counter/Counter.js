import React, { Component } from 'react';
import { connect } from 'react-redux';

import CounterControl from '../../components/CounterControl/CounterControl';
import CounterOutput from '../../components/CounterOutput/CounterOutput';

class Counter extends Component {
    render () {
        return (
            <div>
                <CounterOutput value={this.props.ctr} />
                <CounterControl label="Increment" clicked={this.props.onIncrementCounter} />
                <CounterControl label="Decrement" clicked={this.props.onDecrementCounter}  />
                <CounterControl label="Add 5" clicked={() => this.counterChangedHandler( 'add', 5 )}  />
                <CounterControl label="Subtract 5" clicked={() => this.counterChangedHandler( 'sub', 5 )}  />
            </div>
        );
    }
}

/**
 * If a mapStateToProps function is specified, 
 * the new wrapper component will subscribe to Redux store updates. 
 * This means that any time the store is updated, 
 * mapStateToProps will be called. 
 * 
 * The results of mapStateToProps must be a plain object, 
 * which will be merged into the wrapped component’s props. 
 * If you don't want to subscribe to store updates, 
 * pass null or undefined in place of mapStateToProps.
 * 
 * @params
 *      state: the store state
 *          If your mapStateToProps function is declared as taking one parameter, 
 *          it will be called whenever the store state changes, 
 *          and given the store state as the only parameter.
 */
const mapStateToProps = state => {
    return {
        ctr: state.counter
    };
};

/**
 * @param {*} dispatch 
 * If your mapDispatchToProps is declared as a function taking one parameter, 
 * it will be given the dispatch of your store.
 */
const mapDispatchToProps = dispatch => {
    return {
        onIncrementCounter: () => dispatch({type: 'INCREMENT'}),
        onDecrementCounter: () => dispatch({type: 'DECREMENT'})
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Counter);
// The connect() function connects a React component to a Redux store.
// connect()返回一个函数，这个函数的参数是一个component
