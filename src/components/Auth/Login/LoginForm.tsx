import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Form, Input } from 'antd';
import { useForm, Controller } from 'react-hook-form';
import { LoginButtons } from './LoginButtons';
import axios from 'axios';
import { useNavigate } from 'react-router';
import { FC } from 'react';
import { LoginValues } from '../../type';

export const apiUrl = import.meta.env.VITE_API_URL;

const LoginForm: FC = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<LoginValues>();
  const navigate = useNavigate();
  const onFinish = async (values: LoginValues) => {
    try {
      const response = await axios.post(`${apiUrl}/api/auth/login`, values);
      localStorage.setItem('token', response.data?.token);
      navigate('/searchPage');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Form
      name="login"
      className="login__form"
      initialValues={{ remember: true }}
      onFinish={handleSubmit(onFinish)}>
      <Form.Item
        validateStatus={errors.email ? 'error' : ''}
        help={
          errors.email && (
            <span style={{ display: 'block', textAlign: 'center', color: 'red' }}>
              {String(errors.email?.message)}
            </span>
          )
        }>
        <Controller
          name="email"
          control={control}
          rules={{
            required: { value: true, message: 'Введите email' },
            pattern: {
              value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/,
              message: 'Введите корректный email.',
            },
          }}
          render={({ field }) => (
            <Input
              {...field}
              className="login__input"
              prefix={<UserOutlined />}
              placeholder="Email"
            />
          )}
        />
      </Form.Item>
      <Form.Item
        validateStatus={errors.password ? 'error' : ''}
        help={
          errors.password && (
            <span style={{ display: 'block', textAlign: 'center', color: 'red' }}>
              {String(errors.password?.message)}
            </span>
          )
        }>
        <Controller
          name="password"
          control={control}
          rules={{
            required: { value: true, message: 'Введите пароль' },
            pattern: /^(?=.*[A-Z]).{8,}$/,
          }}
          render={({ field }) => (
            <Input.Password
              className="login__input"
              {...field}
              prefix={<LockOutlined />}
              placeholder="Пароль"
            />
          )}
        />
      </Form.Item>
      <LoginButtons />
    </Form>
  );
};

export default LoginForm;
