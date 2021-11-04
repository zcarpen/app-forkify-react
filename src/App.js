import classes from "./App.module.css";
import Header from "./components/headerView/Header";
import Search from "./components/searchView/Search";
import Recipe from "./components/recipeView/Recipe";
import AppContextProvider from "./store/app-context-Provider";
import React, { useState } from "react";
import SearchContextProvider from "./store/searchContext/search-context-Provider";
import searchContext from "./store/searchContext/search-context";

function App() {
  const [searchCtx, setSearchCtx] = useState(searchContext);
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  return (
    <AppContextProvider>
      <SearchContextProvider>
        <div className={classes.container}>
          <div className={classes.app}>
            <Header className={classes.header} />
            <Search
              setSelectedRecipe={setSelectedRecipe}
              query={searchCtx.query}
            />
            <Recipe recipe={selectedRecipe} />
          </div>
        </div>
      </SearchContextProvider>
    </AppContextProvider>
  );
}

export default App;
