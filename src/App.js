import './App.css';
import ArticleList from './components/ArticleList';
import LoggedInUser from './components/LoggedInUser';
import Nav from './components/Nav';

function App() {
  return (
    <div className="App">
      <Nav />
      <LoggedInUser />
      <ArticleList />
    </div>
  );
}

export default App;
