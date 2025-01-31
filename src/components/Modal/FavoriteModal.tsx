import { Form, InputNumber, Modal, Select, Slider, Input } from 'antd';
import { FC, useEffect, useState } from 'react';
import { useAppDispatch } from '../../hooks/hooks';
import { closeModal } from '../../redux/slices/modalSlice';
import { ModalButtons } from '../Modal/ModalButtons';
import { FavoriteModalProps, FavoriteProperty, ValueOnFinish } from '../type';
import { fetchAddFavorite, fetchUpdateFavorite } from '../../redux/actions/favoriteThunkActions';

export const FavoriteModal: FC<FavoriteModalProps> = ({ open, text, checkModal, queryId }) => {
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();
  const changeFav: FavoriteProperty | null = JSON.parse(
    localStorage.getItem('changeFavorite') ?? 'null',
  );
  const [inputValue, setInputValue] = useState(1);
  const onChange = (newValue: number | null): void => {
    if (newValue !== null) {
      setInputValue(newValue);
    }
  };

  const onFinish = (value: ValueOnFinish): void => {
    if (changeFav?.id) {
      dispatch(
        fetchUpdateFavorite({
          text: value.name,
          title: value.searchText,
          sortBy: value.sort,
          maxCount: inputValue,
          id: changeFav?.id,
        }),
      );
      dispatch(closeModal());
    } else {
      dispatch(
        fetchAddFavorite({
          text: value.name,
          title: value.searchText,
          sortBy: value.sort,
          maxCount: inputValue,
          id: queryId,
        }),
      );
      dispatch(closeModal());
      checkModal && checkModal(true);
    }
  };

  useEffect(() => {
    if (open) {
      form.setFieldValue('searchText', text || changeFav?.query.title);
      form.setFieldValue('name', changeFav?.query.text);
      form.setFieldValue('sort', changeFav?.query.sortBy);
      setInputValue(changeFav?.query.maxCount || 0);
    } else {
      form.resetFields();
      setInputValue(1);
    }
  }, [text, open, form]);

  return (
    <Modal open={open} footer={null} closeIcon={false} className="modal" width={360}>
      <h3>{changeFav?.id ? 'Изменить запрос' : 'Сохранить запрос'}</h3>
      <Form form={form} onFinish={onFinish} className="modal__form">
        <div>
          <label>Запрос</label>
          <Form.Item name="searchText" initialValue={text}>
            <Input placeholder="поиск" disabled={changeFav?.id ? false : true} />
          </Form.Item>
        </div>
        <div>
          <label className="modal__name-required">Название</label>
          <Form.Item
            name="name"
            rules={[{ required: true, message: 'Пожалуйста, введите название' }]}>
            <Input placeholder="Укажите название" />
          </Form.Item>
        </div>
        <div>
          <label>Сортировать по</label>
          <Form.Item name="sort">
            <Select
              options={[
                { value: 'date', label: 'дате' },
                { value: 'title', label: 'названию' },
                { value: 'relevance', label: 'релевантности' },
                { value: 'videoCount', label: 'количеству видео' },
                { value: 'rating', label: 'рейтингу' },
              ]}
              placeholder="Без сортировки"
            />
          </Form.Item>
        </div>
        <div>
          <label>Максимальное количество</label>
          <Form.Item>
            <div className="modal__slider-block">
              <Slider
                min={1}
                max={50}
                value={inputValue}
                onChange={onChange}
                className="modal__slider"
              />
              <InputNumber
                min={1}
                max={50}
                value={inputValue}
                onChange={onChange}
                className="modal__input-number"
              />
            </div>
          </Form.Item>
        </div>
        <ModalButtons />
      </Form>
    </Modal>
  );
};
