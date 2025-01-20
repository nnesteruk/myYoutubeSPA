import { RegistrationForm } from '../../components/Auth/Registration/RegistrationForm';

export const RegistrationPage = () => {
  return (
    <div className="registration container">
      <h1 className="registration__title">Регистрация</h1>
      <RegistrationForm />
    </div>
  );
};
