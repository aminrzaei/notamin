import { Reducer } from "redux";

// Types
import { IChanges, IChangesValue, INote, NotesState } from "../common/types";

// Actions
import { CREATE_NOTE, DELETE_NOTE, EDIT_NOTE, EDIT_NOTES } from "./actions";

// Utils
import {
  getLocalStorageValue,
  setLocalStorageValue,
} from "../utils/localStorage";

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
    case EDIT_NOTES:
      const changes: IChanges = action.payload;
      const toDeleteNotesIds = Object.entries(changes)
        .filter(
          ([id, value]: [string, IChangesValue]) => value.doDelete === true
        )
        .map(([id, value]) => id);
      const renamedNotes = state.map((note: INote) => {
        if (changes[note.id]) {
          return { ...note, title: changes[note.id].newTitle };
        }
        return note;
      });
      const editedNotes = renamedNotes.filter(
        (note: INote) => !toDeleteNotesIds.includes(note.id)
      );
      setLocalStorageValue("NOTES", JSON.stringify(editedNotes));
      return editedNotes;
    default:
      return state;
  }
};

export default notesReducer;
