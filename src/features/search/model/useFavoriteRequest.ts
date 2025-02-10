import { FavoriteRequestParams } from 'components/type';
import { fetchGetVideos } from 'entities/videos/api';
import { SetStateAction, useEffect, useState } from 'react';
import { useAppDispatch } from 'shared/config';

export const useFavoriteRequest = () => {
  const favoriteRequest: FavoriteRequestParams | null = JSON.parse(
    localStorage.getItem('favoriteRequest') || 'null',
  );
  const [searchText, setSearchText] = useState(favoriteRequest?.text ?? '');
  const dispatch = useAppDispatch();

  const handleOnChange = (e: {
    target: { value: SetStateAction<string> };
  }): void => {
    setSearchText(e.target.value);
  };

  useEffect(() => {
    if (searchText) {
      dispatch(
        fetchGetVideos({
          query: searchText,
          countResult: favoriteRequest?.maxCount,
          sortBy: favoriteRequest?.sortBy,
        }),
      );
    }
    localStorage.removeItem('favoriteRequest');
  }, []); // для сохраненного запроса
  return { favoriteRequest, searchText, handleOnChange };
};
