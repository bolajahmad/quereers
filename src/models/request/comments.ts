export interface CreateCommentRequest {
  rootPostID: number;
  comment: string;
  parentPostID: number | null;
  image?: File;
}

export interface ViewCommentModel {
  id: string;
  owner: string;
  spaceId: string;
  upvotesCount: number;
  downvotesCount: number;
  createdAt: number;
  contentId: string;
  comment: string;
  isSharedPost?: boolean;
  rootPostId: string;
  blockCreated: number;
}
