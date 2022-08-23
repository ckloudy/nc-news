import { useState, useEffect } from 'react';
import { getArticles, getArticlesByTopic } from '../utils/articlesApi';
import SingleArticleCard from './SingleArticleCard';

const ArticleList = ({ topic }) => {
  const [ articles, setArticles ] = useState([]);
  const [ isLoading, setIsLoading ] = useState(true);
  const [ topicCap, setTopicCap ] = useState('');

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
      <div className="article-list">
        <h2 className="article_title">{topicCap} Articles</h2>
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
