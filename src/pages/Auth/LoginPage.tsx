import LoginForm from '../../components/Auth/Login/LoginForm';
import '@fortawesome/fontawesome-free/css/all.min.css';

export const LoginPage = () => {
  return (
    <div className="login container">
      <h1 className="login__title">
        <i className="fab fa-youtube login__icon"></i>
        Входд
      </h1>
      <LoginForm />
    </div>
  );
};
