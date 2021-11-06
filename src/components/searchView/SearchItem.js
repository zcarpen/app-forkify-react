import React, { useContext } from "react";
import classes from "./SearchItem.module.css";
import { fetchingRecipe } from "../Fetcher";
import searchContext from "../../store/searchContext/search-context";

const SearchItem = ({ renderBookmarks, item }) => {
  const [searchCtx, setSearchCtx] = useContext(searchContext);
  const fetchItem = async (e) => {
    const recipeID = item.id ? item.id : item.recipeID;
    const recipe = await fetchingRecipe(recipeID);
    setSearchCtx({
      ...searchCtx,
      recipe: recipe,
    });
  };

  const deleteBookmark = (e) => {
    const bookmarks = searchCtx.bookmarks;
    bookmarks.splice(
      bookmarks.findIndex((bookmark) => +bookmark.id === +item.id),
      1
    );
  };

  const bookmark = renderBookmarks ? <button>delete</button> : null;
  return (
    <li id={item.id} onClick={fetchItem}>
      <img alt="recipe" className={classes.itemImage} src={item.image} />
      <div className={classes.itemContainer}>
        <div className={classes.text}>
          <h4>{item.title}</h4>
        </div>
        {renderBookmarks ? (
          <button onClick={deleteBookmark} className={classes.deleteBookmark}>
            delete
          </button>
        ) : null}
      </div>
    </li>
  );
};

export default SearchItem;
