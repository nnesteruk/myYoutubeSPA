import { Button, Input, Modal, Space } from 'antd';
import axios from 'axios';
import { FC, useState } from 'react';
import { ApiModalProperty } from 'components/type';
import './apiModal.scss';
import { apiUrl } from 'shared/config';

export const ApiModal: FC<ApiModalProperty> = ({ open, setOpen }) => {
  const [apiKey, setApikey] = useState('');
  const [buttonLoading, setButtonLoading] = useState(false);
  const apiKeyRegex = /^AIza[a-zA-Z0-9_-]{35}$/;
  const addToken = async () => {
    try {
      if (apiKeyRegex.test(apiKey)) {
        setButtonLoading(() => true);
        const response = await axios.post(
          `${apiUrl}/api/user/addGoogleToken`,
          { googleToken: apiKey.toString() },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          },
        );
        localStorage.setItem('GoogleToken', response.data?.message);
        setOpen(false);
        return response;
      } else {
        alert('Некорректный google token');
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Modal open={open} closeIcon={false} footer={null} className="api-modal">
      <h1>Добавьте google token!</h1>
      <div className="api-modal__block">
        <label>Google token</label>
        <Space.Compact size="middle" className="api-modal__input">
          <Input
            onChange={(e) => setApikey(e.target.value)}
            onKeyDown={(e) => (e.key === 'Enter' ? addToken() : undefined)}
          />
          <Button
            onClick={addToken}
            type="primary"
            loading={buttonLoading ? true : false}
          >
            Добавить
          </Button>
        </Space.Compact>
      </div>

      <p>Если нет google token, то создайте!</p>
      <a
        href="https://console.cloud.google.com/apis/credentials?inv=1&invt=AboQvQ&project=youtubetes-379210"
        target="_blank"
      >
        Developer Console
      </a>
    </Modal>
  );
};
