# React Hooks
![alt text](./images/react-hook-lifecycle.png)

![alt text](./images/react-hooks-1.png)

## Introduction
- Basic Hooks
    - useState
    - useEffect
    - useContext

- Additional Hooks
    - useReducer
    - useCallback
    - useMemo
    - useRef
    - useImperativeHandle
    - useLayoutEffect
    - useDebugValue

Now how do you recognize react hooks?

**React hooks are JavaScript functions** named like this starting with a lowercase use and then your function name something like Use state and so on.

![alt text](./images/what-are-react-hooks.png)

## useState
**setState之后，整个函数都会重新执行一遍。**

```javascript
import React, {useState} from 'react';

import Card from '../UI/Card';
import './IngredientForm.css';

const IngredientForm = React.memo(props => {

  const [inputState, changeState] = useState({title: '', amount: ''});
  // useState的参数可以是object，也可以是其他数据类型
  // useState总是返回一个长度为2的数组，
  // 第一个元素是current state
  // 第二个元素是一个函数，这个函数可以更新当前的state
  /*
    const inputState = state[0];
    const changeState = state[1];
  */

  const submitHandler = event => {
    event.preventDefault();
    // ...
  };

  return (
    <section className="ingredient-form">
      <Card>
        <form onSubmit={submitHandler}>
          <div className="form-control">
            <label htmlFor="title">Name</label>
            <input 
              type="text" 
              id="title" 
              value={inputState.title} 
              // 这里把state修改了，这样改是不对的
              // 这样就会用title把原来的整个state替代了
              // 所以要title和amount一起更新
              // 但这样又不是完全正确的，因为不能保证现在的inputState就是最近一次的state
              // 有可能是an older state
              /*
                onChange={event => changeState({
                  title: event.target.value,
                  amount: inputState.amount
                }) } 
              */
              // 这样写，告诉React我们想要用the lastest state
              // 但这样写还有warning，因为event要传给changeState
              // why
              // the outer event will be locked in for the first keystroke,
              // which means that for a subsequent keystrokes we don't use the new keystroke event but the previous one,
              // which of course is then reused and which causes this error.
              /*
                onChange={event => changeState((prevInputState) => ({
                    title: event.target.value,
                    amount: prevInputState.amount
                  })
                )} 
              */
              // 怎么解决?
              onChange={event => {
                const newTitle = event.target.value;
                changeState((prevInputState) => ({
                  title: newTitle,
                  amount: prevInputState.amount
                  })
                )
              }} 
              // 其实并不需要更新两个state
              // 一开始的时候state does not have to be an object
              // we can use multiple states. 这样每次就不用所有都更新了
            />
          </div>
          <div className="form-control">
            <label htmlFor="amount">Amount</label>
            <input 
              type="number" 
              id="amount" 
              value={inputState.amount} 
              onChange={event => {
                const newAmount = event.target.value;
                changeState((prevInputState) => ({
                  title: prevInputState.title,
                  amount: newAmount
                  })
                )
              }} 
            />
          </div>
          <div className="ingredient-form__actions">
            <button type="submit">Add Ingredient</button>
          </div>
        </form>
      </Card>
    </section>
  );
});

export default IngredientForm;

```

## 特别注意!! No nested hook
只能在functional component的最外层使用useState这样的hook,不能再在函数里面useState().
conditional statement和loop里面也不行。
```javascript
const submitHandler = event ={ 
    useState(); // This is wrong
    event.preventDefault();
    // ...
}
```

The Event interface's `preventDefault()` method tells the user agent that if the event does not get explicitly handled, its default action should not be taken as it normally would be.

详细看Practice Section 26的代码！

## useRef
用来实时获取当前某个标签的value.
```javascript
import React, {useRef} from 'react';

const inputRef = useRef();

<input ref={inputRef} value={}>
```

因为在setTimeout里面要读取input的话，在开始计时的一瞬间，就把当前的input锁定了。

## useEffect() to clean up
可以用useEffect去clean up `setTimeout`.
```javascript
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
    // this useEffect() only will be executed when the [props,persons] changed
```
这样子就直接clear了计时器，不会弹窗了。

### useEffect 执行时机
1. 首次执行hook函数/首次进入页面，必然会执行。
2. 如果监控列表没有参数，只会首次执行函数时执行。
3. 监控列表里面有参数，参数发生变化时会执行。

