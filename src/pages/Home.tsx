import { useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../reducers";
import { Button, MultiSelect, TextInput } from "@mantine/core";

import NoteCard from "../components/NoteCard";
import AddIcon from "../assets/icons/AddIcon";
import { Link } from "react-router-dom";
import SearchIcon from "../assets/icons/SearchIcon";

const Home: React.FC = () => {
  const { notes, tags } = useSelector((state: RootState) => state);
  const notesWithTags = useMemo(() => {
    return notes
      .map((note) => {
        const noteTags = tags.filter((tag) => note.tags.includes(tag.id));
        return { ...note, tags: noteTags };
      })
      .reverse();
  }, [notes, tags]);
  const data = [
    { value: "react", label: "React" },
    { value: "ng", label: "Angular" },
    { value: "svelte", label: "Svelte" },
    { value: "vue", label: "Vue" },
    { value: "riot", label: "Riot" },
    { value: "next", label: "Next.js" },
    { value: "blitz", label: "Blitz.js" },
  ];
  const RenderNotes = () => {
    if (notesWithTags.length) {
      return (
        <>
          <div className="nav-container">
            <TextInput
              className="nav-container__search"
              placeholder="Search note title "
              rightSection={<SearchIcon color="#C1C2C5" />}
            />
            <MultiSelect
              className="nav-container__filter"
              data={data}
              placeholder="Tags to see"
            />
            <div className="nav-container__btn-container">
              <Button
                className="nav-container__btn--notes"
                variant="light"
                color="teal"
              >
                Manage Notes
              </Button>
              <Button
                className="nav-container__btn--tags"
                variant="light"
                color="blue"
              >
                Manage Tags
              </Button>
            </div>
          </div>
          <div className="notecard__container">
            {notesWithTags.map((note) => (
              <NoteCard note={note} key={note.id} />
            ))}
          </div>
        </>
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
