import React, { ComponentProps, FC } from 'react';
import styled from 'styled-components';
import { Button } from '../atoms/Button';
import { BeatLoader } from 'react-spinners';
import { colors } from '../assets/colors';

interface Props extends ComponentProps<typeof Button> {
  loading?: boolean;
}

export const ButtonWithLoading: FC<Props> = ({
  children,
  loading,
  ...rest
}) => {
  return (
    <Wrapper>
      <Button disabled={loading} {...rest}>
        {loading ? (
          <BeatLoader color={colors.purple_050} size="10px" />
        ) : (
          children
        )}
      </Button>
    </Wrapper>
  );
};

const Wrapper = styled.div``;
