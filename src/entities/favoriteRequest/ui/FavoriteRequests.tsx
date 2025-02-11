import { useNavigate } from 'react-router';
import { FavoriteModal } from 'widgets/favorite_modal/ui/FavoriteModal';
import { openModal } from 'shared/model/modalSlice';
import { FavoriteProperty, FavoriteRequestParams } from 'shared/types';
import { FC, useEffect } from 'react';
import {
  fetchDeleteFavorite,
  fetchGetFavorites,
} from 'entities/favoriteRequest/api/favoriteActions';
import './favoriteRequests.scss';
import { useAppDispatch, useAppSelector } from 'shared/config';
import { SEARCH_PAGE } from 'shared/routes';

export const FavoriteRequests: FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { favorites, isLoading } = useAppSelector((state) => state.favorite);
  const { isModalOpen } = useAppSelector((state) => state.modal);
  const handleClickItem = ({
    text,
    maxCount,
    sortBy,
  }: FavoriteRequestParams) => {
    localStorage.setItem(
      'favoriteRequest',
      JSON.stringify({ text, sortBy, maxCount }),
    );
    navigate(SEARCH_PAGE);
  };
  const handleChangeClick = (item: FavoriteProperty): void => {
    localStorage.setItem('changeFavorite', JSON.stringify(item));
    dispatch(openModal());
  };
  useEffect(() => {
    dispatch(fetchGetFavorites());
  }, []);
  return (
    <>
      <div className="favorites__container">
        {favorites.length === 0 && isLoading === false && (
          <>
            <h2>Добавьте свой первый запрос</h2>
          </>
        )}
        {isLoading ? (
          <h1>Сохраненные запросы загружаются...</h1>
        ) : (
          favorites.map((item) => (
            <div className="favorites__item" key={item?.id}>
              <li onClick={() => handleClickItem(item?.query)}>
                {item?.query.title}
              </li>
              <div className="favorites__buttons">
                <button
                  className="favorites__buttons--change"
                  onClick={() => handleChangeClick(item)}
                >
                  Изменить
                </button>
                <button
                  className="favorites__buttons--delete"
                  onClick={() => dispatch(fetchDeleteFavorite(item.id))}
                >
                  Удалить
                </button>
              </div>
            </div>
          ))
        )}
      </div>
      <FavoriteModal open={isModalOpen} />
    </>
  );
};
