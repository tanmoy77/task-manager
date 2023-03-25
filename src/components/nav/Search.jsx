import React from "react";
import { useDispatch } from "react-redux";
import { changeSearch } from "../../features/filter/filterSlice";

const Search = () => {
  const dispatch = useDispatch();

  const handleSearch = (e) => {
    dispatch(changeSearch(e.target.value));
  };

  return (
    <div className="flex-1 max-w-xs search-field group">
      <i className="fa-solid fa-magnifying-glass search-icon group-focus-within:text-blue-500"></i>
      <input
        type="text"
        placeholder="Search Task"
        className="search-input"
        id="lws-searchTask"
        onChange={handleSearch}
      />
    </div>
  );
};

export default Search;
