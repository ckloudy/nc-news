import { Container, Typography } from '@mui/material';
import { useState } from 'react';

const Error = ({ error }) => {
  return (
    <div>
      <Container>
        <Typography>{error}</Typography>
      </Container>
    </div>
  );
};

export default Error;
