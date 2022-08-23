import { useState, useEffect } from 'react';
import { getArticles, getArticlesByTopic } from '../utils/articlesApi';
import SingleArticleCard from './SingleArticleCard';

const ArticleList = ({ topic }) => {
  const [ articles, setArticles ] = useState([]);
  const [ isLoading, setIsLoading ] = useState(true);

  function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  useEffect(
    () => {
      if (!topic) {
        getArticles().then((articlesFromApi) => {
          setArticles(articlesFromApi.articles);
          setIsLoading(false);
        });
      } else {
        getArticlesByTopic(topic).then((articlesFromApi) => {
          setArticles(articlesFromApi.articles);
          setIsLoading(false);
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
      <div className="article-list">
        <h2 className="article_title">
          {() => capitalize(topic)}
          Articles
        </h2>
        <ul>
          {articles.map((article) => {
            return (
              <SingleArticleCard key={article.article_id} article={article} />
            );
          })}
        </ul>
      </div>
    );
  }
};

export default ArticleList;
