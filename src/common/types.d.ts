export interface IChangesValue {
  newTitle: string;
  doDelete: boolean;
}

export interface IChanges {
  [id: string]: IChangesValue;
}

export interface IRawNote {
  title: string;
  body: string;
  tags: string[];
}

export interface INote extends IRawNote {
  id: string;
}

export type NotesState = INote[];

export interface INoteWithTag {
  id: string;
  title: string;
  body: string;
  tags: ITag[];
}

export interface ITag {
  title: string;
  id: string;
}

export type TagsState = ITag[];
export interface RootState {
  notes: NotesState;
  tags: TagsState;
}
