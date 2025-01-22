import { Button } from 'antd';
import { useAppDispatch } from '../../hooks/hooks';
import { closeModal } from '../../redux/slices/modalSlice';

export const ModalButtons = () => {
  const changeFav = JSON.parse(localStorage.getItem('changeFavorite') ?? '{}');
  const dispatch = useAppDispatch();
  const onCancel = () => {
    dispatch(closeModal());
    changeFav && localStorage.removeItem('changeFavorite');
  };
  return (
    <div className="modal__buttons">
      {changeFav?.id ? (
        <>
          <Button onClick={onCancel}>Не изменять</Button>
          <Button type="primary" htmlType="submit">
            Изменить
          </Button>
        </>
      ) : (
        <>
          <Button onClick={onCancel}>Не сохранять</Button>
          <Button type="primary" htmlType="submit">
            Сохранить
          </Button>
        </>
      )}
    </div>
  );
};
