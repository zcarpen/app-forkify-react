import React, { useState, useContext } from "react";
import classes from "./Header.module.css";
import searchContext from "../../store/searchContext/search-context";
import fetchingResults from "../Fetcher";

const Header = ({ getQuery }) => {
  const [searchCtx, setSearchCtx] = useContext(searchContext);
  const [query, setQuery] = useState("");
  const queryHandler = (e) => {
    setQuery(e.target.value);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const results = await fetchingResults(query);
    console.log(results);
    setSearchCtx({
      query: query,
      results: results,
      page: 1,
      pages: Math.ceil(results.length / 10),
      recipe: null,
    });
  };

  return (
    <div className={classes.header}>
      <h1 className={classes.mainTitle}>
        <span className={classes.welcome}>Welcome to </span>
        <span className={classes.name}>Recipe Finder</span>
      </h1>
      <form className={classes.form} onSubmit={submitHandler}>
        <input
          className={classes.input}
          onChange={queryHandler}
          id="searchInput"
          placeholder="pizza"
        />
        <button type="submit" className={classes.searchButton}>
          Search
        </button>
      </form>
      <h4 className={classes.instruction}>
        Search for any keyword to find a recipe that you'd like to try!
      </h4>
    </div>
  );
};

export default Header;
