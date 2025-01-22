import React from 'react';
import { Layout, Menu, theme } from 'antd';
import { Outlet, useNavigate } from 'react-router';

const { Header, Content, Footer } = Layout;

const items = ['Поиск', 'Избранное', 'Выйти'].map((name, index) => ({
  key: String(index + 1),
  label: name,
}));

const Wrap: React.FC = () => {
  const navigate = useNavigate();
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const clickYoutube = () => {
    navigate('/searchPage');
    window.location.reload();
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
        className="wrap__header">
        <div className="wrap__header-block container">
          <i className="wrap__icon fab fa-youtube" onClick={clickYoutube}></i>
          <Menu
            className="wrap__menu"
            // theme="dark"
            mode="horizontal"
            defaultSelectedKeys={['1']}
            items={items}
            style={{ flex: 1, minWidth: 0 }}
            onClick={(item) => {
              switch (item.key) {
                case '1':
                  navigate('searchPage');
                  break;
                case '2':
                  navigate('favoritePage');
                  break;
                case '3':
                  {
                    navigate('/');
                    localStorage.removeItem('token');
                  }
                  break;
              }
            }}
          />
        </div>
      </Header>
      <Content
        style={{
          // padding: 24,
          height: '100%',
          // background: colorBgContainer,
          borderRadius: borderRadiusLG,
        }}
        className="wrap__content container">
        <Outlet />
      </Content>
      <Footer style={{ textAlign: 'center' }}>
        Ant Design ©{new Date().getFullYear()} Created by Ant UED
      </Footer>
    </Layout>
  );
};

export default Wrap;
