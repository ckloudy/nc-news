import { ListItem, ListItemText, Typography, Card } from '@mui/material';
import DeleteComment from './DeleteComment';
import { useContext } from 'react';
import { UserContext } from '../contexts/UserContext';

const SingleComment = ({ comment, setDeleteComment, setAllComments }) => {
  const date = comment.created_at;
  const displayDate = new Date(date).toLocaleString('en-GB');
  const { user } = useContext(UserContext);

  return (
    <div>
      <Card sx={{ mb: 1 }}>
        <ListItem alignItems="flex-start">
          <ListItemText
            primary={comment.body}
            secondary={
              <Typography
                sx={{ display: 'block', marginTop: 2 }}
                component="span"
                variant="body2"
                color="text.secondary">
                {comment.author} - {displayDate} - {comment.votes} votes
              </Typography>
            }
          />
          {user.username === comment.author ? (
            <DeleteComment
              id={comment.comment_id}
              setDeleteComment={setDeleteComment}
              setAllComments={setAllComments}
            />
          ) : null}
        </ListItem>
      </Card>
    </div>
  );
};

export default SingleComment;
