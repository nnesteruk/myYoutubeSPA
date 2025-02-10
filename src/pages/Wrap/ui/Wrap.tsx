import { FC } from 'react';
import { Layout, Menu } from 'antd';
import { Outlet, useNavigate } from 'react-router';
import './wrap.scss';
import { MenuItem } from '../model';

const { Header, Content, Footer } = Layout;

const items = ['Поиск', 'Избранное', 'Выйти'].map((name, index) => ({
  key: String(index + 1),
  label: name,
}));

export const Wrap: FC = () => {
  const navigate = useNavigate();

  // const {
  //   token: { borderRadiusLG },
  // } = theme.useToken();

  const clickYoutube = () => {
    navigate('/searchPage');
    window.location.reload();
  };

  const clickMenuItem = (item: MenuItem) => {
    console.log(typeof item?.domEvent);
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
