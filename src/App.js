import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ArticleList from './components/ArticleList';
import LoggedInUser from './components/LoggedInUser';
import Nav from './components/Nav';
import FilterArticles from './components/FilterArticles';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Nav />
        {/* <LoggedInUser /> */}
        <Routes>
          <Route path="/" element={<ArticleList />} />
          <Route path="/articles/topics/:topic" element={<FilterArticles />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
