import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ArticleList from './components/ArticleList';
import Nav from './components/Nav';
import FilterArticles from './components/FilterArticles';
import SingleFullArticle from './components/SingleFullArticle';
import { UserContext } from './contexts/UserContext';
import { useState } from 'react';

function App() {
  const [ user, setUser ] = useState({
    name: 'Jess',
    username: 'jessjelly'
  });
  return (
    <UserContext.Provider value={{ user, setUser }}>
      <BrowserRouter>
        <div className="App">
          <Nav />
          <Routes>
            <Route path="/" element={<ArticleList />} />
            <Route
              path="/articles/topics/:topic"
              element={<FilterArticles />}
            />
            <Route
              path="/articles/topics/:topic/article-:id"
              element={<SingleFullArticle />}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
