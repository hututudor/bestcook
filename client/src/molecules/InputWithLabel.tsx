import React, { FC } from 'react';
import styled from 'styled-components';
import { Input } from '../atoms';
import { colors } from '../assets/colors';

interface Props extends React.ComponentProps<typeof Input> {
  label?: string;
  error?: string;
}

export const InputWithLabel: FC<Props> = ({ label, error, ...rest }) => {
  return (
    <Wrapper className="input-group">
      {label && <div className="input-label">{label}</div>}
      <Input {...rest} role={error ? 'error' : 'default'} />
      {error && <div className="input-error">{error}</div>}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  .input-label {
    font-size: 1.6rem;
    margin-bottom: 0.2rem;
    color: ${colors.blue_grey_900};
  }

  .input-error {
    font-size: 1.6rem;
    padding: 0.5rem 1rem;
    background: ${colors.red_vivid_600};
    color: ${colors.red_vivid_050};
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
  }
`;
