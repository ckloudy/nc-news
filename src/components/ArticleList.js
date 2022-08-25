import { useState, useEffect } from 'react';
import { getArticles, getArticlesByTopic } from '../utils/articlesApi';
import SingleArticleCard from './SingleArticleCard';
import { Grid, Container, Typography } from '@mui/material';
import { UserContext } from '../contexts/UserContext';
import { useContext } from 'react';

const ArticleList = ({ topic }) => {
  const [ articles, setArticles ] = useState([]);
  const [ isLoading, setIsLoading ] = useState(true);
  const [ topicCap, setTopicCap ] = useState('');
  const { user } = useContext(UserContext);

  useEffect(
    () => {
      if (!topic) {
        getArticles().then((articlesFromApi) => {
          setArticles(articlesFromApi.articles);
          setIsLoading(false);
          setTopicCap('All');
        });
      } else {
        getArticlesByTopic(topic).then((articlesFromApi) => {
          setArticles(articlesFromApi.articles);
          setIsLoading(false);
          setTopicCap(topic[0].toUpperCase() + topic.slice(1));
        });
      }
    },
    [ topic, isLoading ]
  );

  if (isLoading) {
    return (
      <div className="loading">
        <p>Loading...</p>
      </div>
    );
  } else {
    return (
      // <div className="article-list">
      <Container style={{ marginBottom: 50 }}>
        <Typography variant="h5">Hello, {user.name}</Typography>
        <Typography
          variant="h4"
          component="h2"
          style={{ padding: 40, color: '#363534' }}>
          {topicCap} Articles
        </Typography>
        <Grid container spacing={4}>
          {articles.map((article) => {
            return (
              <Grid item key={article.article_id} xs={12} sm={6} md={4}>
                <SingleArticleCard article={article} />
              </Grid>
            );
          })}
        </Grid>
      </Container>
      // </div>
    );
  }
};

export default ArticleList;
