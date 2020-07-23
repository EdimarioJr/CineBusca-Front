import React, { useState } from "react";
import { DivSearch } from "./style";
import { useHistory } from "react-router-dom";

const SearchInput = () => {
  const [search, setSearch] = useState("");
  const history = useHistory();

  function submitSearch() {
    if (search) {
      history.push({
        pathname: "/search",
        search: search,
      });
    } else alert("The search is empty!");
  }

  return (
    <DivSearch>
      <input
        type="text"
        placeholder="Search by film title"
        value={search}
        onChange={(event) => setSearch(event.target.value)}
      />
      <button onClick={submitSearch}>Go!</button>
    </DivSearch>
  );
};

export default SearchInput;
