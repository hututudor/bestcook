import React, { FC, HTMLProps } from 'react';
import styled, { css } from 'styled-components';
import { colors } from '../assets/colors';

interface Props extends HTMLProps<HTMLInputElement> {
  role?: 'error' | 'default';
}

export const Input: FC<Props> = styled.input<Props>`
  background: ${colors.blue_grey_050};
  border-radius: 4px;
  border: 1px solid ${colors.blue_grey_400};
  padding: 1rem;
  font-size: 1.6rem;
  outline: none;
  color: ${colors.blue_grey_900};
  width: 100%;

  :focus {
    background: ${colors.blue_grey_100};
  }

  ${props =>
    props.role === 'error' &&
    css`
      border-bottom-left-radius: 0;
      border-bottom-right-radius: 0;

      border-color: ${colors.red_vivid_600};
      color: ${colors.red_vivid_900};
      background: ${colors.red_vivid_050} !important;
    `}
`;
