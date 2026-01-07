import bookReducer from "./books";
import { combineReducers } from "redux";

export default combineReducers({
    books: bookReducer,
})