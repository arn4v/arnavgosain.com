import { tagColors } from "./constants";

export type PostData = {
  title: string;
  seoTitle: string;
  isPublished: boolean;
};

export type UnpackArray<T> = T extends Array<U> ? U : T;

export interface Project {
  id: string;
  name: string;
  description: React.ReactNode;
  duration: string;
  tags: Array<keyof typeof tagColors & string>;
  links: Array<{
    title: string;
    url: string;
  }>;
}
