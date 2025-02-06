import { LoginForm } from 'widgets/login/ui/LoginForm';

export const LoginPage = () => {
  return (
    <div className="login">
      <h1 className="login__title">
        <i className="fa-brands fa-youtube login__icon"></i>
        Вход
      </h1>
      <LoginForm />
    </div>
  );
};
