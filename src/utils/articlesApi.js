export function getArticles() {
  return fetch('https://dnc-news.herokuapp.com/api/articles').then((res) => {
    return res.json();
  });
}

export function getArticlesByTopic(topic) {
  return fetch(
    `https://dnc-news.herokuapp.com/api/articles?topic=${topic}`
  ).then((res) => {
    return res.json();
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
