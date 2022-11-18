import { Reducer } from "redux";

// Types
import { IChangesValue } from "../components/ManageModal";
import { IChanges } from "../components/ManageModal";

// Actions
import { CREATE_TAG, EDIT_TAGS } from "./actions";

export interface ITag {
  title: string;
  id: string;
}
export type TagsState = ITag[];

const getLocalStorageValue = (key: string) => {
  const jsonValue = localStorage.getItem(key) || "[]";
  return JSON.parse(jsonValue);
};

const setLocalStorageValue = (key: string, value: string): void =>
  localStorage.setItem(key, value);

const initialState: TagsState = getLocalStorageValue("TAGS");

const tagsReducer: Reducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_TAG:
      const tagDate = action.payload;
      const allNewTags = [...state, tagDate];
      setLocalStorageValue("TAGS", JSON.stringify(allNewTags));
      return allNewTags;
    case EDIT_TAGS:
      const changes: IChanges = action.payload;
      const toDeleteTagsIds = Object.entries(changes)
        .filter(
          ([id, value]: [string, IChangesValue]) => value.doDelete === true
        )
        .map(([id, value]) => id);
      const renamedTags = state.map((tag: ITag) => {
        if (changes[tag.id]) {
          return { ...tag, title: changes[tag.id].newTitle };
        }
        return tag;
      });
      const editedTags = renamedTags.filter(
        (tag: ITag) => !toDeleteTagsIds.includes(tag.id)
      );
      setLocalStorageValue("TAGS", JSON.stringify(editedTags));
      return editedTags;
    default:
      return state;
  }
};

export default tagsReducer;
