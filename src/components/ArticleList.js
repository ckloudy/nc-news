import { useState, useEffect } from 'react';
import {
  getArticles,
  getArticlesByTopic,
  getArticlesSort,
  getArticlesOrder,
  getArticlesSortNoTopic,
  getArticlesOrderNoTopic
} from '../utils/articlesApi';
import SingleArticleCard from './SingleArticleCard';
import {
  Grid,
  Container,
  Typography,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material';
import { UserContext } from '../contexts/UserContext';
import { useContext } from 'react';

const ArticleList = ({ topic }) => {
  const [ articles, setArticles ] = useState([]);
  const [ isLoading, setIsLoading ] = useState(true);
  const [ topicCap, setTopicCap ] = useState('');
  const [ sort, setSort ] = useState('');
  const [ order, setOrder ] = useState('');
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

  const handleChange = (e) => {
    if (!topic) {
      getArticlesSortNoTopic(e.target.value).then((sortedArticles) => {
        setArticles(sortedArticles.articles);
        setSort(e.target.value);
      });
    } else {
      getArticlesSort(topic, e.target.value).then((sortedArticles) => {
        setArticles(sortedArticles.articles);
        setSort(e.target.value);
      });
    }
  };

  const handleOrder = (e) => {
    if (!order) {
      getArticlesOrderNoTopic(e.target.value).then((orderedArticles) => {
        setArticles(orderedArticles.articles);
        setOrder(e.target.value);
      });
    } else {
      getArticlesOrder(topic, e.target.value).then((orderedArticles) => {
        setArticles(orderedArticles.articles);
        setOrder(e.target.value);
      });
    }
  };

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
        <Container
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}>
          <Typography
            variant="h4"
            component="h2"
            style={{ padding: 40, color: '#363534' }}>
            {topicCap} Articles
          </Typography>
          <Box sx={{ minWidth: 80, width: 270, mr: 5, display: 'flex' }}>
            <FormControl fullWidth size="small">
              <InputLabel color="success" id="select-label">
                Sort By
              </InputLabel>
              <Select
                color="success"
                labelId="select-label-sort"
                id="simple-select"
                label="Sort By"
                value={sort}
                onChange={handleChange}>
                <MenuItem value={'created_at'}>Most recent</MenuItem>
                <MenuItem value={'article_id'}>id</MenuItem>
                <MenuItem value={'title'}>Title</MenuItem>
                <MenuItem value={'author'}>Author</MenuItem>
                <MenuItem value={'votes'}>Votes</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth size="small">
              <InputLabel color="success" id="select-label">
                Order
              </InputLabel>
              <Select
                color="success"
                labelId="select-label-order"
                id="simple-select"
                label="Order"
                value={order}
                onChange={handleOrder}>
                <MenuItem value={'ASC'}>Asc</MenuItem>
                <MenuItem value={'DESC'}>Desc</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Container>
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
