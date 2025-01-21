import { useNavigate } from 'react-router';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { deleteFavorite } from '../../redux/slices/favoritesSlice';
import { FavoriteModal } from '../FavoriteModal';
import { FavoriteRequest } from '../SearchPage/SearchInput';
import { openModal } from '../../redux/slices/modalSlice';

export const FavoriteMain = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { favorite } = useAppSelector((state) => state.favorite);
  const { isModalOpen } = useAppSelector((state) => state.modal);
  const handleClickItem = ({ searchText, order, count }: FavoriteRequest) => {
    localStorage.setItem('favoriteRequest', JSON.stringify({ searchText, order, count }));
    navigate('/searchPage');
  };
  const handleChangeClick = (item) => {
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
