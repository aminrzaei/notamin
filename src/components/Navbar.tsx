import { useEffect, useMemo, useState } from "react";
import { Button, MultiSelect, TextInput } from "@mantine/core";
import SearchIcon from "../assets/icons/SearchIcon";
import { INoteWithTag } from "../reducers/notesReducer";
import { ITag } from "../reducers/tagsReducer";

interface INavbarProps {
  tags: ITag[];
  notes: INoteWithTag[];
  setNotes: React.Dispatch<React.SetStateAction<INoteWithTag[]>>;
}

const Navbar = ({ tags, notes, setNotes }: INavbarProps) => {
  const tagForMultiselect = useMemo(() => {
    return tags.map((tag) => {
      return { value: tag.id, label: tag.title };
    });
  }, [tags]);
  const [multiselectValue, setMultiselectValue] = useState<string[]>([]);
  const [searchValue, setSearchValue] = useState<string>("");

  const handleSearch = (value: string) => {
    const matchNotes = notes.filter((note) => {
      const noteTitle = note.title.toLowerCase();
      const searchTerm = value.toLowerCase();
      return noteTitle.includes(searchTerm);
    });
    setNotes(matchNotes);
  };

  const handleFilterByTags = (selectedTags: string[]) => {
    const checker = (arr: string[], target: string[]) =>
      target.every((v) => arr.includes(v));
    const matchNotes = notes.filter((note) => {
      const noteTags = note.tags.map((tag) => tag.id);
      return checker(noteTags, selectedTags);
    });
    setNotes(matchNotes);
  };

  return (
    <div className="nav-container">
      <TextInput
        className="nav-container__search"
        placeholder="Search note title "
        rightSection={<SearchIcon color="#C1C2C5" />}
        value={searchValue}
        onChange={(e) => {
          const searchTerm = e.target.value;
          console.log(searchTerm);
          setSearchValue(searchTerm);
          handleSearch(searchTerm);
        }}
      />
      <MultiSelect
        className="nav-container__filter"
        data={tagForMultiselect}
        placeholder="Tags to see"
        searchable
        value={multiselectValue}
        onChange={(selectedTags) => {
          setMultiselectValue(selectedTags);
          handleFilterByTags(selectedTags);
        }}
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
  );
};

export default Navbar;
