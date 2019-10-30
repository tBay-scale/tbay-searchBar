import { CURRENT_SEARCH_STRING, RESET_SEARCH } from "./types";

export function currentSearchString(string, category_id = 0) {
  return function(dispatch) {
    fetch("http://localhost:3042/autocomplete", {
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify({
        category_id: category_id,
        search: string
      })
    })
      .then(data => {
        return data.json();
      })
      .then(products => {
        return dispatch({
          type: CURRENT_SEARCH_STRING,
          payload: products
        });
      });
  };
}

export function resetSelection() {
  return function(dispatch) {
    return dispatch({
      type: RESET_SEARCH
    });
  };
}
