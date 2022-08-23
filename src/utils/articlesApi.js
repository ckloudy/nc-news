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
