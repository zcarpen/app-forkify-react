import classes from "./App.module.css";
import Header from "./components/headerView/Header";
import Search from "./components/searchView/Search";
import Recipe from "./components/recipeView/Recipe";
import React, { useState } from "react";
import SearchContextProvider from "./store/searchContext/search-context-Provider";
import searchContext from "./store/searchContext/search-context";
import { useEffect } from "react/cjs/react.development";

function App() {
  const [searchCtx] = useState(searchContext);
  const [bookmarkError, setBookmarkError] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  console.log(bookmarkError);

  return (
    <SearchContextProvider>
      <div className={classes.app}>
        <Header bookmarkError={bookmarkError} className={classes.header} />
        <Search setSelectedRecipe={setSelectedRecipe} query={searchCtx.query} />
        <Recipe setBookmarkError={setBookmarkError} recipe={selectedRecipe} />
      </div>
    </SearchContextProvider>
  );
}

export default App;
