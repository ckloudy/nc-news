import { Link } from 'react-router-dom';
import { Button, Typography } from '@mui/material';
import { Home, SportsSoccer, OutdoorGrill, Code } from '@mui/icons-material';

const Nav = () => {
  return (
    <div className="navbar">
      <div>
        <Typography className="main_title" variant="h2" component="h2">
          Paddington Post
        </Typography>
      </div>
      <div className="nav_all_link">
        <Link to="/">
          <Button variant="contained" color="success">
            <Home className="icon" /> Home
          </Button>
        </Link>
        <Link to="/articles/topics/coding">
          <Button variant="outlined" color="warning">
            <Code className="icon" /> Coding
          </Button>
        </Link>
        <Link to="/articles/topics/cooking">
          <Button variant="outlined" color="warning">
            <OutdoorGrill className="icon" /> Cooking
          </Button>
        </Link>
        <Link to="/articles/topics/football">
          <Button variant="outlined" color="warning">
            <SportsSoccer className="icon" /> Football
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Nav;
