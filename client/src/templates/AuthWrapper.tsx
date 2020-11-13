import React, { FC } from 'react';
import styled from 'styled-components';
import { colors } from '../assets/colors';

interface Props {}

export const AuthWrapper: FC<Props> = styled.div`
  min-height: 100vh;
  background: ${colors.blue_grey_900};

  .form {
    display: flex;
    flex-direction: column;
    max-width: 50rem;
    padding: 16rem 4rem;
    min-height: 100vh;
    background: ${colors.blue_grey_050};

    .title {
      text-align: center;
      font-size: 3rem;
      font-weight: bold;
      color: ${colors.blue_grey_900};
      margin-bottom: 4rem;
    }

    .subtitle {
      text-align: center;
      font-size: 2rem;
      margin-bottom: 3rem;
      margin-top: -3rem;
      color: ${colors.blue_grey_600};
    }

    button {
      margin-top: 2rem;
      width: 100%;
    }

    .input-group {
      margin-bottom: 2rem;
    }
  }
`;
