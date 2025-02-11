import { BrowserRouter, Navigate, Outlet, Route, Routes } from 'react-router';
import { FAVORITE_PAGE, REGISTRATION, SEARCH_PAGE } from 'shared/routes';
import { RegistrationPage, LoginPage } from 'pages/login/index';
import { Main } from 'pages/main';
import { SearchPage } from 'pages/searchPage';
import { FavoritePage } from 'pages/favoritePage';
import { BASE_NAME, MAIN } from 'shared/routes';

export const RoutesProvider = () => {
  const PrivateRoute = () => {
    const isAuth = localStorage.getItem('token');
    return isAuth ? <Outlet /> : <Navigate to={MAIN} replace />;
  };
  return (
    <BrowserRouter basename={BASE_NAME}>
      <Routes>
        <Route path={MAIN} element={<LoginPage />} />
        <Route path={REGISTRATION} element={<RegistrationPage />} />
        <Route element={<PrivateRoute />}>
          <Route element={<Main />}>
            <Route path={SEARCH_PAGE} element={<SearchPage />} />
            <Route path={FAVORITE_PAGE} element={<FavoritePage />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
