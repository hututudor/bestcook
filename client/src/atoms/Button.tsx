import React, { FC, HTMLProps } from 'react';
import styled, { css } from 'styled-components';
import { colors } from '../assets/colors';

interface Props extends HTMLProps<HTMLButtonElement> {
  role?: 'primary' | 'secondary';
  disabled?: boolean;
}

export const Button: FC<Props> = styled.button<Props>`
  border: none;
  outline: none;
  padding: 1.4rem;
  font-size: 1.6rem;
  cursor: pointer;
  user-select: none;
  border-radius: 4px;

  ${props =>
    props.role === 'primary' &&
    css`
      background: ${colors.purple_500};
      color: ${colors.purple_050};

      :active {
        background: ${colors.purple_600} !important;
      }
    `}

  ${props =>
    props.role === 'primary' &&
    props.disabled &&
    css`
      background: ${colors.purple_500};
      color: ${colors.purple_050};
    `}
`;
