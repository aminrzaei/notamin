import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../reducers";
import { Button } from "@mantine/core";

import NoteCard from "../components/NoteCard";
import AddIcon from "../assets/icons/AddIcon";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

const Home: React.FC = () => {
  const { notes, tags } = useSelector((state: RootState) => state);

  const notesWithTagsData = useMemo(() => {
    return notes
      .map((note) => {
        const noteTags = tags.filter((tag) => note.tags.includes(tag.id));
        return { ...note, tags: noteTags };
      })
      .reverse();
  }, [notes, tags]);

  const [notesWithTags, setNotesWithTags] = useState(notesWithTagsData);

  useEffect(() => {
    setNotesWithTags(notesWithTagsData);
  }, [notesWithTagsData]);

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
        <p className="no-notes__title">No note to show!</p>
      </div>
    );
  };

  return (
    <>
      <div className="home__title">
        <h1>"My Notes"</h1>
      </div>
      <Navbar
        tags={tags}
        notes={notesWithTagsData}
        setNotes={setNotesWithTags}
      />
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
