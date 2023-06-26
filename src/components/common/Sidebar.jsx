import { Link, matchPath, useLocation } from "react-router-dom";
import Logo from "../../assets/images/logo.png";
import { useEffect } from "react";

const Sidebar = () => {
  const closeDrawer = () => {
    let html = document.querySelector("html");
    html.classList.remove("layout-menu-expanded");
  };

  const isParentPath = (url) =>
    matchPath(url, window.location.pathname) != null;
  const location = useLocation();
  /**
   * #sidebar list active
   * @returns boolean
   */
  const vendorRoutes = () =>
    isParentPath("/vendors") ||
    isParentPath("vendor/:id/view") ||
    isParentPath("vendor/:id/edit");

  /**
   * #sidebar list active
   * @returns boolean
   */
  const categoryRoutes = () =>
    isParentPath("/categories") ||
    isParentPath("categories/:id/view") ||
    isParentPath("categories/create") ||
    isParentPath("categories/:id/edit");

  const dashboardRoute = () => isParentPath("/");

  const customerRoutes = () =>
    isParentPath("/customers") ||
    isParentPath("/customer/create") ||
    isParentPath("/customer/:id/edit");

  const discountRoutes = () =>
    isParentPath("/discounts") ||
    isParentPath("/create/discount") ||
    isParentPath("/discount/:id/edit");

  const adminRoutes = () =>
    isParentPath("/admin") ||
    isParentPath("/create/admin") ||
    isParentPath("/admin/:id/edit");

  const orderRoutes = () =>
    isParentPath("/orders") || isParentPath("/create/order");

  const riderRoutes = () =>
    isParentPath("/riders") ||
    isParentPath("/rider/create") ||
    isParentPath("/rider/:id/edit");

  useEffect(() => {}, [location]);
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
        <li className={dashboardRoute() ? "menu-item active" : "menu-item"}>
          <Link className="menu-link" to="/">
            <i className="menu-icon tf-icons bx bx-home-circle"></i>
            <div data-i18n="Analytics">Dashboard</div>
          </Link>
        </li>
        <li className={adminRoutes() ? "menu-item active" : "menu-item"}>
          <Link className="menu-link" to={"admin"}>
            <i className="menu-icon tf-icons bx bx-copy-alt"></i>
            <div data-i18n="Analytics">Admin</div>
          </Link>
        </li>
        <li className={vendorRoutes() ? "menu-item active" : "menu-item"}>
          <Link className={"menu-link"} to="vendors">
            <i className="menu-icon tf-icons bx bx-group"></i>
            <div data-i18n="Analytics">Vendors</div>
          </Link>
        </li>
        <li className={categoryRoutes() ? "menu-item active" : "menu-item"}>
          <Link className="menu-link" to="categories">
            <i className="menu-icon tf-icons bx bx-hive"></i>
            <div data-i18n="Analytics">Category</div>
          </Link>
        </li>
        <li className={orderRoutes() ? "menu-item active" : "menu-item"}>
          <Link className="menu-link" to="orders">
            <i className="menu-icon tf-icons bx bx-home-smile"></i>
            <div data-i18n="Analytics">Orders</div>
          </Link>
        </li>
        <li className={customerRoutes() ? "menu-item active" : "menu-item"}>
          <Link className="menu-link" to="customers">
            <i className="menu-icon tf-icons bx bx-user"></i>
            <div data-i18n="Analytics">Customers</div>
          </Link>
        </li>
        {/* <li className={riderRoutes() ? "menu-item active" : "menu-item"}>
          <Link className="menu-link" to="riders">
            <i className="menu-icon tf-icons bx bx-user"></i>
            <div data-i18n="Analytics">Riders</div>
          </Link>
        </li> */}
        <li className={discountRoutes() ? "menu-item active" : "menu-item"}>
          <Link className="menu-link" to="discounts">
            <i className="menu-icon tf-icons bx bx-happy"></i>
            <div data-i18n="Analytics">Discount</div>
          </Link>
        </li>
        <li
          className={
            isParentPath("/reviews") ? "menu-item active" : "menu-item"
          }
        >
          <Link className="menu-link" to="reviews">
            <i className="menu-icon tf-icons bx bx-message-detail"></i>
            <div data-i18n="Analytics">Reviews</div>
          </Link>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
