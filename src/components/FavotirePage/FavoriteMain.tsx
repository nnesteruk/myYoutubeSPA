import { useNavigate } from 'react-router';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { deleteFavorite } from '../../redux/slices/favoritesSlice';
import { FavoriteModal } from '../Modal/FavoriteModal';
import { openModal } from '../../redux/slices/modalSlice';
import { ChangeFavorite, VideoSearchParams } from '../type';
import { FC } from 'react';

export const FavoriteMain: FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { favorite } = useAppSelector((state) => state.favorite);
  const { isModalOpen } = useAppSelector((state) => state.modal);
  const handleClickItem = ({ searchText, sort, count }: VideoSearchParams) => {
    localStorage.setItem('favoriteRequest', JSON.stringify({ searchText, sort, count }));
    // navigate('/searchPage');
  };
  const handleChangeClick = (item: ChangeFavorite): void => {
    localStorage.setItem('changeFavorite', JSON.stringify(item));
    dispatch(openModal());
  };
  return (
    <>
      <div className="favorites__container">
        {favorite.map((item) => (
          <div className="favorites__item" key={item.id}>
            <li onClick={() => handleClickItem(item)}>{item.name}</li>
            <div className="favorites__buttons">
              <button
                className="favorites__buttons--change"
                onClick={() => handleChangeClick(item)}>
                Изменить
              </button>
              <button
                className="favorites__buttons--delete"
                onClick={() => dispatch(deleteFavorite(item.id))}>
                Удалить
              </button>
            </div>
          </div>
        ))}
      </div>
      <FavoriteModal open={isModalOpen} />
    </>
  );
};
