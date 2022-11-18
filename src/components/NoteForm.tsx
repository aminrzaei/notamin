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
  formTitle: string;
}

const NoteForm = ({
  onSubmit,
  tags,
  initialState,
  formTitle,
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
      <div className="form-container">
        <h1 className="form-title">{formTitle}</h1>
        <TextInput
          placeholder="Enter your task title"
          label="Title"
          error={titleError}
          value={noteTitle}
          mb="sm"
          onChange={(e) => setNoteTitle(e.target.value)}
          withAsterisk
        />
        <MultiSelect
          label="Creatable MultiSelect"
          data={tagForMultiselect}
          placeholder="Select items"
          searchable
          creatable
          mb="lg"
          value={multiselectValue}
          onChange={setMultiselectValue}
          getCreateLabel={(query) => `+ Add ${query}`}
          onCreate={(query) => {
            const tagId = uuidv4();
            const item = { value: tagId, label: query };
            const newTag: ITag = { id: tagId, title: query };
            dispatch({ type: CREATE_TAG, payload: newTag });
            setMultiselectValue((prev) => [...prev, tagId]);
            return item;
          }}
        />
        <RichTextEditor
          controls={[
            ["bold", "strike", "italic", "underline", "clean"],
            ["h1", "h2", "h3", "h4", "h5", "h6"],
            ["sub", "sup", "link"],
            ["alignLeft", "alignCenter", "alignRight"],
            ["code", "codeBlock"],
            ["unorderedList", "orderedList", "blockquote"],
          ]}
          mb="lg"
          value={rteValue}
          onChange={setRteValue}
          id="rte"
        />
        <div className="form__btn-container">
          <Button
            variant="outline"
            color="red"
            onClick={() => navigate("..", { replace: true })}
          >
            Cancel
          </Button>
          <Button ml="xs" variant="filled" color="teal" onClick={handleSubmit}>
            Save changes
          </Button>
        </div>
      </div>
    </>
  );
};

export default NoteForm;
