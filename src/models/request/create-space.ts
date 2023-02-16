export interface CreateSpaceRequest {
  name: string;
  description: string;
  image?: File | string;
  tags?: string[];
}
