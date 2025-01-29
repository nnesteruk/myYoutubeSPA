export type LoginValues = {
  login: string;
  password: string;
};

export type FavoriteModalProps = {
  open: boolean;
  text?: string;
  checkModal?: (status: boolean) => void;
  queryId?: number;
};

export type ValueOnFinish = {
  name: string;
  searchText: string;
  sort: string;
};

export type Query = {
  title: string;
  text: string;
  maxCount: number;
  sortBy: string;
  id: number;
};

export type FavoriteProperty = {
  id: number;
  query: Query;
};
export type FavoriteResponse = {
  id: number;
  queryId: number;
  createdAt: string;
  updatedAt: string;
  data: {
    title: string;
    maxCount: number;
    sortBy: string;
  };
};

export type VideoSearchParams = {
  searchText: string;
  count?: number;
  sort?: string;
};

type Snippet = {
  title: string;
  channelTitle: string;
  thumbnails: {
    default?: { url: string };
    medium?: { url: string };
    high?: { url: string };
  };
};
type Video = {
  id: string;
  snippet: Snippet;
  statistics: {
    viewCount: string;
  };
};

type VideoYoutubeProperty = {
  pageInfo: {
    totalResults: number;
  };
  items: Video[];
  queryId: number;
};

export type GetVideosResponse = VideoYoutubeProperty;

export type VideosSectionProps = {
  video?: Video[];
  choice: string;
};

export type FavoriteRequestParams = {
  id?: number;
  title: string;
  maxCount?: number;
  sortBy?: string;
};
