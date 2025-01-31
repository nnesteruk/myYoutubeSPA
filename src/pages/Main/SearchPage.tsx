import React, { useEffect, useState } from 'react';
import { SearchMain } from '../../components/SearchPage/SearchMain';
import { ApiModal } from '../../components/Modal/ApiModal';

const SearchPage: React.FC = () => {
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

export default SearchPage;
