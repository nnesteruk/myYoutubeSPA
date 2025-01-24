import React, { useState } from 'react';
import { SearchMain } from '../../components/SearchPage/SearchMain';

const SearchPage: React.FC = () => {
  const [searchResult, setSearchResult] = useState(false);
  const handleSearchSuccess = (isSuccess: boolean): void => {
    setSearchResult(() => isSuccess);
  };

  return (
    <div className={!searchResult ? 'main' : 'main-search'}>
      <h1>Поиск видео</h1>
      <SearchMain handleSearchSuccess={handleSearchSuccess} />
    </div>
  );
};

export default SearchPage;