## React batches state updates

例如
```javascript
const clearError = () => {
    setError(null);     // 这个是useState里面的updateState函数


    setIsLoading(false);// 这个是useState里面的updateState函数
}
```
这两个set不会分别引起两次re-render cycle，React batches state updates.

https://github.com/facebook/react/issues/10231#issuecomment-316644950

React batches all setStates done during a React event handler, and applies them just before exiting its own browser event handler.

## useReducer
```javascript
const [state, dispatch] = useReducer(reducer, initialArg, init);

const initialState = {count: 0};

function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return {count: state.count + 1};
    case 'decrement':
      return {count: state.count - 1};
    default:
      throw new Error();
  }
}

function Counter() {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <>
      Count: {state.count}
      <button onClick={() => dispatch({type: 'decrement'})}>-</button>
      <button onClick={() => dispatch({type: 'increment'})}>+</button>
    </>
  );
}

```

## useContext to avoid Prop Chain
Section 7.
Section 26 Practive
```javascript
const AuthContext = React.createContext({
    isAuth: false,
    login: () => ()
});

useContext(AuthContext);

```


## useCallback
```javascript
const filteredIngredientsHandler = useCallback(filteredIngredients => {
    setUserIngredients(filteredIngredients);
  }, []);
```

useCallback() caches the function for every re-render cycle.

Pass an inline callback and an array of dependencies. useCallback will return a memoized version of the callback that only changes if one of the dependencies has changed. 

This is useful when passing callbacks to optimized child components that rely on reference equality to prevent unnecessary renders (e.g. shouldComponentUpdate).例如，子组件需要用到父组件的一个函数，父子通过props传参来进行通信，如果父组件re-render，子组件props必然发生改变从而引起子组件的re-render, 如果用useCallback, 那么这个`filteredIngredientsHandler`引用是永远不会变的，就不会引起子组件的re-render.

useCallback(fn, deps) is equivalent to useMemo(() => fn, deps).


## useMemo for optimization
Section 7.
类似useCallback.

- useCallback caches a function.
- useMemo caches a component.

React.memo()也可以cache a component.
```javascript
const MyComponent = React.memo(function MyComponent(props) {
  /* render using props */
});
```

React.memo is a higher order component.

If your component renders the same result given the same props, you can wrap it in a call to React.memo for a performance boost in some cases by memoizing the result. This means that React will skip rendering the component, and reuse the last rendered result.

React.memo only checks for prop changes. If your function component wrapped in React.memo has a useState, useReducer or useContext Hook in its implementation, it will still rerender when state or context change.

By default it will only shallowly compare complex objects in the props object. If you want control over the comparison, you can also provide a custom comparison function as the second argument.

```javascript
function MyComponent(props) {
  /* render using props */
}
function areEqual(prevProps, nextProps) {
  /*
  return true if passing nextProps to render would return
  the same result as passing prevProps to render,
  otherwise return false
  */
}
export default React.memo(MyComponent, areEqual);
```

```javascript
// 例子1
const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);

// 例子2
const isCurrentUser = useMemo(() => {
    return !!user && currentUserCode === user.userCode;
}, [user, currentUserCode]);
```

返回值：Returns a memorized value.

参数：Pass a “create” function and an array of dependencies.

`useMemo` will only recompute the memoized value when one of the dependencies has changed. This optimization helps to avoid expensive calculations on every render.

记住，传入 useMemo 的函数会在渲染期间执行。请不要在这个函数内部执行与渲染无关的操作，诸如副作用这类的操作属于 useEffect 的适用范畴，而不是 useMemo。

如果没有提供依赖项数组，useMemo 在每次渲染时都会计算新的值。

你可以把 useMemo 作为性能优化的手段，但不要把它当成语义上的保证。将来，React 可能会选择“遗忘”以前的一些 memoized 值，并在下次渲染时重新计算它们，比如为离屏组件释放内存。先编写在没有 useMemo 的情况下也可以执行的代码 —— 之后再在你的代码中添加 useMemo，以达到优化性能的目的。

个人理解：跟useEffect对比起来，useMemo更倾向于计算，useEffect更倾向于发请求。


## Custom Hooks
比如做一个http hook.
```javascript
const useHttp = () => {

}
```
我们有useEffect，我们可以自定义一个useXXX.


## 子元素的useEffect和父元素的useEffect
子元素的会先执行。
