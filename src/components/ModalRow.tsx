import { useState } from "react";

// Components
import { Checkbox, TextInput } from "@mantine/core";

// types
import { INote } from "../reducers/notesReducer";
import { ITag } from "../reducers/tagsReducer";
import { IChanges } from "./ManageModal";

interface IModalRowProps {
  item: INote | ITag;
  setChanges: React.Dispatch<React.SetStateAction<IChanges>>;
}
const ModalRow = ({ item, setChanges }: IModalRowProps) => {
  const [title, setTitle] = useState<string>(item.title);
  const [isChecked, setIsChecked] = useState<boolean>(false);
  return (
    <div className="modal-row">
      <TextInput
        value={title}
        onChange={(e) => {
          const newTitle = e.target.value;
          setTitle(newTitle);
          setChanges((prev) => {
            return {
              ...prev,
              [item.id]: { newTitle, doDelete: isChecked },
            };
          });
        }}
        className="modal-row__input"
      />
      <Checkbox
        checked={isChecked}
        radius="xl"
        size="md"
        color="red"
        onChange={(e) => {
          const doDelete = e.currentTarget.checked;
          setIsChecked(doDelete);
          setChanges((prev) => {
            return {
              ...prev,
              [item.id]: { newTitle: title, doDelete },
            };
          });
        }}
        className="modal-row__checkbox"
      />
    </div>
  );
};

export default ModalRow;
