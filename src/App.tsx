import { Route, Routes } from 'react-router';
import { LoginPage } from './pages/Auth/LoginPage';
import { RegistrationPage } from './pages/Auth/RegistrationPage';
import { PrivateRoute } from './routes/PrivateRoute/PrivateRoute';
import Wrap from './pages/Main/Wrap';
import SearchPage from './pages/Main/SearchPage';
import { FavoritePage } from './pages/Main/FavoritePage';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/registration" element={<RegistrationPage />} />
        <Route element={<PrivateRoute />}>
          <Route path="/" element={<Wrap />}>
            <Route path="searchPage" element={<SearchPage />} />
            <Route path="favoritePage" element={<FavoritePage />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
