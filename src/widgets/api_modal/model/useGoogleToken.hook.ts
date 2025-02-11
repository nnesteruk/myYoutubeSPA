import axios from 'axios';
import { useState } from 'react';
import { apiKeyRegex, apiUrl } from 'shared/config';
import { notify } from 'shared/ui';

export const useGoogleToken = (setOpen: (value: boolean) => void) => {
  const [apiKey, setApikey] = useState('');
  const [buttonLoading, setButtonLoading] = useState(false);

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
    } catch (err: any) {
      notify.error(err.message);
    }
  };
  return { buttonLoading, setApikey, addToken };
};
