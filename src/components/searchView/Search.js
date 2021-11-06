import React from "react";
import classes from "./Search.module.css";
import SearchItem from "./SearchItem";
import { useContext } from "react";
import Pagination from "./pagination/Pagination";
import searchContext from "../../store/searchContext/search-context";

const Search = () => {
  const [searchCtx, setSearchCtx] = useContext(searchContext);
  const start = (searchCtx.page - 1) * 10;
  const end = searchCtx.page * 10;

  const searchResults = searchCtx.results.slice(start, end);
  const listItems = searchResults.map((result) => {
    return <SearchItem item={result} key={result.recipeID} />;
  });

  return (
    <div className={classes.search}>
      <h2 className={classes.title}>Search Results:</h2>
      <ul>{listItems}</ul>
      {listItems.length > 0 && <Pagination appCtx={searchCtx} />}
    </div>
  );
};

export default Search;
