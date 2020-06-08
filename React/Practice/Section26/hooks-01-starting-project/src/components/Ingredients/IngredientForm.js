import React, {useState} from 'react';

import Card from '../UI/Card';
import './IngredientForm.css';

const IngredientForm = React.memo(props => {

  // const [inputState, changeState] = useState({title: '', amount: ''});
  // useState的参数可以是object，也可以是其他数据类型
  // useState总是返回一个长度为2的数组，
  // 第一个元素是current state
  // 第二个元素是一个函数，这个函数可以更新当前的state

  // multiple state
  const [titleState, changeTitleState] = useState('');
  const [amountState, changeAmountState] = useState('');

  const submitHandler = event => {
    event.preventDefault();
    props.onAddIngredient({title: titleState, amount: amountState});
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
              value={titleState} 
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
              /*
                onChange={event => {
                  const newTitle = event.target.value;
                  changeState((prevInputState) => ({
                    title: newTitle,
                    amount: prevInputState.amount
                    })
                  )
                }} 
              */
              // 其实并不需要更新两个state
              // 一开始的时候state does not have to be an object
              // we can use multiple states. 这样每次就不用所有都更新了
              onChange={event => {
                const newTitle = event.target.value;
                changeTitleState(newTitle);
              }} 
            />
          </div>
          <div className="form-control">
            <label htmlFor="amount">Amount</label>
            <input 
              type="number" 
              id="amount" 
              value={amountState} 
              onChange={event => {
                const newAmount = event.target.value;
                changeAmountState(newAmount);
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
