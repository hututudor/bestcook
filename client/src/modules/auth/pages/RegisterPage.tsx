import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers';
import * as yup from 'yup';
import { Flex, Card, Space, Typography, Input, Button } from '@ivoryio/kogaio';

import bg from 'app/assets/bg.jpg';

import { RegisterData } from 'modules/interfaces/user';
import { useAuth } from 'modules/auth';
import { registerUser } from 'modules/api';

const schema = yup.object().shape({
  name: yup.string().required('Name is required'),
  email: yup
    .string()
    .email('Email must be valid')
    .required('Email is required'),
  password: yup
    .string()
    .min(5, 'Password must have at least 5 characters')
    .required('Password is required')
});

export const RegisterPage = () => {
  const auth = useAuth();
  const history = useHistory();
  const [error, setError] = useState<string | null>(null);

  const { register, setValue, watch, handleSubmit, errors } = useForm<
    RegisterData
  >({
    resolver: yupResolver(schema)
  });

  useEffect(() => {
    register({ name: 'name' });
    register({ name: 'email' });
    register({ name: 'password' });
  }, []);

  const onSubmit = async (data: RegisterData) => {
    try {
      const response = await registerUser(data);

      auth.login(response.data.user, response.data.token);
    } catch (e) {
      setError(e.response.data.message);
    }
  };

  return (
    <Wrapper>
      <Flex justifyContent="center" alignItems="center">
        <Space p={10} mt={150}>
          <Card backgroundColor="white" borderRadius={10} width={500}>
            <Typography textAlign="center" as="h1" mb={10}>
              Register
            </Typography>

            <Input
              id="name"
              label="Name"
              type="text"
              value={watch('name')}
              onChange={(e: any) => setValue('name', e.target.value)}
              error={errors.name?.message}
            />

            <Input
              id="email"
              label="Email"
              type="email"
              value={watch('email')}
              onChange={(e: any) => setValue('email', e.target.value)}
              error={errors.email?.message}
            />

            <Input
              id="password"
              label="Password"
              type="password"
              value={watch('password')}
              onChange={(e: any) => setValue('password', e.target.value)}
              error={errors.password?.message}
            />

            <Typography textAlign="center" color="error">
              {error}
            </Typography>

            <Flex mt={5}>
              <Button variant="secondary" width="100%">
                Back
              </Button>
              <Button width="100%" onClick={handleSubmit(onSubmit)}>
                Register
              </Button>
            </Flex>
          </Card>
        </Space>
      </Flex>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  background: url(${bg}) no-repeat center center fixed;
  min-height: 100vh;
`;
