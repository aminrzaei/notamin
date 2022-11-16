import { Reducer } from "redux";
import { CREATE_NOTE, DELETE_NOTE, EDIT_NOTE } from "./actions";
import { ITag } from "./tagsReducer";
export interface IRawNote {
  title: string;
  body: string;
  tags: string[];
}
export interface INote extends IRawNote {
  id: string;
}
export interface INoteWithTag {
  id: string;
  title: string;
  body: string;
  tags: ITag[];
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
      const allNewNotes = [...state, noteDate];
      setLocalStorageValue("NOTES", JSON.stringify(allNewNotes));
      return allNewNotes;
    case EDIT_NOTE:
      const editedNoteDate = action.payload;
      const filterdNotes = state.filter((note: INote) => {
        return note.id !== editedNoteDate.id;
      });
      const allNewEditedNotes = [...filterdNotes, editedNoteDate];
      setLocalStorageValue("NOTES", JSON.stringify(allNewEditedNotes));
      return allNewEditedNotes;
    case DELETE_NOTE:
      const noteId = action.payload;
      const otherNotes = state.filter((note: INote) => {
        return note.id !== noteId;
      });
      setLocalStorageValue("NOTES", JSON.stringify(otherNotes));
      return otherNotes;
    default:
      return state;
  }
};

export default notesReducer;
