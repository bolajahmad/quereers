export interface ISpace {
  id: number;
  description: string;
  title: string;
  tags: string[];
  owner: string;
  created: number;
  blockCreated: number;
  contentCID?: string;
  isEdited?: boolean;
  isHidden?: boolean;
  image?: string;
}
