import { useParams } from 'react-router-dom';
import ArticleList from './ArticleList';

const FilterArticles = () => {
  const { topic } = useParams();

  return <ArticleList topic={topic} />;
};

export default FilterArticles;
