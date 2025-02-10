export type LoginValues = {
  login: string;
  password: string;
};

export type QueryBase = {
  title: string;
  text?: string;
  maxCount?: number;
  sortBy?: string;
  id?: number;
};
export type ValueOnFinish = Pick<QueryBase, 'title' | 'text' | 'sortBy'>;

export type FavoriteModalProps = {
  open: boolean;
  text?: string;
  checkModal?: (status: boolean) => void;
  queryId?: number;
};

export type FavoriteProperty = {
  id: number;
  query: QueryBase;
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
  query: string;
  countResult?: number;
  sortBy?: string;
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

export type VideoYoutubeProperty = {
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

export type FavoriteRequestParams = QueryBase;

export type FavoriteUpdateResponse = {
  data: FavoriteRequestParams;
  id?: number;
};

export type FavoriteDeleteResponse = {
  data: {
    message: string;
    countDeleted: number;
  };
  id: number;
};

export type FavoriteSliceInitialState = {
  favorites: FavoriteProperty[];
  isLoading: boolean;
  error: string;
};

export type VideosSliceInitialState = {
  videos: VideoYoutubeProperty | null;
  isLoading: boolean;
  isSuccess: boolean;
  error: string;
};

export type ApiModalProperty = {
  open: boolean;
  setOpen: (open: boolean) => void;
};
