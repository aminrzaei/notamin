import { useState } from "react";
import { Button, MultiSelect, TextInput } from "@mantine/core";
import { RichTextEditor } from "@mantine/rte";
import { useNavigate } from "react-router-dom";

import { ITag } from "../reducers/tagsReducer";
import { INote } from "../reducers/notesReducer";
import { CREATE_TAG } from "../reducers/actions";

import { useDispatch } from "react-redux";

interface INoteFormProps {
  onSubmit: (note: INote) => void;
  tags: ITag[];
}

const initialValue =
  "<p>Your initial <b>html value</b> or an empty string to init editor without value</p>";

const NoteForm = ({ onSubmit, tags }: INoteFormProps) => {
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const [data, setData] = useState([
    { value: "react", label: "React" },
    { value: "ng", label: "Angular" },
  ]);
  const [value, onChange] = useState(initialValue);

  return (
    <>
      <div>
        <TextInput
          placeholder="Enter your task title"
          label="Title"
          error="Title is required!"
          withAsterisk
        />
        <MultiSelect
          label="Creatable MultiSelect"
          data={tags.map((tag) => {
            return { value: tag.title, label: tag.title };
          })}
          placeholder="Select items"
          searchable
          creatable
          getCreateLabel={(query) => `+ Create ${query}`}
          onCreate={(query) => {
            const item = { value: query, label: query };
            const newTag: ITag = { id: query, title: query };
            dispatch({ type: CREATE_TAG, payload: newTag });
            return item;
          }}
        />
        <RichTextEditor value={value} onChange={onChange} id="rte" />
        <Button variant="filled" onClick={() => console.log("submit")}>
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
