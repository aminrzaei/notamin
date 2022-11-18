import { useState } from "react";

// Components
import { Button, Modal } from "@mantine/core";
import ModalRow from "./ModalRow";
import DeleteIcon from "./icons/DeleteIcon";

// Types
import { NotesState, TagsState, IChanges } from "../common/types";

interface IManageModalProps {
  modalTitle: string;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  items: NotesState | TagsState;
  onSave: (changes: IChanges) => void;
}

const ManageModal: React.FC<IManageModalProps> = ({
  modalTitle,
  isOpen,
  setIsOpen,
  items,
  onSave,
}) => {
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
      title={`Manage ${modalTitle}`}
    >
      <div className="modal-row-container">
        <div className="modal-header">
          <p className="modal-header__title">Title</p>
          <span className="modal-header__icon">
            <DeleteIcon color="#fd676b" />
          </span>
        </div>
        {items.length ? (
          items.map((item) => {
            return (
              <ModalRow key={item.id} item={item} setChanges={setChanges} />
            );
          })
        ) : (
          <div className="modal-body--no-content">No {modalTitle} to show!</div>
        )}
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
