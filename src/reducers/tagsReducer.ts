import { v4 as uuidv4 } from "uuid";
import { Reducer } from "redux";
import { CREATE_TAG } from "./actions";

export interface ITag {
  id: string;
  title: string;
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
      const newTag: ITag = {
        id: uuidv4(),
        title: tagDate.title,
      };
      const allNewTags = [...state, newTag];
      setLocalStorageValue("TAGS", JSON.stringify(allNewTags));
      return allNewTags;
    default:
      return state;
  }
};

export default tagsReducer;
