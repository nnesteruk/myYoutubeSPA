import { Button, Form, InputNumber, Modal, Select, Slider, Input } from 'antd';
import { FC, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import { closeModal } from '../redux/slices/modalSlice';
import { addFavorite } from '../redux/slices/favoritesSlice';

type FavoriteModalProps = {
  open: boolean;
  text?: string;
  checkModal?: (status: boolean) => void;
};
type ValueOnFinish = {
  name: string;
  searchText: string;
  sort: string;
};
export const FavoriteModal: FC<FavoriteModalProps> = ({ open, text, checkModal }) => {
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();
  const changeFav = JSON.parse(localStorage.getItem('changeFavorite') ?? '');
  const [inputValue, setInputValue] = useState(1);
  const { favorite } = useAppSelector((state) => state.favorite);

  const onChange = (newValue: number | null) => {
    newValue && setInputValue(newValue);
  };
  const onFinish = (value: ValueOnFinish): void => {
    console.log(value);
    console.log({ ...value, count: inputValue });
    dispatch(addFavorite({ ...value, count: inputValue, id: Date.now() }));
    console.log(favorite);
    dispatch(closeModal());
    checkModal && checkModal(true);
  };
  const onCancel = () => {
    dispatch(closeModal());
  };

  useEffect(() => {
    if (open) {
      form.setFieldValue('searchText', text || changeFav?.searchText);
      form.setFieldValue('name', changeFav?.name || '');
      form.setFieldValue('sort', changeFav?.sort || '');
      form.setFieldValue('sort', changeFav?.sort || '');
    } else {
      form.resetFields();
      setInputValue(1);
    }
  }, [text, open, form]);
  useEffect(() => {
    if (changeFav?.count !== undefined) {
      setInputValue(changeFav.count);
    }
  }, [changeFav]);

  return (
    <Modal open={open} footer={null} closeIcon={false} className="modal" width={360}>
      <h3>{changeFav ? 'Изменить запрос' : 'Сохранить запрос'}</h3>
      <Form form={form} onFinish={onFinish} className="modal__form">
        <div>
          <label>Запрос</label>
          <Form.Item name="searchText" initialValue={text}>
            <Input placeholder="поиск" disabled={changeFav ? false : true} />
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
        <div className="modal__buttons">
          <Button onClick={onCancel}>Не сохранять</Button>
          <Button type="primary" htmlType="submit">
            Сохранить
          </Button>
        </div>
      </Form>
    </Modal>
  );
};
