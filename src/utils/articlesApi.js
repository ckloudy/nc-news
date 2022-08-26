import axios from 'axios';

export function getArticles(topic, sort = 'created_at', order = 'DESC') {
  return axios
    .get(`https://dnc-news.herokuapp.com/api/articles`, {
      params: {
        topic: topic,
        sort_by: sort,
        order: order
      }
    })
    .then(({ data }) => {
      return data;
    });
}

export function getFullArticle(id) {
  return fetch(
    `https://dnc-news.herokuapp.com/api/articles/${id}`
  ).then((res) => {
    return res.json();
  });
}

export function getArticleIdComments(id) {
  return fetch(
    `https://dnc-news.herokuapp.com/api/articles/${id}/comments`
  ).then((res) => {
    return res.json();
  });
}

export function updateArticle(id, votes) {
  return fetch(`https://dnc-news.herokuapp.com/api/articles/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ inc_vote: votes })
  });
}

export function sendArticleIdComment(id, username, message) {
  return fetch(`https://dnc-news.herokuapp.com/api/articles/${id}/comments`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      username: username,
      body: message
    })
  });
}

export function deleteCommentById(id) {
  console.log(id);
  axios.delete(`https://dnc-news.herokuapp.com/api/comments/${id}`).then(() => {
    return { msg: 'Comment has been deleted' };
  });
}
