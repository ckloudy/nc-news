import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getFullArticle } from '../utils/articlesApi';
import { Container, Box, IconButton, Typography } from '@mui/material';
import { ThumbUpRounded, ThumbDownRounded } from '@mui/icons-material';
import { updateArticle } from '../utils/articlesApi';
import CommentsList from './CommentsList';
import AddComment from './AddComment';
import Error from './Error';

const SingleFullArticle = () => {
  const [ fullArticle, setFullArticle ] = useState({});
  const [ isLoading, setIsLoading ] = useState(true);
  const [ upVotesChange, setUpVotesChange ] = useState(0);
  const [ downVotesChange, setDownVotesChange ] = useState(0);
  const [ upDisabled, setUpDisabled ] = useState(false);
  const [ downDisabled, setDownDisabled ] = useState(false);
  const [ newComment, setNewComment ] = useState(false);
  const [ error, setError ] = useState(null);
  const { id } = useParams();

  const handleUpVote = (inc) => {
    setUpVotesChange((curr) => curr + inc);
    setUpDisabled(true);
    setDownDisabled(false);
    updateArticle(id, inc);
  };

  const handleDownVote = (inc) => {
    setDownVotesChange((curr) => curr + inc);
    setDownDisabled(true);
    setUpDisabled(false);
    updateArticle(id, inc);
  };

  useEffect(
    () => {
      getFullArticle(id)
        .then((articleFromApi) => {
          setFullArticle(articleFromApi.article);
          setIsLoading(false);
        })
        .catch((err) => {
          console.log(err);
          if (err.response.status === 404) {
            setError(err.response.data.msg);
            setIsLoading(false);
          } else {
            setError('Something has gone wrong');
          }
        });
    },
    [ id, isLoading ]
  );

  if (isLoading) {
    return (
      <div className="loading">
        <p>Loading...</p>
      </div>
    );
  } else {
    if (error) {
      setIsLoading(false);
      return <Error error={error} />;
    }

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
        <Typography color="text.secondary" sx={{ fontSize: 15, p: 2 }}>
          {fullArticle.topic}
        </Typography>
        <Typography sx={{ fontSize: 17, p: 2 }}>{fullArticle.body}</Typography>
        <Box>
          <Typography sx={{ fontSize: 15, p: 2 }} color="text.secondary">
            Written by - {fullArticle.author}
          </Typography>
          <Typography sx={{ fontSize: 15, p: 2 }}>
            {fullArticle.votes + upVotesChange + downVotesChange} Votes
            <IconButton
              color="success"
              onClick={() => handleUpVote(+1)}
              disabled={upDisabled}>
              <ThumbUpRounded />
            </IconButton>
            <IconButton
              color="error"
              onClick={() => handleDownVote(-1)}
              disabled={downDisabled}>
              <ThumbDownRounded />
            </IconButton>
          </Typography>
        </Box>
        <Typography>{fullArticle.comment_count} Comments</Typography>
        <AddComment id={id} setNewComment={setNewComment} />
        <div>
          <CommentsList
            fullArticle={fullArticle}
            id={id}
            newComment={newComment}
            setNewComment={setNewComment}
          />
        </div>
      </Container>
    );
  }
};

export default SingleFullArticle;
