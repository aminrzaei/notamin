import { Link } from "react-router-dom";

// Types
import { INoteWithTag } from "../common/types";

interface INoteCardProps {
  note: INoteWithTag;
}

const NoteCard: React.FC<INoteCardProps> = ({ note }) => {
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
