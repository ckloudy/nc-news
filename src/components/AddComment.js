import React from 'react';
import { useContext } from 'react';
import { UserContext } from '../contexts/UserContext';
import { Button, TextField, Box } from '@mui/material';
import { Done } from '@mui/icons-material';
import { sendArticleIdComment } from '../utils/articlesApi';
import { useState } from 'react';

const AddComment = ({ id, setNewComment }) => {
  const { user } = useContext(UserContext);

  const [ done, setDone ] = useState('Add comment');
  const [ disabled, setDisabled ] = useState(false);
  const [ sent, setSent ] = useState('');
  const [ message, setMessage ] = useState('');
  const [ color, setColor ] = useState('primary');

  const handleSubmit = () => {
    if (message === '') {
      setColor('error');
      setDone('Please type a comment first');
      setTimeout(() => {
        setColor('primary');
        setDone('Add a comment');
      }, 1000);
    } else {
      setDisabled(true);
      sendArticleIdComment(id, user.username, message).then(() => {
        setDisabled(false);
        setDone(<Done />);
        setSent('posted');
        setColor('success');
        setTimeout(() => {
          setSent('');
          setDone('Add Comment');
          setColor('primary');
        }, 1500);
        setMessage('');
        setNewComment(true);
      });
    }
  };

  return (
    <div>
      <Box
        component="form"
        sx={{
          '& .MuiTextField-root': { m: 2, width: '50ch' }
        }}
        noValidate
        autoComplete="off">
        <div>
          <TextField
            id="outlined-multiline-flexible"
            label="Leave a comment"
            multiline
            maxRows={4}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>
        <Button
          variant="contained"
          onClick={handleSubmit}
          sx={{ mb: 5 }}
          disabled={disabled}
          color={color}>
          {done}
          {sent}
        </Button>
      </Box>
    </div>
  );
};

export default AddComment;
