import React, { useContext } from "react";
import classes from "./SearchItem.module.css";
import { fetchingRecipe } from "../Fetcher";
import searchContext from "../../store/searchContext/search-context";

const SearchItem = ({ item }) => {
  const [searchCtx, setSearchCtx] = useContext(searchContext);
  const fetchItem = async (e) => {
    const recipe = await fetchingRecipe(item.recipeID);
    setSearchCtx({
      ...searchCtx,
      recipe: recipe,
    });
  };
  console.log(searchCtx);
  return (
    <li id={item.id} onClick={fetchItem}>
      <img alt="recipe" className={classes.itemImage} src={item.image} />
      <div className={classes.itemContainer}>
        <div className={classes.text}>
          <h4>{item.title}</h4>
        </div>
      </div>
    </li>
  );
};

export default SearchItem;
