import { store } from 'app/store';
import { FC } from 'react';
import { Provider } from 'react-redux';
import { Child } from './providers.type';

export const Providers: FC<Child> = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};
