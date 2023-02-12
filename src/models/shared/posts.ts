export interface CreatePostModel {
  title: string;
  image?: File;
  tags: string[];
  space: number | [number] | [number, number] | [number, number, number];
  question: string;
}
