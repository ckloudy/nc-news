import { Link } from 'react-router-dom';

const Nav = () => {
  return (
    <div className="navbar">
      <div>
        <h2>Paddington Post</h2>
      </div>
      <div className="nav_all_link">
        <Link className="nav_link" id="home" to="/">
          Home
        </Link>
        <Link className="nav_link" to="/articles/topics/coding">
          Coding
        </Link>
        <Link className="nav_link" to="/articles/topics/cooking">
          Cooking
        </Link>
        <Link className="nav_link" to="/articles/topics/football">
          Football
        </Link>
      </div>
    </div>
  );
};

export default Nav;
