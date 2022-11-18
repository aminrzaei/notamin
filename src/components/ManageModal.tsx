import { Button, TextInput, Modal, Checkbox } from "@mantine/core";
import { useState } from "react";
import DeleteIcon from "../assets/icons/DeleteIcon";
import { INote, NotesState } from "../reducers/notesReducer";
import { ITag, TagsState } from "../reducers/tagsReducer";

interface ManageModalProps {
  modalTitle: string;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  items: NotesState | TagsState;
  onSave: (changes: IChanges) => void;
}

interface IRenderRowProps {
  item: INote | ITag;
  setChanges: React.Dispatch<React.SetStateAction<IChanges>>;
}

export interface IChangesValue {
  newTitle: string;
  doDelete: boolean;
}

export interface IChanges {
  [id: string]: IChangesValue;
}

const RenderRow = ({ item, setChanges }: IRenderRowProps) => {
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

const ManageModal = ({
  modalTitle,
  isOpen,
  setIsOpen,
  items,
  onSave,
}: ManageModalProps) => {
  const [changes, setChanges] = useState<IChanges>({});

  const handleSave = (): void => {
    onSave(changes);
    setIsOpen(false);
  };

  return (
    <Modal
      opened={isOpen}
      onClose={() => setIsOpen(false)}
      centered
      title={modalTitle}
    >
      <div className="modal-row-container">
        <div className="modal-header">
          <p className="modal-header__title">Title</p>
          <span className="modal-header__icon">
            <DeleteIcon color="#fd676b" />
          </span>
        </div>
        {items.map((item) => {
          return (
            <RenderRow key={item.id} item={item} setChanges={setChanges} />
          );
        })}
      </div>
      <div className="modal-btn-container">
        <Button variant="outline" color="red" onClick={() => setIsOpen(false)}>
          Cancel
        </Button>
        <Button ml="xs" color="teal" onClick={() => handleSave()}>
          Save
        </Button>
      </div>
    </Modal>
  );
};

export default ManageModal;
