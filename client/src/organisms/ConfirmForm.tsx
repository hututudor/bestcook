import React, { FC } from 'react';
import { Formik } from 'formik';
import * as yup from 'yup';
import qs from 'qs';
import { useLocation } from 'react-router-dom';

import { ButtonWithLoading, InputWithLabel } from '../molecules';

interface Props {
  onSubmit: (email: string, code: string) => Promise<void>;
}

interface FormValues {
  email: string;
  code: string;
}

export const ConfirmForm: FC<Props> = ({ onSubmit }) => {
  const location = useLocation();

  const handleSubmit = async (
    values: FormValues,
    { setSubmitting, setErrors }: any
  ) => {
    setSubmitting(true);

    try {
      // await onSubmit(values.name, values.email, values.password);
    } catch (e) {
      if (e.response.data.message === 'User already exists') {
        setErrors({ email: e.response.data.message });
      }
    }

    setSubmitting(false);
  };

  const getEmailFromQuery = (): string => {
    return (
      (qs.parse(location.search, { ignoreQueryPrefix: true })[
        'email'
      ] as string) || ''
    );
  };

  return (
    <div className="form">
      <div className="title">Confirm your account</div>
      <div className="subtitle">Check your email for the confirmation code</div>
      <Formik
        initialValues={{
          email: getEmailFromQuery(),
          code: ''
        }}
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
              label="Code"
              placeholder="Code"
              name="code"
              autoComplete="off"
              value={values.code}
              error={touched.code ? errors.code : ''}
              onBlur={handleBlur}
              onChange={handleChange}
            />

            <ButtonWithLoading
              loading={isSubmitting}
              role="primary"
              type="submit"
            >
              Confirm account
            </ButtonWithLoading>
          </form>
        )}
      </Formik>
    </div>
  );
};

const validationSchema = yup.object().shape({
  name: yup.string().required('Name is required'),
  code: yup.string().required('Code is required')
});
