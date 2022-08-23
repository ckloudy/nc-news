import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getFullArticle } from '../utils/articlesApi';

const SingleFullArticle = () => {
  const [ fullArticle, setFullArticle ] = useState({});
  const [ isLoading, setIsLoading ] = useState(true);
  const { id } = useParams();

  useEffect(
    () => {
      getFullArticle(id).then((articleFromApi) => {
        setFullArticle(articleFromApi.article);
        setIsLoading(false);
      });
    },
    [ id, isLoading ]
  );
  if (isLoading)
    return (
      <div className="loading">
        <p>Loading...</p>
      </div>
    );
  return (
    <div>
      <div className="fullArticle_container">
        <h2>{fullArticle.title}</h2>
        <img
          src="https://images.unsplash.com/photo-1612178537253-bccd437b730e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
          alt=""
        />
        <p className="fullArticle_topic">{fullArticle.topic}</p>
        <p className="fullArticle_body">{fullArticle.body}</p>
        <p className="fullArticle_author">Written by - {fullArticle.author}</p>
        <p className="fullArticle_comments">
          {fullArticle.comment_count} Comments
        </p>
        <p className="fullArticle_votes">{fullArticle.votes} Votes</p>
      </div>
    </div>
  );
};

export default SingleFullArticle;
