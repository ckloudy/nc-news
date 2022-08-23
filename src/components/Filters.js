import React, { useEffect } from 'react';
import { getArticlesByTopic } from '../utils/articlesApi';
import { Link, useParams } from 'react-router-dom';
import ArticleList from './ArticleList';

const Filters = ({ articles, setArticles }) => {
  const { topic } = useParams();

  useEffect(
    () => {
      getArticlesByTopic(topic).then((articlesFromApi) => {
        console.log(articlesFromApi);
        setArticles(articlesFromApi.articles);
      });
    },
    [ setArticles ]
  );
  console.log(topic);

  return <div>{/* <Link>Coding</Link> */}</div>;
};

export default Filters;
