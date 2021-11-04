import React, { useContext, useState } from "react";
import classes from "./Recipe.module.css";
import searchContext from "../../store/searchContext/search-context";
import Ingredient from "./Ingredient";

const Recipe = () => {
  const [searchCtx, setSearchCtx] = useContext(searchContext);
  const [ingredients, setIngredients] = useState([]);
  console.log(searchCtx);
  if (!searchCtx.recipe?.ingredients) return null;

  console.log(searchCtx.recipe.ingredients);
  return (
    <div className={classes.recipe}>
      <header
        style={{
          backgroundImage: `url("${searchCtx.recipe?.image}")`,
        }}
        className={classes.header}
      >
        <h1 className={classes.mainTitle}>{searchCtx.recipe.title}</h1>
      </header>
      <main>
        <section className={classes.ingredients}>
          <h3 className={classes.title}>Ingredients:</h3>
          <Ingredient />
        </section>
      </main>
      <footer>
        <p className={classes.closingParagraph}>
          This recipe was carefully designed and tested by
          <strong>{" " + searchCtx.recipe.publisher}</strong>. Please check out
          directions at their website.
        </p>
        <a className={classes.directions} href={searchCtx.recipe.sourceURL}>
          Directions
        </a>
      </footer>
    </div>
  );
};

export default Recipe;
