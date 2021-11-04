import searchContext from "./search-context";
import React, { useState } from "react";

const SearchContextProvider = (props) => {
  const [searchCtx, setSearchCtx] = useState({
    query: "",
    results: [],
    pages: 1,
    page: 1,
    recipe: null,
  });
  return (
    <searchContext.Provider value={[searchCtx, setSearchCtx]}>
      {props.children}
    </searchContext.Provider>
  );
};

export default SearchContextProvider;
