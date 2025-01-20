import { Button } from 'antd';
import Item from 'antd/es/list/Item';
import { NavLink } from 'react-router';

export const LoginButtons = () => {
  return (
    <Item className="login__buttons">
      <Button className="login__button" type="primary" htmlType="submit">
        Войти
      </Button>
      <NavLink to="/registration" className="login__link">
        Зарегистрироваться
      </NavLink>
    </Item>
  );
};
