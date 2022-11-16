import { combineReducers } from "redux";

import notesReducer, { NotesState } from "./notesReducer";
import tagsReducer, { TagsState } from "./tagsReducer";

export interface RootState {
  notes: NotesState;
  tags: TagsState;
}

export default combineReducers({ notes: notesReducer, tags: tagsReducer });
