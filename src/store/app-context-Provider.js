import appContext from "./app-context";
import React, { useState } from "react";

const AppContextProvider = (props) => {
  const [search, setSearch] = useState();
  const [appCtx, setAppCtx] = useState({
    search: {
      query: "",
      page: 1,
      pages: 1,
      results: [],
    },
    recipe: {},
    bookmarks: [],
  });

  return (
    <appContext.Provider value={[appCtx, setAppCtx]}>
      {props.children}
    </appContext.Provider>
  );
};

export default AppContextProvider;
