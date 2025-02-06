import React from 'react';
import { Layout, Menu, theme } from 'antd';
import { Outlet, useNavigate } from 'react-router';
import './wrap.scss';

const { Header, Content, Footer } = Layout;

const items = ['Поиск', 'Избранное', 'Выйти'].map((name, index) => ({
  key: String(index + 1),
  label: name,
}));

// type MenuItem = {
//   key: string;
//   keyPath: string[];
//   domEvent: unknown; //! проверить тип
// };
export const Wrap: React.FC = () => {
  const navigate = useNavigate();

  const {
    token: { borderRadiusLG },
  } = theme.useToken();

  const clickYoutube = () => {
    navigate('/searchPage');
    window.location.reload();
  };

  const clickMenuItem = (item: unknown) => {
    console.log(item);
    switch (item.key) {
      case '1':
        navigate('/searchPage');
        break;
      case '2':
        navigate('/favoritePage');
        break;
      case '3':
        {
          navigate('/');
          localStorage.clear();
        }
        break;
    }
  };

  return (
    <Layout className="wrap">
      <Header
        // style={{
        //   position: 'sticky',
        //   top: 0,
        //   zIndex: 1,
        //   width: '100%',
        //   display: 'flex',
        //   alignItems: 'center',
        //   marginBottom: '10px',
        //   backgroundColor: colorBgContainer,
        // }}
        className="wrap__header"
      >
        <div className="wrap__header-block container">
          <i className="wrap__icon fab fa-youtube" onClick={clickYoutube}></i>
          <Menu
            className="wrap__menu"
            // theme="dark"
            mode="horizontal"
            defaultSelectedKeys={['1']}
            items={items}
            style={{ flex: 1, minWidth: 0 }}
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
