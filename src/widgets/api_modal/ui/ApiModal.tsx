import { Button, Input, Modal, Space } from 'antd';
import { FC } from 'react';
import { ApiModalProperty } from 'shared/types';
import './apiModal.scss';
import { useGoogleToken } from '../model';

export const ApiModal: FC<ApiModalProperty> = ({ open, setOpen }) => {
  const { addToken, setApikey, buttonLoading } = useGoogleToken(setOpen);
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
