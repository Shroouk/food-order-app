import React, { useEffect, useState } from 'react'

import Card from '../UI/Card';
import MealItem from './MealItem/MealItem';
import classes from './AvailableMeals.module.css';



const AvailableMeals = () => {

  const [meals,setMeals] =useState([]);
  const [isLoading, setIsLoading]= useState(true);
  const [httpError, setHttpError] = useState()

  useEffect(()=>{
    const fetchMeals = async ()=>{
      const response = await fetch('https://food-app-order-d9a5b-default-rtdb.firebaseio.com/meals.json');

      if(!response.ok){
        throw new Error("Couldn't fetch the data from Firebase");
        
      }
      const responseData = await response.json();

      const loadedData = []
      for(let key in responseData){
        loadedData.push({
          id:key,
          name:responseData[key].name,
          description:responseData[key].description,
          price:responseData[key].price
                })
      }
      setMeals(loadedData);
      setIsLoading(false);
     }
     
      fetchMeals().catch(err=>{
        console.log(err.message)
        setIsLoading(false);
        setHttpError(err.message)
      });
     
    

    
  },[])


  if(isLoading){
    return (<section className={classes.mealsLoading}>
      <p>Is Loading...</p>
    </section>)
  }
  if(httpError){
    return (
    <section className={classes.mealsError}>
      <p>error</p>
    </section>      
    )
  }

  const mealsList = meals.map((meal) => (
    <MealItem
      key={meal.id}
      id={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));

  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
