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
  sort: string | null;
  name: string;
  count: number;
};

export type VideoParams = {
  searchText: string;
  count?: number;
  order?: string;
};
