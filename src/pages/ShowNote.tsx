import { useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams, useNavigate } from "react-router-dom";

// Components
import { Modal, Button, ActionIcon } from "@mantine/core";
import EditIcon from "../assets/icons/EditIcon";
import DeleteIcon from "../assets/icons/DeleteIcon";

// Types
import { RootState } from "../reducers";
import { DELETE_NOTE } from "../reducers/actions";

const ShowNote: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { noteId } = useParams();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const { notes, tags } = useSelector((state: RootState) => state);
  const noteWithTags = useMemo(() => {
    const note = notes.find((note) => note.id === noteId);
    if (note === undefined) navigate("/", { replace: true });
    const noteTags = tags.filter((tag) => note?.tags.includes(tag.id));
    return { ...note, tags: noteTags };
  }, [notes, tags]);
  return (
    <div className="showpage">
      <div className="showpage__header">
        <h1 className="showpage__title">{noteWithTags.title}</h1>
        <Link to="edit">
          <ActionIcon
            mt={10}
            variant="outline"
            color="indigo"
            title="Edit this note"
            mr={10}
          >
            <EditIcon color="#5c7cfa" />
          </ActionIcon>
        </Link>
        <ActionIcon
          variant="filled"
          color="red"
          mt={10}
          ml="auto"
          title="Delete this note"
          onClick={() => setIsModalOpen(true)}
        >
          <DeleteIcon color="white" />
        </ActionIcon>
      </div>
      <div
        className="showpage__body"
        dangerouslySetInnerHTML={{ __html: noteWithTags.body || "" }}
      />
      <ul className="showpage__tag-container">
        {noteWithTags.tags.map((tag) => {
          return (
            <li key={tag.id} className="showpage__tag">
              {tag.title}
            </li>
          );
        })}
      </ul>
      <div className="showpage__home-btn">
        <Button color="blue" onClick={() => navigate("/", { replace: true })}>
          Back to Home
        </Button>
      </div>
      <Modal
        opened={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        centered
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
  );
};

export default ShowNote;
