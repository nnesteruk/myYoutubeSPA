import LoginForm from '../../components/Auth/Login/LoginForm';

export const LoginPage = () => {
  return (
    <div className="login container">
      <h1 className="login__title">
        <i className="fab fa-youtube login__icon"></i>
        Вход
      </h1>
      <LoginForm />
    </div>
  );
};
