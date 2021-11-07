import React, { useContext } from "react";
import classes from "./Recipe.module.css";
import searchContext from "../../store/searchContext/search-context";
import Ingredient from "./Ingredient";

const Recipe = () => {
  const [searchCtx, setSearchCtx] = useContext(searchContext);
  if (!searchCtx.recipe?.ingredients) return null;
  const addToBookmarks = () => {
    // Checking if a bookmark is already stored:

    const bookmarkAlreadyExists =
      searchCtx.bookmarks.findIndex(
        (bookmark) => bookmark.id === searchCtx.recipe.id
      ) !== -1;
    if (bookmarkAlreadyExists) return;

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
        <a className={classes.directions} href={searchCtx.recipe.sourceURL}>
          Directions
        </a>
      </footer>
    </div>
  );
};

export default Recipe;
