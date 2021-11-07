import classes from "./Ingredient.module.css";
import React, { useContext } from "react";
import searchContext from "../../store/searchContext/search-context";
const Ingredient = () => {
  const [searchCtx] = useContext(searchContext);
  return (
    <ul className={classes.listIngredients}>
      {searchCtx.recipe.ingredients.map((ingredient, index) => {
        return (
          <li key={index} className={classes.ingredient}>
            {ingredient}
          </li>
        );
      })}
    </ul>
  );
};

export default Ingredient;
