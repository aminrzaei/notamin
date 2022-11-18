import { useMemo, useState } from "react";
import { useDispatch } from "react-redux";

// Components
import { Button, MultiSelect, TextInput } from "@mantine/core";
import ManageModal from "./ManageModal";
import SearchIcon from "./icons/SearchIcon";

// Types
import { INoteWithTag, ITag } from "../common/types";

// Actions
import { EDIT_NOTES, EDIT_TAGS } from "../reducers/actions";

interface INavbarProps {
  tags: ITag[];
  notes: INoteWithTag[];
  setNotes: React.Dispatch<React.SetStateAction<INoteWithTag[]>>;
}

const Navbar: React.FC<INavbarProps> = ({ tags, notes, setNotes }) => {
  const dispatch = useDispatch();

  const [isNotesModalOpen, setIsNotesModalOpen] = useState<boolean>(false);
  const [isTagsModalOpen, setIsTagsModalOpen] = useState<boolean>(false);
  const [multiselectValue, setMultiselectValue] = useState<string[]>([]);
  const [searchValue, setSearchValue] = useState<string>("");

  const tagForMultiselect = useMemo(() => {
    return tags.map((tag) => {
      return { value: tag.id, label: tag.title };
    });
  }, [tags]);

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
    <>
      <div className="nav-container">
        <TextInput
          className="nav-container__search"
          placeholder="Search note title "
          rightSection={<SearchIcon color="#C1C2C5" />}
          autoComplete="off"
          value={searchValue}
          onChange={(e) => {
            const searchTerm = e.target.value;
            setSearchValue(searchTerm);
            handleSearch(searchTerm);
          }}
        />
        <MultiSelect
          className="nav-container__filter"
          data={tagForMultiselect}
          placeholder="Filter by tags"
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
            onClick={() => setIsNotesModalOpen(true)}
          >
            Manage Notes
          </Button>
          <Button
            className="nav-container__btn--tags"
            variant="light"
            color="blue"
            onClick={() => setIsTagsModalOpen(true)}
          >
            Manage Tags
          </Button>
        </div>
      </div>
      <ManageModal
        modalTitle="Manage Notes"
        isOpen={isNotesModalOpen}
        setIsOpen={setIsNotesModalOpen}
        items={notes}
        onSave={(changes) => dispatch({ type: EDIT_NOTES, payload: changes })}
      />
      <ManageModal
        modalTitle="Manage Tags"
        isOpen={isTagsModalOpen}
        setIsOpen={setIsTagsModalOpen}
        items={tags}
        onSave={(changes) => dispatch({ type: EDIT_TAGS, payload: changes })}
      />
    </>
  );
};

export default Navbar;
