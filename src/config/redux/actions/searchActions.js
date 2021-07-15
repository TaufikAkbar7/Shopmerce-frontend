import axios from "axios";
import {
  SEARCH_LIST_PRODUCT,
  SEARCH_REQUEST_PRODUCT,
} from "../constants/searchConstants";

export const searchListProduct = () => async (dispatch) => {
  dispatch({
    type: SEARCH_REQUEST_PRODUCT,
  });
  await axios
    .get(`http://localhost:4000/v1/products?page=1&perPage=16`)
    .then((response) => {
      const getData = response.data.data;
      let searchTerm = "";
      getData.filter((val) => {
        if (searchTerm === "") {
          return val;
        } else if (val.name.toLowerCase().includes(searchTerm.toLowerCase())) {
          return val;
        }
      });
      dispatch({ type: SEARCH_LIST_PRODUCT, payload: searchTerm });
    })
    .catch((error) => console.log(error));
};
