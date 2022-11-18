import { combineReducers } from "redux";

// Types
import notesReducer from "./notesReducer";
import tagsReducer from "./tagsReducer";

export default combineReducers({ notes: notesReducer, tags: tagsReducer });
