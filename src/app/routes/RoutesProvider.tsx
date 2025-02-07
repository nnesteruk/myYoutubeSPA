import { BrowserRouter, Navigate, Outlet, Route, Routes } from 'react-router';
import { FAVORITE_PAGE, REGISTRATION, SEARCH_PAGE } from 'shared/routes';
import { RegistrationPage, LoginPage } from 'pages/login/index';
import { Wrap } from 'pages/Wrap';
import { SearchPage } from 'pages/searchPage';
import { FavoritePage } from 'pages/favoritePage';
import { BASE_NAME } from 'shared/routes/routePaths';

export const RoutesProvider = () => {
  const PrivateRoute = () => {
    const isAuth = localStorage.getItem('token');
    return isAuth ? <Outlet /> : <Navigate to="/" replace />;
  };
  return (
    <BrowserRouter basename={BASE_NAME}>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path={REGISTRATION} element={<RegistrationPage />} />
        <Route element={<PrivateRoute />}>
          <Route element={<Wrap />}>
            <Route path={SEARCH_PAGE} element={<SearchPage />} />
            <Route path={FAVORITE_PAGE} element={<FavoritePage />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
