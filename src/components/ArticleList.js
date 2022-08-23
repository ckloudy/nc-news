import { useState, useEffect } from 'react';
import { getArticles } from '../utils/articlesApi';
import SingleArticleCard from './SingleArticleCard';

const ArticleList = () => {
  const [ articles, setArticles ] = useState([]);

  useEffect(() => {
    getArticles().then((articlesFromApi) => {
      setArticles(articlesFromApi.articles);
    });
  }, []);

  return (
    <div className="article-list">
      <ul>
        {articles.map((article) => {
          return (
            <SingleArticleCard key={article.article_id} article={article} />
          );
        })}
      </ul>
    </div>
  );
};

export default ArticleList;
