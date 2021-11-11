import searchContext from "../../store/searchContext/search-context";
import SearchItem from "../searchView/SearchItem";
import React, { useContext, useState } from "react";
import classes from "./Bookmarks.module.css";

const Bookmarks = () => {
  const [searchCtx] = useContext(searchContext);
  const [renderBookmarks, setRenderBookmarks] = useState(false);

  // toggles the bookmark container
  const renderBookmarksHandler = () => {
    renderBookmarks === false
      ? setRenderBookmarks(true)
      : setRenderBookmarks(false);
  };

  const listItems = searchCtx.bookmarks.map((item) => {
    return (
      <SearchItem renderBookmarks={renderBookmarks} item={item} key={item.id} />
    );
  });

  return (
    <section className={classes.bookmarks}>
      <button
        onClick={renderBookmarksHandler}
        className={classes.bookmarkedRecipes}
      >
        Bookmarked Recipes
      </button>

      {/* renders bookmarks if it's not empty OR if it is empty, it renders a message */}
      {(searchCtx.bookmarks.length > 0 && renderBookmarks && (
        <ul className={classes.list}>{listItems}</ul>
      )) ||
        (renderBookmarks && (
          <p className={classes.errorMessage}>No bookmarks yet.</p>
        ))}
    </section>
  );
};

export default Bookmarks;
