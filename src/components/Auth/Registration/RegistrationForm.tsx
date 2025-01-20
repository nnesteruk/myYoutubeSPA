import { Form, Input, Radio, InputNumber } from 'antd';
import axios from 'axios';
import { FC } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { RegistrationButtons } from './RegistrationButtons';

type FormValues = {
  password: string;
  age: number;
  email: string;
  gender: string;
  username: string;
};

const formItemLayout = {
  labelCol: { span: 10 }, // Ширина области метки (label)
  wrapperCol: { span: 24 }, // Ширина области инпута (input)
};

export const RegistrationForm: FC = () => {
  const navigate = useNavigate();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormValues>();

  const apiUrl = import.meta.env.VITE_API_URL;
  const onSubmit = async (value: FormValues) => {
    try {
      await axios.post(`${apiUrl}/api/users/register`, value);
      alert('Регистрация прошла успешно');
      navigate('/');
    } catch (err: any) {
      alert(err.response.data.message);
    }
  };
  return (
    <Form {...formItemLayout} className="form" onFinish={handleSubmit(onSubmit)}>
      <Form.Item
        label="Имя пользователя:"
        className="form__input"
        validateStatus={errors.username ? 'error' : ''}
        help={errors.username?.message}>
        <Controller
          name="username"
          control={control}
          rules={{ required: { value: true, message: 'Введите имя пользователя' } }}
          render={({ field }) => (
            <Input className="form__input-inner" {...field} placeholder="nikiN" />
          )}
        />
      </Form.Item>
      <Form.Item
        label="Email:"
        className="form__input"
        validateStatus={errors.email ? 'error' : ''}
        help={errors.email?.message}>
        <Controller
          name="email"
          control={control}
          rules={{
            required: { value: true, message: 'Введите email' },
            pattern: {
              value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/,
              message: 'Введите корректный email',
            },
          }}
          render={({ field }) => <Input {...field} placeholder="nikita@yandex.ru" />}
        />
      </Form.Item>
      <Form.Item
        label="Пароль"
        className="form__input"
        tooltip="Минимум 8 символов и 1 заглавную букву,1 прописную, 1 символ, 1 цифру"
        help={errors.password?.message}
        validateStatus={errors.password ? 'error' : ''}>
        <Controller
          name="password"
          control={control}
          rules={{
            required: { value: true, message: 'Введите пароль' },
            pattern: { value: /^(?=.*[A-Z]).{8,}$/, message: 'Пароль не соответствует подсказке' },
          }}
          render={({ field }) => <Input {...field} placeholder="Q123445566" />}
        />
      </Form.Item>
      <Form.Item
        label="Пол:"
        className="form__input"
        validateStatus={errors.gender ? 'error' : ''}
        help={errors.gender?.message}>
        <Controller
          name="gender"
          control={control}
          rules={{ required: { value: true, message: 'Выберите пол' } }}
          render={({ field }) => (
            <Radio.Group {...field} className="form__radio">
              <Radio value="male">Мужской</Radio>
              <Radio value="female">Женский</Radio>
            </Radio.Group>
          )}
        />
      </Form.Item>
      <Form.Item
        label="Возраст"
        className="form__input"
        validateStatus={errors.age ? 'error' : ''}
        help={errors.age?.message}>
        <Controller
          name="age"
          control={control}
          rules={{
            required: { value: true, message: 'Введите возраст' },
            pattern: { value: /^[0-9]+$/, message: 'Возраст должен быть числом' },
            min: { value: 14, message: 'Возраст должен быть не менее 14 лет' },
            max: { value: 100, message: 'Возраст должен быть не более 100 лет' },
          }}
          render={({ field }) => <InputNumber min={1} max={100} {...field} placeholder="18" />}
        />
      </Form.Item>
      <RegistrationButtons />
    </Form>
  );
};
