import { FC } from 'react';
import { Layout, Menu } from 'antd';
import { Outlet, useNavigate } from 'react-router';
import './main.scss';

import { FAVORITE_PAGE, MAIN, SEARCH_PAGE } from 'shared/routes';
import { MenuItem } from '../model';

const { Header, Content, Footer } = Layout;

const items = ['Поиск', 'Избранное', 'Выйти'].map((name, index) => ({
  key: String(index + 1),
  label: name,
}));

export const Main: FC = () => {
  const navigate = useNavigate();

  const clickYoutube = () => {
    navigate(SEARCH_PAGE);
    window.location.reload();
  };

  const clickMenuItem = (item: MenuItem) => {
    switch (item.key) {
      case '1':
        navigate(SEARCH_PAGE);
        break;
      case '2':
        navigate(FAVORITE_PAGE);
        break;
      case '3':
        {
          navigate(MAIN);
          localStorage.clear();
        }
        break;
    }
  };

  return (
    <Layout className="wrap">
      <Header className="wrap__header">
        <div className="wrap__header-block container">
          <i className="wrap__icon fab fa-youtube" onClick={clickYoutube}></i>
          <Menu
            className="wrap__menu"
            mode="horizontal"
            defaultSelectedKeys={['1']}
            items={items}
            onClick={clickMenuItem}
          />
        </div>
      </Header>
      <Content className="wrap__content container">
        <Outlet />
      </Content>
      <Footer className="wrap__footer">
        Ant Design ©{new Date().getFullYear()} Created by Ant UED
      </Footer>
    </Layout>
  );
};
