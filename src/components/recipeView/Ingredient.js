import classes from "./Ingredient.module.css";
import React, { useContext } from "react";
import searchContext from "../../store/searchContext/search-context";
const Ingredient = () => {
  const [searchCtx, setSearchCtx] = useContext(searchContext);
  return (
    <ul className={classes.listIngredients}>
      {searchCtx.recipe.ingredients.map((ingredient) => {
        return <li className={classes.ingredient}>{ingredient}</li>;
      })}
    </ul>
  );
};

export default Ingredient;
