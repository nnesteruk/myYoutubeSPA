import { FavoriteRequests } from 'entities/favoriteRequest';
import { FC } from 'react';

export const FavoritePage: FC = () => {
  return (
    <main className="favorites">
      <h1>Избранное</h1>
      <FavoriteRequests />
    </main>
  );
};
