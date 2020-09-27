import React from 'react';
import styled from 'styled-components';

import { Box, Flex, Typography } from '@ivoryio/kogaio';

export const NotFound = () => (
  <Flex flexDirection="column" width={1}>
    <Container left="50%" position="absolute" top="50%">
      <Typography m="auto" variant="h4">
        Oops! 404. Not found.
      </Typography>
    </Container>
  </Flex>
);

const Container = styled(Box)`
  transform: translateX(-50%);
`;
