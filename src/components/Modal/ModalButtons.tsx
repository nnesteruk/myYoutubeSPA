import { Button } from 'antd';
import { useAppDispatch } from '../../hooks/hooks';
import { closeModal } from '../../redux/slices/modalSlice';
import { FC } from 'react';
import { FavoriteProperty } from '../type';

export const ModalButtons: FC = () => {
  const changeFav: FavoriteProperty | null = JSON.parse(
    localStorage.getItem('changeFavorite') ?? 'null',
  );
  const dispatch = useAppDispatch();
  const onCancel = (): void => {
    dispatch(closeModal());
    changeFav && localStorage.removeItem('changeFavorite');
  };
  return (
    <div className="modal__buttons">
      <Button onClick={onCancel}>{changeFav?.id ? 'Не изменять' : 'Не сохранять'}</Button>
      <Button type="primary" htmlType="submit">
        {changeFav?.id ? 'Изменить' : 'Сохранить'}
      </Button>
    </div>
  );
};
