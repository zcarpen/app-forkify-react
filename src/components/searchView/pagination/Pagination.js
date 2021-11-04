import classes from "./Pagination.module.css";
import React, { useContext } from "react";
import searchContext from "../../../store/searchContext/search-context";

const Pagination = () => {
  const [searchCtx, setSearchCtx] = useContext(searchContext);
  const pages = Array.from({ length: searchCtx.pages }, (_, i) => i + 1);
  let pagesString = "";
  pages.forEach((page) => (pagesString += ` ${page}`));
  const nextPage = () => {
    setSearchCtx({
      ...searchCtx,
      page: searchCtx.page + 1,
    });
  };
  const prevPage = () => {
    setSearchCtx({
      ...searchCtx,
      page: searchCtx.page - 1,
    });
  };

  return (
    <div className={classes.pagination}>
      {(searchCtx.page > 1 && (
        <button onClick={prevPage}>prev page</button>
      )) || <button>..........</button>}
      <span>{pagesString}</span>
      {(searchCtx.page < searchCtx.pages && (
        <button onClick={nextPage}>next page</button>
      )) || <button>..........</button>}
    </div>
  );
};

export default Pagination;
