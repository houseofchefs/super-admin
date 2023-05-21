import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const navigate = useNavigate();
  const openDrawer = () => {
    let html = document.querySelector("html");
    html.classList.add("layout-menu-expanded");
  };

  const logout = () => {
    localStorage.removeItem('token');
    navigate('/login')
  }
  return (
    <nav
      className="layout-navbar navbar navbar-expand-xl align-items-center bg-navbar-theme navbar-padding"
      id="layout-navbar"
    >
      <div
        onClick={openDrawer}
        className="layout-menu-toggle navbar-nav align-items-xl-center me-3 me-xl-0 d-xl-none"
      >
        <i className="bx bx-menu bx-sm"></i>
      </div>

      <div
        className="navbar-nav-right d-flex align-items-center"
        id="navbar-collapse"
      >
        <ul className="navbar-nav flex-row align-items-center ms-auto">
          {/* User */}
          <li onClick={() => logout()} className="nav-item navbar-dropdown dropdown-user dropdown">
            <div className="avatar avatar-online d-flex align-items-center">
              <i className="bx bx-power-off ms-2 bx-sm"></i>
            </div>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
