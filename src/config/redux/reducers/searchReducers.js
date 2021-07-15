import {
  SEARCH_LIST_PRODUCT,
  SEARCH_REQUEST_PRODUCT,
} from "../constants/searchConstants";

const stateSearch = {
  search: [],
  loading: false,
};

export const searchReducer = (state = stateSearch, action) => {
  switch (action.type) {
    case SEARCH_REQUEST_PRODUCT:
      return { loading: true };
    case SEARCH_LIST_PRODUCT:
      return {
        ...state,
        search: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};
