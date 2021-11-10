import classes from "./Ingredient.module.css";
import React, { useContext } from "react";
import searchContext from "../../store/searchContext/search-context";
import servingsIncrementer from "./servingsIncrementer";

const Ingredient = () => {
  const [searchCtx] = useContext(searchContext);
  const listOfIngredients = searchCtx.recipe.ingredients.map(
    (ingredient, index) => {
      const updatedIngredient = servingsIncrementer(ingredient);
      return (
        <li key={index} className={classes.ingredient}>
          {updatedIngredient}
        </li>
      );
    }
  );

  return <ul className={classes.listIngredients}>{listOfIngredients}</ul>;
};

// const ingredient = "1 1/2 teaspoons curry powder"

// const arrayOfIngredients = ingredient.split(' ');
// console.log(arrayOfIngredients)
// const decimaledNumber = Number(arrayOfIngredients[0])
// const fracToDecimal = eval(arrayOfIngredients[1])
// if (!isFinite(arrayOfIngredients[1][0])) {
//   console.log('whoops')
// }
// console.log(decimaledNumber + fracToDecimal)

export default Ingredient;
