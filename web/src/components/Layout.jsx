import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import "../assets/mainLayout.css";

const Layout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to log out?");
    if (confirmLogout) {
      localStorage.removeItem("accessToken");
      navigate("/login");
    }
  };

  return (
    <div className="layout-wrapper">
      <header className="main-header">
        <div className="header-container">
          <Link to="/" className="header-logo-container">
            <img
              src="/myskill-icon-header.png"
              alt="MySkill Logo"
              className="header-logo"
            />
            <span className="header-brand">MySkill</span>
          </Link>

          <nav className="header-nav">
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
            >
              Home
            </NavLink>

            <NavLink
              to="/profile"
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
            >
              Profile
            </NavLink>

            <button onClick={handleLogout} className="nav-btn-logout">
              Log Out
            </button>
          </nav>
        </div>
      </header>

      <main className="layout-content">
        <Outlet />
      </main>

      <footer className="main-footer">
        <div className="footer-container">
          <p className="footer-copyright">
            © {new Date().getFullYear()} MySkill. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
