import React from "react";

const searchContext = React.createContext({
  query: "",
  results: [],
  pages: 1,
  page: 1,
  recipe: null,
});

export default searchContext;
