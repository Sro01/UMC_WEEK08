import { CommonResponse, CursorBasedResponse } from "./common";

export type Tag = {
  id: number;
  name: string;
};

export type Likes = {
  id: number;
  userId: number;
  lpid: number;
};

export type LpDetail = {
  id: number;
  title: string;
  content: string;
  thumbnail: string;
  published: boolean;
  authorId: number;
  createdAt: string;
  updatedAt: string;
  tags: Tag[];
  likes: Likes[];
  author: Author;
};

export type ResponseLpListDto = CursorBasedResponse<LpDetail[]>;

export type RequestLpDetailDto = {
  lpId: number;
};

export type ResponseLpDetailDto = CommonResponse<LpDetail>;

export type Author = {
  id: number;
  name: string;
  email: string;
  bio: string | null;
  avatar: string | null;
  createdAt: string;
  updatedAt: string;
};

export type ResponseLikeLpDto = CommonResponse<{
  ld: number;
  userId: number;
  lpId: number;
}>;

export type NewLpDetail = {
  title: string;
  content: string;
  thumbnail: string;
  tags: string[];
  published: boolean;
};

