import { Link } from "react-router-dom";
import Logo from "../../assets/images/logo.png";

const Sidebar = () => {
  const closeDrawer = () => {
    let html = document.querySelector("html");
    html.classList.remove("layout-menu-expanded");
  };

  return (
    <aside
      id="layout-menu"
      className="layout-menu menu-vertical menu bg-menu-theme"
    >
      <div className="app-brand demo">
        <a href="/" className="app-brand-link">
          <span className="app-brand-text demo menu-text fw-bolder ms-2">
            <img src={Logo} alt="" />
          </span>
        </a>

        <div
          className="layout-menu-toggle menu-link text-large ms-auto d-block d-xl-none"
          onClick={closeDrawer}
        >
          <i className="bx bx-chevron-left bx-sm align-middle"></i>
        </div>
      </div>

      <div className="menu-inner-shadow"></div>

      <ul className="menu-inner py-1">
        <li className="menu-item">
          <Link className="menu-link" to="/">
            <i className="menu-icon tf-icons bx bx-home-circle"></i>
            <div data-i18n="Analytics">Dashboard</div>
          </Link>
        </li>
        <li className="menu-item">
          <a href="/" className="menu-link">
            <i className="menu-icon tf-icons bx bx-copy-alt"></i>
            <div data-i18n="Analytics">Banner</div>
          </a>
        </li>
        <li className={"menu-item"}>
          <Link className={"menu-link"} to="vendors">
            <i className="menu-icon tf-icons bx bx-group"></i>
            <div data-i18n="Analytics">Vendors</div>
          </Link>
        </li>
        <li className={"menu-item"}>
          <Link className="menu-link" to="categories">
            <i className="menu-icon tf-icons bx bx-hive"></i>
            <div data-i18n="Analytics">Category</div>
          </Link>
        </li>
        <li className="menu-item">
          <a href="/" className="menu-link">
            <i className="menu-icon tf-icons bx bx-home-smile"></i>
            <div data-i18n="Analytics">Orders</div>
          </a>
        </li>
        <li className="menu-item">
          <a href="/" className="menu-link">
            <i className="menu-icon tf-icons bx bx-user"></i>
            <div data-i18n="Analytics">Customers</div>
          </a>
        </li>
        <li className="menu-item">
          <Link className="menu-link" to="discounts">
            <i className="menu-icon tf-icons bx bx-happy"></i>
            <div data-i18n="Analytics">Discount</div>
          </Link>
        </li>
        <li className="menu-item">
          <a href="/" className="menu-link">
            <i className="menu-icon tf-icons bx bx-message-detail"></i>
            <div data-i18n="Analytics">Reviews</div>
          </a>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
