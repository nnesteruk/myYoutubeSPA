import { Button, Form } from 'antd';
import { FC } from 'react';
import { NavLink } from 'react-router';

export const RegistrationButtons: FC = () => {
  return (
    <Form.Item className="form__buttons">
      <Button type="primary" htmlType="submit">
        Зарегистрироваться
      </Button>
      <div className="form__link">
        <p>Уже есть аккаунт?</p>
        <NavLink to="/" className="login__link">
          Войти
        </NavLink>
      </div>
    </Form.Item>
  );
};
