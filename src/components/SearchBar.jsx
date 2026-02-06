import React, { useState } from "react";

import { useDispatch } from "react-redux";
import { setQuery } from "../features/searchSlice";
const SearchBar = () => {
  const [text, setText] = useState("");

  const dispatch = useDispatch();

  const submitHandeler = (e) => {
    e.preventDefault();
    // console.log("form submited");
    dispatch(setQuery(text));
    // console.log(text);
    setText("");
  };
  return (
    <div>
      <form
        onSubmit={(e) => {
          submitHandeler(e);
        }}
        action=""
        className="flex p-7 bg-(--c1)"
      >
        <input
          value={text}
          onChange={(e) => {
            // console.log(e.target.value);
            setText(e.target.value);
          }}
          type="text"
          required
          className="border-2 py-2 w-full px-2 rounded-2xl outline-none gap-3 text-lg cursor-pointer text-white "
          name=""
          id=""
          placeholder="Search Anything "
        />
        <button className="border-2 py-2 px-2 rounded-2xl outline-none  text-lg active:scale-95 text-white">
          Search
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
