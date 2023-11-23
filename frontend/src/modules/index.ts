import { combineReducers } from "redux";
import blogReducer from "./blogModule";
import newsReducer from "./newsModule";
import pageReducer from "./pageModule";

const rootReducer = combineReducers({
    pageReducer,
    blogReducer,
    newsReducer
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;