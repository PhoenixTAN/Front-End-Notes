# Redux

State management library.

是一个独立于react的第三方库。

https://redux-toolkit.js.org/

## Motivation

## Redux flow
Central Store: store entire applicaiton state.

Component wants to manipulate or get the current application state.

![alt text](./resources/redux-flow.png)

## 独立运行的Redux
```javascript
const redux = require('redux');
const createStore = redux.createStore;

const initialState = {
    counter: 0
}

// Reducer
const rootReducer = (state = initialState, action) => {
    if (action.type === 'INC_COUNTER') {
        return {
            ...state,
            counter: state.counter + 1
        };
    }
    if (action.type === 'ADD_COUNTER') {
        return {
            ...state,
            counter: state.counter + action.value
        };
    }
    return state;
};

// Store
const store = createStore(rootReducer);
console.log(store.getState());

// Subscription
store.subscribe(() => {
    console.log('[Subscription]', store.getState());
});

// Dispatching Action
// type的名字必须要是type
store.dispatch({type: 'INC_COUNTER'});
store.dispatch({type: 'ADD_COUNTER', value: 10});
console.log(store.getState());
```

Result: 
```
{ counter: 0 }
[Subscription] { counter: 1 }
[Subscription] { counter: 11 }
{ counter: 11 }
```

## Build Redux into React
官方文档
https://react-redux.js.org/api/connect

```javascript
// App.js
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from './store/reducer';

const store = createStore(reducer);
ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
```

```javascript
// reducer.js
const initialState = {
    counter: 0
}

const reducer = (state = initialState, action) => {
    if (action.type === 'INCREMENT') {
        return {
            counter: state.counter + 1
        }
    }
    if (action.type === 'DECREMENT') {
        return {
            counter: state.counter - 1
        }
    }
    return state;
};

export default reducer;
```

```javascript
// component
// counter.js
import { connect } from 'react-redux';
// The connect() function connects a React component to a Redux store.


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
 * 
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
```

## Combine different reducers to root reducer

## Middleware

## Use Redux DevTools to monitor the store state

## 用actionCreators, 不要直接在reducer里面执行异步代码

## Use redux-thunk to perform asyn code异步代码
```
npm install redux-thunk 
```
我们在actoin creator里面不返回new state,而是返回一个函数，这个函数返回的是一个new state.
```javascript
export const saveResult = ( res ) => {
    return {
        type: STORE_RESULT,
        result: res
    };
}

export const storeResult = ( res ) => {
    return dispatch => {
        setTimeout( () => {
            dispatch(saveResult(res));
        }, 2000 );
    }
};
```
## 在action里面处理数据还是Reducer处理数据
在action里面发异步请求，
建议在Reducer处理数据

## async (dispatch, getState) => {}
第二个参数，获取之前的state.

## Utility Functions


