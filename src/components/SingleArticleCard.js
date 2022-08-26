import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardMedia, Typography, Box } from '@mui/material';
import { FavoriteRounded, QuestionAnswer } from '@mui/icons-material';

const SingleArticleCard = ({ article }) => {
  const date = article.created_at;
  const displayDate = new Date(date).toLocaleString('en-GB');

  return (
    <Card>
      <CardMedia
        component="img"
        height="140"
        image="https://source.unsplash.com/random"
        alt="random"
      />
      <CardContent>
        <Typography
          gutterBottom
          variant="p"
          component="p"
          style={{ fontSize: 10, paddingBottom: 10, color: '#ED6C02' }}>
          {article.topic}
        </Typography>
        <Typography
          color="text.secondary"
          gutterBottom
          variant="p"
          component="p"
          style={{ fontSize: 12 }}>
          {displayDate}
        </Typography>
        <Link
          className="card_title"
          style={{
            textDecoration: 'none',
            color: 'inherit'
          }}
          to={`/articles/topics/${article.topic}/article-${article.article_id}`}>
          <Typography
            className="card_title"
            style={{ padding: 20 }}
            gutterBottom
            variant="h6"
            component="h4"
            sx={{ height: 115 }}>
            {article.title}
          </Typography>
        </Link>
        <Typography
          variant="body2"
          color="text.secondary"
          style={{ fontSize: 12 }}>
          Written by - {article.author}
        </Typography>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 3
          }}>
          <Typography
            variant="body2"
            alignItems={'center'}
            style={{ fontSize: 15, marginTop: 10, marginRight: 6 }}>
            {article.comment_count}
          </Typography>
          <QuestionAnswer
            color="primary"
            fontSize="small"
            sx={{ marginRight: 10 }}
          />
          <Typography
            variant="body2"
            alignItems={'center'}
            style={{ fontSize: 15, marginTop: 10, marginRight: 6 }}>
            {article.votes}
          </Typography>
          <FavoriteRounded color="error" fontSize="small" />
        </Box>
      </CardContent>
    </Card>
  );
};

export default SingleArticleCard;
