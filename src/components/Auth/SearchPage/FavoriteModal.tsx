import { Button, Form, InputNumber, Modal, Select, Slider } from 'antd';
import Input from 'antd/es/input/Input';
import { FC, useState } from 'react';

export const FavoriteModal: FC = ({ open, text }) => {
  const [inputValue, setInputValue] = useState(1);
  const onChange = (newValue) => {
    setInputValue(newValue);
  };
  const onFinish = (value) => {
    console.log(value);
  };
  const onCansel = () => {};
  return (
    <Modal open={open} footer={null} closeIcon={false} className="modal" width={400}>
      <h1>Сохранить запрос</h1>
      <Form onFinish={onFinish}>
        <div>
          <label>Запрос</label>
          <Form.Item>
            <Input placeholder="поиск" defaultValue={text} disabled />
          </Form.Item>
        </div>
        <div>
          <label>Название</label>
          <Form.Item required>
            <Input placeholder="Укажите название" />
          </Form.Item>
        </div>
        <div>
          <label>Сортировать по</label>
          <Form.Item>
            <Select
              options={[
                { value: 1, label: 'по дате' },
                { value: 2, label: 'по названию' },
              ]}
              placeholder="Без сортировки"
            />
          </Form.Item>
        </div>
        <div>
          <label>Максимальное количество</label>
          <Form.Item>
            <Slider
              min={1}
              max={50}
              value={typeof inputValue === 'number' ? inputValue : 0}
              onChange={onChange}
            />
            <InputNumber min={1} max={50} value={inputValue} onChange={onChange} />
          </Form.Item>
        </div>
        <div>
          <Button onClick={onCansel}>Не сохранять</Button>
          <Button type="primary" htmlType="submit">
            Сохранить
          </Button>
        </div>
      </Form>
    </Modal>
  );
};
