import { tagColors } from "./constants";

export type PostData = {
  title: string;
  seoTitle: string;
  isPublished: boolean;
};

export type UnpackArray<T> = T extends Array<infer U> ? U : T;

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

export type SeoProps = {
  title?: string;
  description?: string;
  url?: string;
  image?: string;
  publishedAt?: string;
};
