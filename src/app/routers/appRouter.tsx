import { BrowserRouter, Route, Routes } from 'react-router';

export const AppRouter = () => {
  return (
    <BrowserRouter basename="/youtubeSpa/">
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
    </BrowserRouter>
  );
};
