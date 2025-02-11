import { Form, InputNumber, Modal, Select, Slider, Input } from 'antd';
import { FC, useEffect, useState } from 'react';
import { closeModal } from 'shared/model/modalSlice';
import { ModalButtons } from './ModalButtons';
import {
  FavoriteModalProps,
  FavoriteProperty,
  ValueOnFinish,
} from 'shared/types';
import {
  fetchAddFavorite,
  fetchUpdateFavorite,
} from 'entities/favoriteRequest/api/favoriteActions';
import './favoriteModal.scss';
import { useAppDispatch } from 'shared/config';

export const FavoriteModal: FC<FavoriteModalProps> = ({
  open,
  text,
  checkModal,
  queryId,
}) => {
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
          text: value.text,
          title: value.title,
          sortBy: value.sortBy,
          maxCount: inputValue,
          id: changeFav?.id,
        }),
      );
      dispatch(closeModal());
    } else {
      dispatch(
        fetchAddFavorite({
          text: value.text,
          title: value.title,
          sortBy: value.sortBy,
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
      form.setFieldValue('title', changeFav?.query.title);
      form.setFieldValue('text', text || changeFav?.query.text);
      form.setFieldValue('sortBy', changeFav?.query.sortBy);
      setInputValue(changeFav?.query.maxCount || 0);
    } else {
      form.resetFields();
      setInputValue(1);
    }
  }, [text, open, form]);

  return (
    <Modal
      open={open}
      footer={null}
      closeIcon={false}
      className="modal"
      width={360}
    >
      <h3>{changeFav?.id ? 'Изменить запрос' : 'Сохранить запрос'}</h3>
      <Form form={form} onFinish={onFinish} className="modal__form">
        <div>
          <label>Запрос</label>
          <Form.Item name="text" initialValue={text}>
            <Input
              placeholder="поиск"
              disabled={changeFav?.id ? false : true}
            />
          </Form.Item>
        </div>
        <div>
          <label className="modal__name-required">Название</label>
          <Form.Item
            name="title"
            rules={[
              { required: true, message: 'Пожалуйста, введите название' },
            ]}
          >
            <Input placeholder="Укажите название" />
          </Form.Item>
        </div>
        <div>
          <label>Сортировать по</label>
          <Form.Item name="sortBy">
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
