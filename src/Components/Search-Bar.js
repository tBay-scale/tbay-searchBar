import React from "react";
import Option from "./Search-Options";
import {
  keyDownActiveOption,
  keyUpActiveOption,
  keySubmission
} from "../InterfaceFunc/Autofill";
import { currentSearchString, resetSelection } from "../Actions/searchActions";
import { connect } from "react-redux";

const SearchBar = props => {
  return (
    <div className="search-container">
      <input
        className="Search-Bar"
        id="Search-Bar-Id"
        type="search"
        placeholder="Search for anything"
        onChange={() => {
          let currentStringVal = document.getElementById("Search-Bar-Id").value;
          if (currentStringVal !== "") {
            props.currentSearchString(
              currentStringVal,
              props.currentSelection.category_id
            );
          } else if (currentStringVal === "") {
            props.resetSelection();
          }
        }}
        onKeyDown={e => {
          if (e.keyCode === 40) {
            keyDownActiveOption(props.options);
          } else if (e.keyCode === 38) {
            keyUpActiveOption(props.options);
          } else if (e.keyCode === 13) {
            keySubmission(props.options);
            props.resetSelection();
          }
        }}
      ></input>
      <button id="Search-Submit"> Search </button>
      {props.options.length === 0 ? (
        ""
      ) : (
        <div className="search-autofill-options">
          {props.options.map(option => {
            return (
              <Option
                key={option.id}
                id={option.id}
                name={option.product_name}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

const mapStateToProps = state => ({
  options: state.options.products,
  currentSelection: state.categories.currentSelection
});

export default connect(
  mapStateToProps,
  { currentSearchString, resetSelection }
)(SearchBar);
// export default SearchBar;
