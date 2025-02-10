import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';
import { useForm, Controller } from 'react-hook-form';
import { NavLink, useNavigate } from 'react-router';
import { FC } from 'react';
import { LoginValues } from 'shared/types';
import './login.scss';
import { yupResolver } from '@hookform/resolvers/yup';
import { loginSchema } from '../model';
import { instance } from 'shared/api';
export const LoginForm: FC = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<LoginValues>({ resolver: yupResolver(loginSchema) });
  const navigate = useNavigate();
  const onFinish = async (values: LoginValues) => {
    try {
      const response = await instance.post(`/api/login/`, values);
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
      <div>
        <Controller
          name="login"
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              className={
                errors.login?.message
                  ? 'login__input login__input_error'
                  : 'login__input'
              }
              prefix={<UserOutlined />}
              placeholder="Логин"
            />
          )}
        />
        <p className="login__errors">{errors.login?.message}</p>
      </div>
      <div>
        <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <Input.Password
              className={
                errors.password?.message
                  ? 'login__input login__input_error'
                  : 'login__input'
              }
              {...field}
              prefix={<LockOutlined />}
              placeholder="Пароль"
            />
          )}
        />
        <p className="login__errors"> {errors.password?.message}</p>
      </div>
      <div className="login__buttons">
        <Button className="login__button" type="primary" htmlType="submit">
          Войти
        </Button>
        <NavLink to="/registration" className="login__link">
          Зарегистрироваться
        </NavLink>
      </div>
    </Form>
  );
};
