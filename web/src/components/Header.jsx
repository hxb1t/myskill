import { Link } from "react-router-dom";
import "../assets/header.css";
import { logout } from "../services/api";

const Header = () => {
  return (
    <header className="header">
      <div className="brand">
        <span className="brand-icon">🛒</span>
        MySkill
      </div>
      <nav className="nav">
        <Link to="/profile" onClick={logout}>
          Logout
        </Link>
      </nav>
    </header>
  );
};

export default Header;
