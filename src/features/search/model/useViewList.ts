import { useState } from 'react';

export const useViewList = () => {
  const [filterChoice, setFilterChoice] = useState('videos__list-content');
  const onClickList = (): void => {
    setFilterChoice(() => 'videos__list-content');
  };
  const onClickGrid = (): void => {
    setFilterChoice(() => 'videos__block-content');
  };
  return { filterChoice, onClickGrid, onClickList };
};
