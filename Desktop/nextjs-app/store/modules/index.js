import { combineReducers } from "@reduxjs/toolkit";

import BoxOffice from "./BoxOfficeSettings";

const initialState = {
  BoxOffice: { boxOffice: false, nation: "entire", multi: "entire" },
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    default:
      const combineReducer = combineReducers({ BoxOffice });
      return combineReducer(state, action);
  }
};

export default rootReducer;
