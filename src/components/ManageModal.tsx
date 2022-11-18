import { useState } from "react";

// Components
import { Button, Modal } from "@mantine/core";
import ModalRow from "./ModalRow";
import DeleteIcon from "../assets/icons/DeleteIcon";

// Types
import { NotesState } from "../reducers/notesReducer";
import { TagsState } from "../reducers/tagsReducer";

interface ManageModalProps {
  modalTitle: string;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  items: NotesState | TagsState;
  onSave: (changes: IChanges) => void;
}

export interface IChangesValue {
  newTitle: string;
  doDelete: boolean;
}

export interface IChanges {
  [id: string]: IChangesValue;
}

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
          return <ModalRow key={item.id} item={item} setChanges={setChanges} />;
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
