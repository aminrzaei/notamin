import { useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../reducers";
import { Button } from "@mantine/core";

import NoteCard from "../components/NoteCard";
import AddIcon from "../assets/icons/AddIcon";
import { Link } from "react-router-dom";

const Home: React.FC = () => {
  const { notes, tags } = useSelector((state: RootState) => state);
  const dispatch = useDispatch();
  const notesWithTags = useMemo(() => {
    return notes.map((note) => {
      const noteTags = tags.filter((tag) => note.tags.includes(tag.id));
      return { ...note, tags: noteTags };
    });
  }, [notes, tags]);

  return (
    <>
      <div className="home__title">
        <h1>"My Notes"</h1>
      </div>
      <div className="notecard__container">
        {notesWithTags.map((note) => (
          <NoteCard note={note} />
        ))}
      </div>
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
