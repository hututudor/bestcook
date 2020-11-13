import React, { FC } from 'react';
import { useHistory } from 'react-router-dom';
import qs from 'qs';

import { RegisterForm } from '../organisms';
import { AuthWrapper } from '../templates';
import { register } from '../api';

export const Register: FC = () => {
  const history = useHistory();

  const onSubmit = async (name: string, email: string, password: string) => {
    const response = await register(name, email, password);

    history.push(
      `/confirm${qs.stringify({ email }, { addQueryPrefix: true })}`
    );
  };

  return (
    <AuthWrapper>
      <RegisterForm onSubmit={onSubmit} />
    </AuthWrapper>
  );
};
