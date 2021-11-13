import React, { useContext } from "react";
import classes from "./Recipe.module.css";
import searchContext from "../../store/searchContext/search-context";
import Ingredient from "./Ingredient";

const Recipe = ({ setBookmarkError }) => {
  const [searchCtx, setSearchCtx] = useContext(searchContext);
  if (!searchCtx.recipe?.ingredients) return null;
  const addToBookmarks = () => {
    // Checking if a bookmark is already stored:
    const bookmarkAlreadyExists =
      searchCtx.bookmarks.findIndex(
        (bookmark) => bookmark.id === searchCtx.recipe.id
      ) !== -1;

    // If bookmark already exists:
    if (bookmarkAlreadyExists) {
      setBookmarkError(true);
      // Only renders the error for a bookmark for 3 seconds
      setTimeout(() => {
        console.log("erase the error!");
        setBookmarkError(false);
      }, 3000);
      return;
    }

    // adding new bookmark:
    setSearchCtx({
      ...searchCtx,
      bookmarks: [...searchCtx.bookmarks, searchCtx.recipe],
    });
    const bookmarks = [...searchCtx.bookmarks, searchCtx.recipe];
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  };

  return (
    <div className={classes.recipe}>
      <header
        style={{
          backgroundImage: `url("${searchCtx.recipe?.image}")`,
        }}
        className={classes.header}
      >
        <div className={classes.titleBackground}>
          <h1 className={classes.mainTitle}>{searchCtx.recipe.title}</h1>
        </div>
      </header>
      <main className={classes.main}>
        <section className={classes.ingredients}>
          <h3 className={classes.title}>Ingredients:</h3>
          <Ingredient />
        </section>
        <button onClick={addToBookmarks} className={classes.btn__bookmark}>
          Bookmark
        </button>
      </main>
      <footer>
        <p className={classes.closingParagraph}>
          This recipe was carefully designed and tested by
          <strong>{" " + searchCtx.recipe.publisher}</strong>. Please check out
          directions at their website.
        </p>
        <a
          className={classes.directions}
          target={"_blank"}
          rel="noreferrer"
          href={searchCtx.recipe.sourceURL}
        >
          Instructions
        </a>
      </footer>
    </div>
  );
};

export default Recipe;
