import { combineReducers } from "redux";
import blogReducer from "./blogModule";
import newsReducer from "./newsModule";
import pageReducer from "./pageModule";
import imageReducer from "./imageModule";

const rootReducer = combineReducers({
    pageReducer,
    blogReducer,
    imageReducer,
    newsReducer
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;