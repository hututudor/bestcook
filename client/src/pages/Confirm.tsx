import React, { FC } from 'react';

import { ConfirmForm, RegisterForm } from '../organisms';
import { AuthWrapper } from '../templates';
import { register } from '../api';

export const Confirm: FC = () => {
  const onSubmit = async (email: string, code: string) => {
    // const response = await register(name, email, password);
    // history.push(
    //   `/confirm${qs.stringify({ email }, { addQueryPrefix: true })}`
    // );
  };

  return (
    <AuthWrapper>
      <ConfirmForm onSubmit={onSubmit} />
    </AuthWrapper>
  );
};
