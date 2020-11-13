import React, { FC } from 'react';
import { Formik } from 'formik';
import * as yup from 'yup';

import { ButtonWithLoading, InputWithLabel } from '../molecules';

interface Props {
  onSubmit: (name: string, email: string, password: string) => Promise<void>;
}

interface FormValues {
  name: string;
  email: string;
  password: string;
}

export const RegisterForm: FC<Props> = ({ onSubmit }) => {
  const handleSubmit = async (
    values: FormValues,
    { setSubmitting, setErrors }: any
  ) => {
    setSubmitting(true);

    try {
      await onSubmit(values.name, values.email, values.password);
    } catch (e) {
      if (e.response.data.message === 'User already exists') {
        setErrors({ email: e.response.data.message });
      }
    }

    setSubmitting(false);
  };

  return (
    <div className="form">
      <div className="title">Create an account</div>
      <Formik
        initialValues={{ name: '', email: '', password: '' }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({
          isSubmitting,
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit
        }) => (
          <form onSubmit={handleSubmit}>
            <InputWithLabel
              label="Name"
              placeholder="Name"
              name="name"
              autoComplete="off"
              value={values.name}
              error={touched.name ? errors.name : ''}
              onBlur={handleBlur}
              onChange={handleChange}
            />

            <InputWithLabel
              label="Email"
              placeholder="Email"
              name="email"
              autoComplete="off"
              value={values.email}
              error={touched.email ? errors.email : ''}
              onBlur={handleBlur}
              onChange={handleChange}
            />

            <InputWithLabel
              label="Password"
              placeholder="Password"
              name="password"
              autoComplete="off"
              type="password"
              value={values.password}
              error={touched.password ? errors.password : ''}
              onBlur={handleBlur}
              onChange={handleChange}
            />

            <ButtonWithLoading
              loading={isSubmitting}
              role="primary"
              type="submit"
            >
              Create account
            </ButtonWithLoading>
          </form>
        )}
      </Formik>
    </div>
  );
};

const validationSchema = yup.object().shape({
  name: yup.string().required('Name is required'),
  email: yup
    .string()
    .email('Email must be valid')
    .required('Email is required'),
  password: yup
    .string()
    .min(5, 'Password needs to have at least 5 characters')
    .required('Password is required')
});
