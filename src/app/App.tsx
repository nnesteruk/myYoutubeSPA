import { RoutesProvider } from './routes';
import { Providers } from './providers';
import { Notify } from 'shared/ui';

export const App = () => {
  return (
    <Providers>
      <RoutesProvider />
      <Notify />
    </Providers>
  );
};
