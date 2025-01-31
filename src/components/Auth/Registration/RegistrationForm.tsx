import { Form, Input } from 'antd';
import axios from 'axios';
import { FC } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { RegistrationButtons } from './RegistrationButtons';
import { apiUrl } from '../../../redux/actions/favoriteThunkActions';

type FormValues = {
  password: string;
  email: string;
  login: string;
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

  const onSubmit = async (value: FormValues) => {
    try {
      await axios.post(`${apiUrl}/api/register/`, value);
      alert('Регистрация прошла успешно');
      navigate('/');
    } catch (err: any) {
      alert(err.response.data.message);
      console.log(err);
    }
  };
  return (
    <Form {...formItemLayout} className="form" onFinish={handleSubmit(onSubmit)}>
      <Form.Item
        label="Имя пользователя:"
        className="form__input"
        validateStatus={errors.login ? 'error' : ''}
        help={errors.login?.message}>
        <Controller
          name="login"
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
      <RegistrationButtons />
    </Form>
  );
};
