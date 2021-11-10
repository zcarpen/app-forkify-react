import React, { useState, useContext, Fragment, useEffect } from "react";
import classes from "./Header.module.css";
import searchContext from "../../store/searchContext/search-context";
import fetchingResults from "../Fetcher";
import Bookmarks from "./Bookmarks";

const Header = ({ bookmarkError }) => {
  const [errorMessage, setErrorMessage] = useState("");
  const [isValidSearch, setIsValidSearch] = useState(true);
  const [searchCtx, setSearchCtx] = useContext(searchContext);
  const [query, setQuery] = useState("");
  const queryHandler = (e) => {
    setQuery(e.target.value);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const results = await fetchingResults(query);
      setIsValidSearch(true);
      setSearchCtx({
        ...searchCtx,
        query: query,
        results: results,
        pages: Math.ceil(results.length / 10),
      });
    } catch {
      if (e.target[0].value === "") {
        setErrorMessage("Invalid (empty) input");
        setIsValidSearch(false);
      }
      if (e.target[0].value !== "") {
        setIsValidSearch(false);
        setErrorMessage(`'${e.target[0].value}' could not be found`);
      }
    }
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
        {(!isValidSearch || bookmarkError) && (
          <p className={classes.error}>
            {bookmarkError ? "Recipe is already bookmarked" : errorMessage}
          </p>
        )}
        <h1 className={classes.mainTitle}>
          <span className={classes.welcome}>Welcome to </span>
          <span className={classes.name}>Recipe Finder</span>
        </h1>
        <form className={classes.form} onSubmit={submitHandler}>
          <input
            className={`${classes.input} ${
              !isValidSearch ? classes.inputError : ""
            }`}
            onChange={queryHandler}
            id="searchInput"
            placeholder={isValidSearch ? "pizza" : "ERROR"}
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
