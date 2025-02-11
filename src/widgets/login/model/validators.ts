import { object, string } from 'yup';

export const loginSchema = object().shape({
  login: string()
    .trim()
    .required('Обязательное поле')
    .min(3, 'Необходимо минимум 3 символа'),
  password: string()
    .trim()
    .required('Обязательное поле')
    .matches(
      /^(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/,
      'Неверный формат пароля!',
    ),
});

export const registrationSchema = object().shape({
  login: string()
    .trim()
    .required('Обязательное поле')
    .min(3, 'Необходимо минимум 3 символа!'),
  email: string()
    .trim()
    .required('Обязательное поле')
    .email('Неверный формат email!'),
  password: string()
    .trim()
    .required('Обязательное поле')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/,
      'Пароль не соответствует подсказке!',
    ),
});
