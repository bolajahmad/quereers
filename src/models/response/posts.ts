export interface PostModel {
  id: number;
  spaceId: string;
  owner: string;
  contentCID: string;
  upvotes: number;
  downvotes: number;
  createdAt: number;
  blockCreated: number;
  title: string;
  description: string;
  image?: string;
  tags?: string[];
}
