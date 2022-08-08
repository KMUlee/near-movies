// Action type

const DAILY_BOX_OFFICE = "DAILY_BOX_OFFICE";
const WEEKLY_BOX_OFFICE = "WEEKLY_BOX_OFFICE";
const NATION_BOX_OFFICE = "NATION_BOX_OFFICE";
const MULTI_BOX_OFFICE = "MULTI_BOX_OFFICE";

// Action function

export const dailyBoxOffice = () => ({ type: DAILY_BOX_OFFICE });
export const weeklyBoxOffice = () => ({ type: WEEKLY_BOX_OFFICE });
export const nationBoxOffice = (nation) => ({
  type: NATION_BOX_OFFICE,
  nation,
});
export const multiBoxOffice = (multi) => ({
  type: MULTI_BOX_OFFICE,
  multi,
});

// Initial state

const initialState = { boxOffice: false, nation: "entire" };

//reducer

const BoxOffice = (state = initialState, action) => {
  switch (action.type) {
    case DAILY_BOX_OFFICE:
      return { ...state, boxOffice: false };
    case WEEKLY_BOX_OFFICE:
      return { ...state, boxOffice: true };
    case NATION_BOX_OFFICE:
      return { ...state, nation: action.nation };
    case MULTI_BOX_OFFICE:
      return { ...state, multi: action.multi };
    default:
      return state;
  }
};

export default BoxOffice;
