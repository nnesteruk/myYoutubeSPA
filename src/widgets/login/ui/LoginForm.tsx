import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';
import { useForm, Controller } from 'react-hook-form';
import axios from 'axios';
import { NavLink, useNavigate } from 'react-router';
import { FC } from 'react';
import { LoginValues } from '../../../components/type';
import './login.scss';
import { apiUrl } from 'shared/config';
export const LoginForm: FC = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<LoginValues>();
  const navigate = useNavigate();
  const onFinish = async (values: LoginValues) => {
    try {
      const response = await axios.post(`${apiUrl}/api/login/`, values);
      localStorage.setItem('token', response.data?.accessToken);
      navigate('/searchPage');
    } catch (err: any) {
      alert(err.response.data.message);
      console.log(err);
    }
  };

  return (
    <Form
      name="login"
      className="login__form"
      initialValues={{ remember: true }}
      onFinish={handleSubmit(onFinish)}
    >
      <Form.Item
        validateStatus={errors.login ? 'error' : ''}
        help={
          errors.login && (
            <span className="login__form-error">
              {String(errors.login?.message)}
            </span>
          )
        }
      >
        <Controller
          name="login"
          control={control}
          rules={{
            required: { value: true, message: 'Введите имя пользователя' },
          }}
          render={({ field }) => (
            <Input
              {...field}
              className="login__input"
              prefix={<UserOutlined />}
              placeholder="Логин"
            />
          )}
        />
      </Form.Item>
      <Form.Item
        validateStatus={errors.password ? 'error' : ''}
        help={
          errors.password && (
            <span className="login__form-error">{errors.password.message}</span>
          )
        }
      >
        <Controller
          name="password"
          control={control}
          rules={{
            required: { value: true, message: 'Введите пароль' },
            pattern: {
              value: /^(?=.*[A-Z]).{8,}$/,
              message: 'Некорректный пароль',
            },
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
      <Form.Item className="login__buttons">
        <Button className="login__button" type="primary" htmlType="submit">
          Войти
        </Button>
        <NavLink to="/registration" className="login__link">
          Зарегистрироваться
        </NavLink>
      </Form.Item>
    </Form>
  );
};

export default LoginForm;
