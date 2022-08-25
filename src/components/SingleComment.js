import { ListItem, ListItemText, Typography, Card } from '@mui/material';

const SingleComment = ({ comment }) => {
  const date = comment.created_at;
  const displayDate = new Date(date).toLocaleString('en-GB');

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
        </ListItem>
      </Card>
    </div>
  );
};

export default SingleComment;
