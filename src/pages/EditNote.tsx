import { useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";

// Components
import NoteForm from "../components/NoteForm";

// Types
import { RootState, IRawNote } from "../common/types";

// Actions
import { EDIT_NOTE } from "../reducers/actions";

const EditNote: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { noteId } = useParams();
  const { notes, tags } = useSelector((state: RootState) => state);

  const noteWithTags = useMemo(() => {
    const note = notes.find((note) => note.id === noteId);
    if (note === undefined) navigate("/", { replace: true });
    const noteTags = tags.filter((tag) => note?.tags.includes(tag.id));
    return { ...note, tags: noteTags };
  }, [notes, tags]);

  const handleEditNote = (note: IRawNote) => {
    dispatch({ type: EDIT_NOTE, payload: note });
  };

  return (
    <>
      <div>
        <NoteForm
          onSubmit={handleEditNote}
          tags={tags}
          initialState={noteWithTags}
          formTitle="Edit note"
        />
      </div>
    </>
  );
};

export default EditNote;
