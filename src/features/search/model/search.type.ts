import { GetProps, Input } from 'antd';
import { VideoYoutubeProperty } from 'components/type';

export type SearchIsDoneProps = {
  searchText: string;
  videos: VideoYoutubeProperty | null;
};

export type SearchProps = GetProps<typeof Input.Search>;
export type SearchInputProps = {
  handleSearchSuccess: (state: boolean) => void; // Тип функции пропса
};
