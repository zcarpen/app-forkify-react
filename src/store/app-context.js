import React from "react";

const appContext = React.createContext({
  search: {
    query: "",
    page: 1,
    pages: 1,
    results: [],
  },
  recipe: {},
  bookmarks: [],
});

export default appContext;
