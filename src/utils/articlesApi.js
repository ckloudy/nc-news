export function getArticles() {
  return fetch('https://dnc-news.herokuapp.com/api/articles').then((res) => {
    return res.json();
  });
}
