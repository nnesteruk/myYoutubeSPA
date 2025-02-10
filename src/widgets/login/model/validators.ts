import * as yup from 'yup';

export const loginSchema = yup.object().shape({
  login: yup
    .string()
    .trim()
    .required('Обязательное поле')
    .min(3, 'Необходимо минимум 3 символа'),
  password: yup
    .string()
    .trim()
    .required('Обязательное поле')
    .matches(
      /^(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/,
      'Неверный формат пароля!',
    ),
});

export const registrationSchema = yup.object().shape({
  login: yup
    .string()
    .trim()
    .required('Обязательное поле')
    .min(3, 'Необходимо минимум 3 символа!'),
  email: yup
    .string()
    .trim()
    .required('Обязательное поле')
    .email('Неверный формат email!'),
  password: yup
    .string()
    .trim()
    .required('Обязательное поле')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/,
      'Пароль не соответствует подсказке!',
    ),
});
