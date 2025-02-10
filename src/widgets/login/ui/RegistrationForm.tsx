import { Button, Form, Input, Tooltip } from 'antd';
import { FC } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { NavLink, useNavigate } from 'react-router';
import './registration.scss';
import { FormValues, registrationSchema } from '../model';
import { yupResolver } from '@hookform/resolvers/yup';
import { instance } from '../api';

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
  } = useForm<FormValues>({ resolver: yupResolver(registrationSchema) });

  const onSubmit = async (value: FormValues) => {
    try {
      await instance.post('/api/register/', value);
      alert('Регистрация прошла успешно');
      navigate('/');
    } catch (err: any) {
      alert(err.response.data.message);
      console.log(err);
    }
  };
  return (
    <Form
      {...formItemLayout}
      className="form"
      onFinish={handleSubmit(onSubmit)}
    >
      <div>
        <label>Login:</label>
        <Controller
          name="login"
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              className={
                errors.login?.message
                  ? 'form__input form__input_error'
                  : 'form__input'
              }
              placeholder="nikiN"
            />
          )}
        />
        <p className="form__errors"> {errors.login?.message}</p>
      </div>
      <div>
        <label>Email:</label>
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              className={
                errors.email?.message
                  ? 'form__input form__input_error'
                  : 'form__input'
              }
              placeholder="nikita@yandex.ru"
            />
          )}
        />
        <p className="form__errors"> {errors.email?.message}</p>
      </div>
      <div>
        <Tooltip
          title="Минимум 8 символов и 1 заглавную букву,1 прописную, 1 символ, 1 цифру"
          placement="right"
        >
          <label className="form__password-label">Password:</label>
        </Tooltip>
        <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              className={
                errors.password?.message
                  ? 'form__input form__input_error'
                  : 'form__input'
              }
              placeholder="Q123445566"
            />
          )}
        />
        <p className="form__errors"> {errors.password?.message}</p>
      </div>
      <div className="form__buttons">
        <Button type="primary" htmlType="submit">
          Зарегистрироваться
        </Button>
        <div className="form__link">
          <p>Уже есть аккаунт?</p>
          <NavLink to="/" className="link">
            Войти
          </NavLink>
        </div>
      </div>
    </Form>
  );
};
