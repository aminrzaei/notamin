import { useSelector, useDispatch } from "react-redux";

// Componets
import NoteForm from "../components/NoteForm";

// Types
import { RootState } from "../reducers";
import { IRawNote } from "../reducers/notesReducer";

// Actions
import { CREATE_NOTE } from "../reducers/actions";

const NewNote: React.FC = () => {
  const tags = useSelector((state: RootState) => state.tags);
  const dispatch = useDispatch();

  const handleCreateNote = (note: IRawNote) => {
    dispatch({ type: CREATE_NOTE, payload: note });
  };

  return (
    <NoteForm
      onSubmit={handleCreateNote}
      tags={tags}
      formTitle="Create new note"
      initialState={{ id: "", title: "", body: "", tags: [] }}
    />
  );
};

export default NewNote;
