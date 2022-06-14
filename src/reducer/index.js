/* eslint-disable no-case-declarations */
/* eslint-disable default-param-last */
const initialState = {
  movies: [],
  filterSelect: [],
  fil: [],
  error: [],
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case 'GET_MOVIES':
      return {
        ...state,
        movies: action.payload.movie.shift(),
        filterSelect: action.payload.filter.shift(),
      };

    case 'FILTER_LANGUAGE':
      const allFil = state.filterSelect;

      const filterMap = allFil.map((item) => [item.original_language, item]);
      const filterAction = filterMap.map((item) => [item[0] === action.payload, item]);
      const filterTrueFalse = filterAction.filter((el) => el[0] === true);
      const filterEnd = filterTrueFalse.map((el) => el.reverse().shift().reverse().shift());

      const allFiltered = action.payload === 'all' ? allFil : filterEnd;

      return {
        ...state,
        movies: allFiltered,
        fil: filterEnd,
      };

    case 'ERROR':
      return {
        ...state,
        error: action.payload,
      };

    default:
      return state;
  }
}

export default rootReducer;
