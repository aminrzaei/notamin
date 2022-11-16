import { Link } from "react-router-dom";
import { INoteWithTag } from "../reducers/notesReducer";

interface INoteCardProps {
  note: INoteWithTag;
}

const NoteCard = ({ note }: INoteCardProps) => {
  return (
    <Link to={`/${note.id}`}>
      <div key={note.id} className="notecard">
        <p className="notecard__title">{note.title}</p>
        <p
          className="notecard__body"
          dangerouslySetInnerHTML={{ __html: note.body }}
        />
        <ul className="notecard__tag-container">
          {note.tags.map((tag) => {
            return (
              <li className="notecard__tag" key={tag.id}>
                {tag.title}
              </li>
            );
          })}
        </ul>
      </div>
    </Link>
  );
};

export default NoteCard;
