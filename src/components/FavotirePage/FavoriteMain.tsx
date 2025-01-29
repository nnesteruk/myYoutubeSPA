import { useNavigate } from 'react-router';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { FavoriteModal } from '../Modal/FavoriteModal';
import { openModal } from '../../redux/slices/modalSlice';
import { FavoriteProperty, FavoriteRequestParams } from '../type';
import { FC } from 'react';
import {
  useDeleteFavoriteRequestMutation,
  useGetFavoritesQuery,
} from '../../redux/services/fetchYoutubeApi';

export const FavoriteMain: FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { data = [], isLoading } = useGetFavoritesQuery(undefined);
  const [deleteFavorite, {}] = useDeleteFavoriteRequestMutation();
  const { isModalOpen } = useAppSelector((state) => state.modal);
  const handleClickItem = ({ title, maxCount, sortBy }: FavoriteRequestParams) => {
    localStorage.setItem('favoriteRequest', JSON.stringify({ title, sortBy, maxCount }));
    navigate('/searchPage');
  };
  const handleChangeClick = (item: FavoriteProperty): void => {
    localStorage.setItem('changeFavorite', JSON.stringify(item));
    dispatch(openModal());
  };
  return (
    <>
      <div className="favorites__container">
        {isLoading ? (
          <h1 style={{ textAlign: 'center' }}>Сохраненные запросы загружаются...</h1>
        ) : (
          data.map((item) => (
            <div className="favorites__item" key={item.id}>
              <li onClick={() => handleClickItem(item.query)}>{item.query.title}</li>
              <div className="favorites__buttons">
                <button
                  className="favorites__buttons--change"
                  onClick={() => handleChangeClick(item)}>
                  Изменить
                </button>
                <button
                  className="favorites__buttons--delete"
                  onClick={() => deleteFavorite(item.id)}>
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
