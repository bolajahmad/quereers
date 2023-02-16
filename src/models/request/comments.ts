export interface CreateCommentRequest {
  rootPostID: number;
  comment: string;
  parentPostID: number | null;
  image?: File;
}
