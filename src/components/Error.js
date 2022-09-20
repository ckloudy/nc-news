import { Container, Typography } from '@mui/material';

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
