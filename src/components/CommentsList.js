import { useState, useEffect } from 'react';
import SingleComment from './SingleComment';
import { getArticleIdComments } from '../utils/articlesApi';
import { List } from '@mui/material';

const CommentsList = ({ id, newComment, setNewComment }) => {
  const [ allComments, setAllComments ] = useState([]);

  useEffect(
    () => {
      getArticleIdComments(id).then((commentsFromApi) => {
        setAllComments(commentsFromApi.comments);
        setNewComment(false);
      });
    },
    [ id, newComment, setNewComment ]
  );

  return (
    <div>
      <List>
        {allComments.map((comment) => {
          return (
            <SingleComment id={id} comment={comment} key={comment.comment_id} />
          );
        })}
      </List>
    </div>
  );
};

export default CommentsList;
