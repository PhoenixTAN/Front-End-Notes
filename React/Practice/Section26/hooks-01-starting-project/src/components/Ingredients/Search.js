import React, {useState, useEffect} from 'react';

import Card from '../UI/Card';
import './Search.css';

const Search = React.memo(props => {

  const {onLoadedIngredients} = props;
  const [enterFilter, setEnterFilter] = useState('');

  useEffect( () => {
    const query = enterFilter.length === 0 
              ? '' 
              : `?orderBy="title"&equalTo="${enterFilter}"`;
    fetch('https://react-front-end-test-39fbd.firebaseio.com/ingredients.json' + query)
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
      onLoadedIngredients(loadedIngredients);
    });
  }, [enterFilter, onLoadedIngredients]); // why the second element?

  return (
    <section className="search">
      <Card>
        <div className="search-input">
          <label>Filter by Title</label>
          <input type="text" value={enterFilter} onChange={event => setEnterFilter(event.target.value)} />
        </div>
      </Card>
    </section>
  );
});

export default Search;
