export type LoginValues = {
  email: string;
  password: string;
};

export type FavoriteModalProps = {
  open: boolean;
  text?: string;
  checkModal?: (status: boolean) => void;
};

export type ValueOnFinish = {
  name: string;
  searchText: string;
  sort: string;
};

export type ChangeFavorite = {
  id: number;
  searchText: string;
  sort?: string;
  name: string;
  count: number;
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
  etag: string;
  id: { videoId: string };
  snippet: Snippet;
};

type VideoYoutubeProperty = {
  etag: string;
  pageInfo: {
    totalResults: number;
  };
  items: Video[];
};

export type GetVideosResponse = VideoYoutubeProperty;

export type VideosSectionProps = {
  video?: Video[];
  choice: string;
};
