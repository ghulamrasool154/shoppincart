import React, { useEffect, useState } from "react";
import classes from "./AvailableMeals.module.css";
import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";
// const DUMMY_MEALS = [
//   {
//     id: "m1",
//     name: "Sushi",
//     description: "Finest fish and veggies",
//     price: 22.99,
//   },
//   {
//     id: "m2",
//     name: "Schnitzel",
//     description: "A german specialty!",
//     price: 16.5,
//   },
//   {
//     id: "m3",
//     name: "Barbecue Burger",
//     description: "American, raw, meaty",
//     price: 12.99,
//   },
//   {
//     id: "m4",
//     name: "Green Bowl",
//     description: "Healthy...and green...",
//     price: 18.99,
//   },
// ];

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpsError] = useState(null);
  useEffect(() => {
    const fetchMales = async () => {
      const response = await fetch(
        "https://react-http-efd56-default-rtdb.firebaseio.com/meals.json"
      );

      if (!response.ok) {
        throw new Error("Some thing wrong in your database fetch data");
      }
      const responseData = await response.json();

      const loadedData = [];

      for (const key in responseData) {
        loadedData.push({
          id: key,
          name: responseData[key].name,
          description: responseData[key].description,
          price: responseData[key].price,
        });
      }

      setMeals(loadedData);
      setIsLoading(false);
    };

    fetchMales().catch((error) => {
      setIsLoading(false);
      setHttpsError(error.message);
    });

    // try {
    //   fetchMales();
    // } catch (error) {
    //   setIsLoading(false);
    //   setHttpsError(error.message);
    // }
  }, []);

  if (isLoading) {
    return (
      <section className={classes.melasloading}>
        <p>loading</p>
      </section>
    );
  }

  if (httpError) {
    return (
      <section className={classes.melasError}>
        <p>{httpError}</p>
      </section>
    );
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
