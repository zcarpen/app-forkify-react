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

export default Ingredient;
