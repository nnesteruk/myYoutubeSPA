import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Form, Input, message } from 'antd';
import { useForm, Controller } from 'react-hook-form';
import { LoginButtons } from './LoginButtons';
import axios from 'axios';
import { useNavigate } from 'react-router';
import { FC } from 'react';
import { LoginValues } from '../../type';
import { apiUrl } from '../../../redux/actions/favoriteThunkActions';
const LoginForm: FC = () => {
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
      onFinish={handleSubmit(onFinish)}>
      <Form.Item
        validateStatus={errors.login ? 'error' : ''}
        help={
          errors.login && (
            <span style={{ display: 'block', textAlign: 'center', color: 'red' }}>
              {String(errors.login?.message)}
            </span>
          )
        }>
        <Controller
          name="login"
          control={control}
          rules={{ required: { value: true, message: 'Введите имя пользователя' } }}
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
            <span style={{ display: 'block', textAlign: 'center', color: 'red' }}>
              {errors.password.message}
            </span>
          )
        }>
        <Controller
          name="password"
          control={control}
          rules={{
            required: { value: true, message: 'Введите пароль' },
            pattern: { value: /^(?=.*[A-Z]).{8,}$/, message: 'Некорректный пароль' },
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
