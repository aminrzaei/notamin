import { useMemo, useState } from "react";
import { Button, MultiSelect, TextInput } from "@mantine/core";
import { RichTextEditor } from "@mantine/rte";
import { useNavigate } from "react-router-dom";

import { IRawTag, ITag } from "../reducers/tagsReducer";
import { IRawNote } from "../reducers/notesReducer";
import { CREATE_TAG } from "../reducers/actions";

import { useDispatch } from "react-redux";

interface INoteFormProps {
  onSubmit: (note: IRawNote) => void;
  tags: ITag[];
}

const NoteForm = ({ onSubmit, tags }: INoteFormProps) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [noteTitle, setNoteTitle] = useState<string>("");
  const [multiselectData, setMultiselectData] = useState<ITag[]>([]);
  const [rteValue, setRteValue] = useState("");
  const [titleError, setTitleError] = useState<string>("");

  const tagForMultiselect = useMemo(() => {
    return tags.map((tag) => {
      return { value: tag.title, label: tag.title };
    });
  }, [tags]);

  const onMultiselectChange = (tagTitles: string[]) => {
    const selectedTags = tags.filter((tag) => {
      return tagTitles.includes(tag.title);
    });
    setMultiselectData(selectedTags);
  };

  const handleSubmit = () => {
    if (noteTitle.length < 1) {
      setTitleError("Title is required!");
      return;
    }
    const newNote: IRawNote = {
      title: noteTitle,
      body: rteValue,
      tags: multiselectData,
    };
    onSubmit(newNote);
  };

  return (
    <>
      <div>
        <TextInput
          placeholder="Enter your task title"
          label="Title"
          error={titleError}
          value={noteTitle}
          onChange={(e) => setNoteTitle(e.target.value)}
          withAsterisk
        />
        <MultiSelect
          label="Creatable MultiSelect"
          data={tagForMultiselect}
          placeholder="Select items"
          searchable
          creatable
          onChange={(value) => onMultiselectChange(value)}
          getCreateLabel={(query) => `+ Create ${query}`}
          onCreate={(query) => {
            const item = { value: query, label: query };
            const newTag: IRawTag = { title: query };
            dispatch({ type: CREATE_TAG, payload: newTag });
            return item;
          }}
        />
        <RichTextEditor value={rteValue} onChange={setRteValue} id="rte" />
        <Button variant="filled" onClick={handleSubmit}>
          Save changes
        </Button>
        <Button
          variant="light"
          color="red"
          onClick={() => navigate("/", { replace: true })}
        >
          Cancel
        </Button>
      </div>
    </>
  );
};

export default NoteForm;
