import { useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../reducers";
import { Button } from "@mantine/core";

import NoteCard from "../components/NoteCard";
import AddIcon from "../assets/icons/AddIcon";
import { Link } from "react-router-dom";

const Home: React.FC = () => {
  const { notes, tags } = useSelector((state: RootState) => state);
  const notesWithTags = useMemo(() => {
    return notes.map((note) => {
      const noteTags = tags.filter((tag) => note.tags.includes(tag.id));
      return { ...note, tags: noteTags };
    });
  }, [notes, tags]);

  const RenderNotes = () => {
    if (notesWithTags.length) {
      return (
        <div className="notecard__container">
          {notesWithTags.map((note) => (
            <NoteCard note={note} key={note.id} />
          ))}
        </div>
      );
    }
    return (
      <div className="no-notes">
        <Link to="/new">
          <p className="no-notes__title">Don't have any "Note" - Create one!</p>
        </Link>
      </div>
    );
  };

  return (
    <>
      <div className="home__title">
        <h1>"My Notes"</h1>
      </div>
      <RenderNotes />
      <Link to="/new">
        <div className="add-note__btn">
          <Button color="teal" rightIcon={<AddIcon color="white" />}>
            New Note
          </Button>
        </div>
      </Link>
    </>
  );
};

export default Home;
