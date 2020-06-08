import React, {useState, useEffect, useCallback} from 'react';

import IngredientForm from './IngredientForm';
import IngredientList from './IngredientList';
import Search from './Search';

const Ingredients = () => {

  // 一开始设成一个空数组
  const [userIngredients, setUserIngredients] = useState([]);

  // by default, useEffect() runs right after every component render cycle
  useEffect(() => {
    // load data from database
    fetch('https://react-front-end-test-39fbd.firebaseio.com/ingredients.json')
    .then( response => response.json() )
    .then(responseData => {
      const loadedIngredients = [];
      for (const key in responseData) {
        loadedIngredients.push(
          {
            id: key,
            title: responseData[key].title,
            amount: responseData[key].amount
          }
        );
      }
      // setUserIngredients(loadedIngredients);
      // 直接这样写，有可能会产生这样的死循环:
      // fetch->setState->re-render()->useEffect->fetch
      // useEffect()加个参数，当这个参数改变的时候才call useEffect()
    });
  }, []); // 这个参数[]使得该useEffect()只在这个component第一次加载的时候执行
  
  const addIngredientHandler = ingredient => {
    // http request
    // browser function Web API
    fetch('https://react-front-end-test-39fbd.firebaseio.com/ingredients.json',
      {
        method: 'POSt',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ingredient})
      }
    )
    .then( response => {
      return response.json();
    })
    .then(
      responseData => {
        setUserIngredients( prevIngredients => 
          [...prevIngredients, 
            {
              id: responseData.name, // 从数据库得到UID
              ...ingredient
            }
          ]
        );
      }
    );
  }

  // useCallback() caches the function for every re-render cycle.
  const filteredIngredientsHandler = useCallback(filteredIngredients => {
    setUserIngredients(filteredIngredients);
  }, []);

  return (
    <div className="App">
      <IngredientForm onAddIngredient={addIngredientHandler}/>

      <section>
        <Search onLoadedIngredients={filteredIngredientsHandler}/>
        <IngredientList ingredients={userIngredients} onRemoveItem={()=>{}}/>
      </section>
    </div>
  );
}

export default Ingredients;
