import { useMemo, useState } from "react";
import { Button, MultiSelect, TextInput } from "@mantine/core";
import { RichTextEditor } from "@mantine/rte";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

import { ITag } from "../reducers/tagsReducer";
import { INote } from "../reducers/notesReducer";
import { CREATE_TAG } from "../reducers/actions";

import { useDispatch } from "react-redux";

interface INoteFormProps {
  initialState: any;
  onSubmit: (note: INote) => void;
  tags: ITag[];
}

const NoteForm = ({
  onSubmit,
  tags,
  initialState = {
    id: "",
    title: "",
    body: "",
    tags: [],
  },
}: INoteFormProps) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [noteTitle, setNoteTitle] = useState<string>(initialState.title);
  const [multiselectValue, setMultiselectValue] = useState<string[]>(() => {
    return initialState.tags.map((tag: ITag) => tag.id);
  });
  const [rteValue, setRteValue] = useState(initialState.body);
  const [titleError, setTitleError] = useState<string>("");

  const tagForMultiselect = useMemo(() => {
    return tags.map((tag) => {
      return { value: tag.id, label: tag.title };
    });
  }, [tags]);

  const handleSubmit = () => {
    if (noteTitle.length < 1) {
      setTitleError("Title is required!");
      return;
    }

    const newNote: INote = {
      id: initialState.id === "" ? uuidv4() : initialState.id,
      title: noteTitle,
      body: rteValue,
      tags: multiselectValue,
    };
    onSubmit(newNote);
    navigate("/", { replace: true });
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
          value={multiselectValue}
          onChange={setMultiselectValue}
          getCreateLabel={(query) => `+ Create ${query}`}
          onCreate={(query) => {
            const tagId = uuidv4();
            const item = { value: tagId, label: query };
            const newTag: ITag = { id: tagId, title: query };
            dispatch({ type: CREATE_TAG, payload: newTag });
            setMultiselectValue((prev) => [...prev, tagId]);
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
          onClick={() => navigate("..", { replace: true })}
        >
          Cancel
        </Button>
      </div>
    </>
  );
};

export default NoteForm;
