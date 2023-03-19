import "./header.css";

const Header: React.FC = () => {
  return (
    <nav className="navbar" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <span className="navbar-item">
          <span className="icon">
            <i className="fa-2x fa-brands fa-square-js"></i>
          </span>
          <span className="title">Playground</span>
        </span>
      </div>
    </nav>
  );
};

export default Header;
