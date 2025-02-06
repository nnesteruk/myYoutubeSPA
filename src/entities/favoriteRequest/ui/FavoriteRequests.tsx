import { useNavigate } from 'react-router';
import { FavoriteModal } from 'widgets/favorite_modal/ui/FavoriteModal';
import { openModal } from 'redux/slices/modalSlice';
import { FavoriteProperty, FavoriteRequestParams } from 'components/type';
import { FC, useEffect } from 'react';
import {
  fetchDeleteFavorite,
  fetchGetFavorites,
} from 'redux/actions/favoriteThunkActions';
import { useAppDispatch, useAppSelector } from 'shared/store';
import './favoriteRequests.scss';

export const FavoriteRequests: FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { favorites, isLoading } = useAppSelector((state) => state.favorite);
  const { isModalOpen } = useAppSelector((state) => state.modal);
  const handleClickItem = ({
    title,
    maxCount,
    sortBy,
  }: FavoriteRequestParams) => {
    localStorage.setItem(
      'favoriteRequest',
      JSON.stringify({ title, sortBy, maxCount }),
    );
    navigate('/searchPage');
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
                {item?.query.text}
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
