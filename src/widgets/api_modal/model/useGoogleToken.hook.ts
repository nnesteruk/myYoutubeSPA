import axios from 'axios';
import { useState } from 'react';
import { apiKeyRegex, apiUrl } from 'shared/config';

export const useGoogleToken = (setOpen: (value: boolean) => void) => {
  const [apiKey, setApikey] = useState('');
  const [buttonLoading, setButtonLoading] = useState(false); //! вынести логику в хуки

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
  return { buttonLoading, setApikey, addToken };
};
