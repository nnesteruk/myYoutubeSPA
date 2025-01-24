import { FC } from 'react';
import { FavoriteMain } from '../../components/FavotirePage/FavoriteMain';

export const FavoritePage: FC = () => {
  return (
    <main className="favorites">
      <h1>Избранное</h1>
      <FavoriteMain />
    </main>
  );
};
