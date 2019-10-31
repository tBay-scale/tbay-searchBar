import { CREATE_SELECTION, CURRENT_SELECTION } from "./types";

export function createCategorySelections() {
  return function(dispatch) {
    fetch("http://localhost:3042/categories")
      .then(data => data.json())
      .then(selections => {
        return dispatch({
          type: CREATE_SELECTION,
          payload: selections
        });
      });
  };
}

export function changeCurrentSelection(obj, selections) {
  return function(dispatch) {
    for (var option of selections) {
      if (option.category_name === obj.category_name) {
        obj.category_id = option.category_id;
      }
    }
    return dispatch({
      type: CURRENT_SELECTION,
      payload: obj
    });
  };
}
