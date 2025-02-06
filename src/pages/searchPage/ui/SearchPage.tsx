import React, { useEffect, useState } from 'react';
import { ApiModal } from 'widgets/api_modal/ui/ApiModal';
import { SearchMain } from 'widgets/searchMain';
import './searchPage.scss';

export const SearchPage: React.FC = () => {
  const [searchResult, setSearchResult] = useState(false);
  const [open, setOpen] = useState(false);
  const handleSearchSuccess = (isSuccess: boolean): void => {
    setSearchResult(() => isSuccess);
  };
  useEffect(() => {
    if (!localStorage.getItem('GoogleToken')) {
      setOpen(true);
    }
  }, []);
  return (
    <div className={!searchResult ? 'main' : 'main-search'}>
      <h1>Поиск видео</h1>
      <SearchMain handleSearchSuccess={handleSearchSuccess} />
      <ApiModal open={open} setOpen={setOpen} />
    </div>
  );
};
