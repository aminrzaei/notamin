import NoteForm from "../components/NoteForm";

import { useSelector, useDispatch } from "react-redux";

import { RootState } from "../reducers";
import { CREATE_NOTE } from "../reducers/actions";

import { IRawNote } from "../reducers/notesReducer";

const NewNote = () => {
  const tags = useSelector((state: RootState) => state.tags);
  const dispatch = useDispatch();

  const handleCreateNote = (note: IRawNote) => {
    dispatch({ type: CREATE_NOTE, payload: note });
  };

  return (
    <>
      <h1>Create new note</h1>
      <NoteForm onSubmit={handleCreateNote} tags={tags} />
    </>
  );
};

export default NewNote;
