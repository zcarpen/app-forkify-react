import React, { useState, useContext, Fragment, useEffect } from "react";
import classes from "./Header.module.css";
import searchContext from "../../store/searchContext/search-context";
import fetchingResults from "../Fetcher";
import Bookmarks from "./Bookmarks";

const Header = ({ getQuery }) => {
  const [searchCtx, setSearchCtx] = useContext(searchContext);
  const [query, setQuery] = useState("");
  const queryHandler = (e) => {
    setQuery(e.target.value);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const results = await fetchingResults(query);
    setSearchCtx({
      ...searchCtx,
      query: query,
      results: results,
      pages: Math.ceil(results.length / 10),
    });
  };

  useEffect(() => {
    const localBookmarks = JSON.parse(localStorage.getItem("bookmarks"));
    setSearchCtx({
      ...searchCtx,
      bookmarks: localBookmarks,
    });
  }, []);

  return (
    <Fragment>
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
      <Bookmarks />
    </Fragment>
  );
};

export default Header;
