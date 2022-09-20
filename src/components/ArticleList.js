import { useState, useEffect } from 'react';
import { getArticles } from '../utils/articlesApi';
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
import { capitalizeFirstLetter } from '../utils/Capitalize';

const ArticleList = ({ topic }) => {
  const [ articles, setArticles ] = useState([]);
  const [ isLoading, setIsLoading ] = useState(true);
  const [ topicCap, setTopicCap ] = useState('');
  const [ sort, setSort ] = useState('created_at');
  const [ order, setOrder ] = useState('DESC');
  const { user } = useContext(UserContext);

  useEffect(
    () => {
      getArticles(topic, sort, order)
        .then((articlesFromApi) => {
          setArticles(articlesFromApi.articles);
          setIsLoading(false);
          const cap = capitalizeFirstLetter(topic);
          setTopicCap(cap);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    [ topic, isLoading, sort, order ]
  );

  const handleChange = (e) => {
    setSort(e.target.value);
  };

  const handleOrder = (e) => {
    setOrder(e.target.value);
  };

  if (isLoading) {
    return (
      <div className="loading">
        <p>Loading...</p>
      </div>
    );
  } else {
    return (
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
                <MenuItem value={'comment_count'}>Comments</MenuItem>
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
