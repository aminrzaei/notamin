import { v4 as uuidv4 } from "uuid";
import { Reducer } from "redux";
import { CREATE_NOTE } from "./actions";

import { ITag } from "./tagsReducer";

export interface IRawNote {
  title: string;
  body: string;
  tags: ITag[];
}
export interface INote extends IRawNote {
  id: string;
}

export type NotesState = INote[];

const getLocalStorageValue = (key: string) => {
  const jsonValue = localStorage.getItem(key) || "[]";
  return JSON.parse(jsonValue);
};

const setLocalStorageValue = (key: string, value: string): void =>
  localStorage.setItem(key, value);

const initialState: NotesState = getLocalStorageValue("NOTES");

const notesReducer: Reducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_NOTE:
      const noteDate = action.payload;
      const newNote: INote = {
        id: uuidv4(),
        title: noteDate.title,
        body: noteDate.body,
        tags: noteDate.tags.map((tag: ITag) => tag.id),
      };
      const allNewNotes = [...state, newNote];
      setLocalStorageValue("NOTES", JSON.stringify(allNewNotes));
      return allNewNotes;
    default:
      return state;
  }
};

export default notesReducer;
