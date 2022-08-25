import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getFullArticle } from '../utils/articlesApi';
import { Container, Box, IconButton } from '@mui/material';
import { ThumbUpRounded, ThumbDownRounded } from '@mui/icons-material';
import { updateArticle } from '../utils/articlesApi';
import CommentsList from './CommentsList';

const SingleFullArticle = () => {
  const [ fullArticle, setFullArticle ] = useState({});
  const [ isLoading, setIsLoading ] = useState(true);
  const [ votesChange, setVotesChange ] = useState(0);
  const [ disabled, setDisabled ] = useState(false);
  const { id } = useParams();

  const handleVote = (inc) => {
    setVotesChange((curr) => curr + inc);
    setDisabled(true);
    updateArticle(id, inc);
  };

  useEffect(
    () => {
      getFullArticle(id).then((articleFromApi) => {
        setFullArticle(articleFromApi.article);
        setIsLoading(false);
      });
    },
    [ id, isLoading ]
  );
  if (isLoading)
    return (
      <div className="loading">
        <p>Loading...</p>
      </div>
    );
  return (
    <Container
      className="fullArticle_container"
      sx={{ alignItems: 'center', height: '100vh' }}>
      <h2>{fullArticle.title}</h2>
      <Box
        sx={{
          width: 700,
          height: 300,
          overflow: 'hidden',
          objectFit: 'cover',
          mx: 'auto'
        }}>
        <img src="https://source.unsplash.com/random" alt="" />
      </Box>
      <p className="fullArticle_topic">{fullArticle.topic}</p>
      <p className="fullArticle_body">{fullArticle.body}</p>
      <Box>
        <p className="fullArticle_author">Written by - {fullArticle.author}</p>
        <p className="fullArticle_votes">
          {fullArticle.votes + votesChange} Votes
          <IconButton
            color="success"
            onClick={() => handleVote(+1)}
            disabled={disabled}>
            <ThumbUpRounded />
          </IconButton>
          <IconButton
            color="error"
            onClick={() => handleVote(-1)}
            disabled={disabled}>
            <ThumbDownRounded />
          </IconButton>
        </p>
      </Box>
      <p className="fullArticle_comments">
        {fullArticle.comment_count} Comments
      </p>
      <div>
        <CommentsList fullArticle={fullArticle} id={id} />
      </div>
    </Container>
  );
};

export default SingleFullArticle;
