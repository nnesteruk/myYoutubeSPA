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
      {/* <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p> */}
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
