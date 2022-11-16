import { useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { RootState } from "../reducers";
import { useNavigate } from "react-router-dom";
import { Modal, Button, Group } from "@mantine/core";
import { DELETE_NOTE } from "../reducers/actions";

const ShowNote: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { noteId } = useParams();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { notes, tags } = useSelector((state: RootState) => state);
  const noteWithTags = useMemo(() => {
    const note = notes.find((note) => note.id === noteId);
    if (note === undefined) navigate("/", { replace: true });
    const noteTags = tags.filter((tag) => note?.tags.includes(tag.id));
    return { ...note, tags: noteTags };
  }, [notes, tags]);
  return (
    <>
      <div>
        <Link to="edit">
          <Button>Edit</Button>
        </Link>
        <Button color="red" onClick={() => setIsModalOpen(true)}>
          Delete
        </Button>
        <h1>{noteWithTags.title}</h1>
        <p dangerouslySetInnerHTML={{ __html: noteWithTags.body || "" }}></p>
        <ul>
          {noteWithTags.tags.map((tag) => {
            return <li key={tag.id}>{tag.title}</li>;
          })}
        </ul>
        <Modal
          opened={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title="Are you sure about deleting this note?"
        >
          <Button
            color="blue"
            variant="subtle"
            onClick={() => setIsModalOpen(false)}
          >
            Cancel
          </Button>
          <Button
            color="red"
            onClick={() => {
              dispatch({ type: DELETE_NOTE, payload: noteWithTags.id });
            }}
          >
            Delete this note
          </Button>
        </Modal>
      </div>
    </>
  );
};

export default ShowNote;
