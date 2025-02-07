import { RoutesProvider } from './routes';
import { Providers } from './providers';

export const App = () => {
  return (
    <Providers>
      <RoutesProvider />
    </Providers>
  );
};
