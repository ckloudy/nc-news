import React from 'react';

const SingleArticleCard = ({ article }) => {
  const date = article.created_at;
  const displayDate = new Date(date).toLocaleString('en-GB');

  return (
    <li className="article_card">
      <div className="article_image">
        <img
          src="https://images.unsplash.com/photo-1612178537253-bccd437b730e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
          alt=""
        />
        <div className="topic-icon">
          <p className="article_info__topic">
            <a href="#">{article.topic}</a>
          </p>
        </div>
      </div>
      <div className="article_info">
        <p className="article_info__date">{displayDate}</p>
        <p className="article_info__title">{article.title}</p>
        <div className="article_footer">
          <div className="article_info__author">
            <p>Written by - {article.author}</p>
          </div>
          <div className="article_info__stats">
            <p className="article_info__comment-count">
              <span className="counts">{article.comment_count}</span> comments
            </p>
            <p className="article_info__votes">
              <span className="counts">{article.votes}</span> votes
            </p>
          </div>
        </div>
      </div>
    </li>
  );
};

export default SingleArticleCard;
