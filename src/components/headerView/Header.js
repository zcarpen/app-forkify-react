import React, { useState, useContext, Fragment, useEffect } from "react";
import classes from "./Header.module.css";
import searchContext from "../../store/searchContext/search-context";
import fetchingResults from "../Fetcher";
import Bookmarks from "./Bookmarks";
import { useMediaQuery } from "@mui/material";

const Header = ({ bookmarkError }) => {
  const [errorMessage, setErrorMessage] = useState("");
  const [isValidSearch, setIsValidSearch] = useState(true);
  const [searchCtx, setSearchCtx] = useContext(searchContext);
  const [query, setQuery] = useState("");
  const isTablet = useMediaQuery("(max-width: 1100px)");

  useEffect(() => {
    const localBookmarks = JSON.parse(localStorage.getItem("bookmarks"));
    setSearchCtx({
      ...searchCtx,
      bookmarks: localBookmarks ? localBookmarks : [],
    });
  }, []);

  const queryHandler = (e) => {
    setQuery(e.target.value);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const lowerCaseQuery = query.toLowerCase();
      const results = await fetchingResults(lowerCaseQuery);
      setIsValidSearch(true);
      setSearchCtx({
        ...searchCtx,
        query: lowerCaseQuery,
        results: results,
        page: 1,
        pages: Math.ceil(results.length / 10),
      });
      setQuery("");
    } catch {
      // rendered error depends on the search query:

      // if search was truly empty:
      if (e.target[0].value === "") {
        setErrorMessage("Invalid (empty) input");
        setIsValidSearch(false);
      }

      // if search was not empty, but also not found:
      if (e.target[0].value !== "") {
        setIsValidSearch(false);
        setErrorMessage(`'${e.target[0].value}' could not be found`);
      }
    }
  };

  return (
    <Fragment>
      <div className={classes.header}>
        {(!isValidSearch || bookmarkError) && (
          <p className={classes.error}>
            {bookmarkError ? "Recipe is already bookmarked" : errorMessage}
          </p>
        )}
        <h1 className={classes.mainTitle}>
          <span
            className={`${classes.welcome} ${
              isTablet ? classes.welcomeTablet : ""
            }`}
          >
            Welcome to{" "}
          </span>
          <span
            className={`${classes.name} ${isTablet ? classes.nameTablet : ""}`}
          >
            Recipe Finder
          </span>
        </h1>
        <form className={classes.form} onSubmit={submitHandler}>
          <input
            className={`${classes.input} ${
              !isValidSearch ? classes.inputError : ""
            }`}
            onChange={queryHandler}
            id="searchInput"
            placeholder={isValidSearch ? "(pizza, potato, chicken..)" : "ERROR"}
            value={query}
          />
          <button type="submit" className={classes.searchButton}>
            Search
          </button>
        </form>
        <h4
          className={`${classes.instruction} ${
            isTablet ? classes.instructionTablet : ""
          }`}
        >
          Search for any keyword to find a recipe that you'd like to try!
        </h4>
      </div>
      <Bookmarks />
    </Fragment>
  );
};

export default Header;
