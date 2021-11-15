import React, { useContext } from "react";
import classes from "./SearchItem.module.css";
import { fetchingRecipe } from "../Fetcher";
import searchContext from "../../store/searchContext/search-context";
import { useMediaQuery } from "@mui/material";

const SearchItem = ({ renderBookmarks, item }) => {
  const [searchCtx, setSearchCtx] = useContext(searchContext);
  const recipeID = item.id ? item.id : item.recipeID;
  const isTablet = useMediaQuery("(max-width: 1100px)");

  const fetchItem = async (e) => {
    if (e.target.textContent === "delete") return;
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
    setSearchCtx({
      ...searchCtx,
      bookmarks: searchCtx.bookmarks,
    });
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  };

  return (
    <li key={recipeID} onClick={fetchItem}>
      <div className={classes.itemContainer}>
        <div className={classes.imageContainer}>
          <img alt="recipe" className={classes.itemImage} src={item.image} />
        </div>
        <div className={classes.text}>
          <h4
            className={
              renderBookmarks
                ? `${classes.title} ${
                    isTablet ? classes.titleBookmarkTablet : ""
                  }`
                : `${classes.title} ${isTablet ? classes.titleTablet : ""}`
            }
          >
            {item.title}
          </h4>
        </div>
        {renderBookmarks ? (
          <button
            onClick={deleteBookmark}
            className={`${classes.deleteBookmark} ${
              isTablet ? classes.deleteBookmarkTablet : ""
            }`}
          >
            delete
          </button>
        ) : null}
      </div>
    </li>
  );
};

export default SearchItem;
