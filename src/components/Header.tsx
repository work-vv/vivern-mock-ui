import { Link } from 'react-router-dom';
import './header.scss';

const Header = () => {
  return (
    <header className="header">
      <nav>
        <Link to="/">Home</Link>
        <Link to="/projects">Projects</Link>
      </nav>
    </header>
  );
};
export default Header;
