import React from 'react';
import { SearchInput } from '../../components/Auth/SearchPage/SearchInput';

const SearchPage: React.FC = () => {
  return (
    <main className="main">
      <h1>Поиск видео</h1>
      <SearchInput />
    </main>
  );
};

export default SearchPage;
