import { Form, InputNumber, Modal, Select, Slider, Input } from 'antd';
import { FC, useEffect, useState } from 'react';
import { useAppDispatch } from '../../hooks/hooks';
import { closeModal } from '../../redux/slices/modalSlice';
import { addFavorite, changeFavorite } from '../../redux/slices/favoritesSlice';
import { ModalButtons } from '../Modal/ModalButtons';
import { ChangeFavorite, FavoriteModalProps, ValueOnFinish } from '../type';

export const FavoriteModal: FC<FavoriteModalProps> = ({ open, text, checkModal }) => {
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();
  const changeFav: ChangeFavorite | null = JSON.parse(
    localStorage.getItem('changeFavorite') ?? 'null',
  );
  console.log(changeFav?.count);
  const [inputValue, setInputValue] = useState(1);
  const [isSync, setIsSync] = useState(true); //состояние на изменение slider и input number при редактировании

  const onChange = (newValue: number | null): void => {
    if (newValue !== null) {
      setInputValue(newValue);
      setIsSync(false);
    }
  };

  const onFinish = (value: ValueOnFinish): void => {
    if (changeFav?.id) {
      dispatch(changeFavorite({ ...value, count: inputValue, id: changeFav?.id }));
      dispatch(closeModal());
    } else {
      dispatch(addFavorite({ ...value, count: inputValue, id: Date.now() }));
      dispatch(closeModal());
      checkModal && checkModal(true);
    }
  };

  useEffect(() => {
    if (open) {
      form.setFieldValue('searchText', text || changeFav?.searchText);
      form.setFieldValue('name', changeFav?.name);
      form.setFieldValue('sort', changeFav?.sort);
      setInputValue(changeFav?.count);
    } else {
      form.resetFields();
      setInputValue(1);
    }
  }, [text, open, form]);

  // useEffect(() => {
  //   if (changeFav?.count !== undefined) {
  //   }
  // }, [changeFav]);

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
