import React, { useState } from 'react';
import { SearchInput } from '../../components/SearchPage/SearchInput';

const SearchPage: React.FC = () => {
  const [searchResult, setSearchResult] = useState(false);
  const handleSearchSuccess = (isSuccess: boolean) => {
    setSearchResult(() => isSuccess);
  };

  return (
    <div className={!searchResult ? 'main' : 'main-search'}>
      <h1>Поиск видео</h1>
      <SearchInput handleSearchSuccess={handleSearchSuccess} />
    </div>
  );
};

export default SearchPage;
