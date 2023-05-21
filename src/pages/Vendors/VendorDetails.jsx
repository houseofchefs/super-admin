import React, { useState } from "react";
import { Link } from "react-router-dom";
import Menus from "./template/Menus";
import BasicDetails from "./template/BasicDetails";
import Product from "./template/Product";
import Staff from "./template/Staff";
import Orders from "./template/Orders";

const VendorDetails = () => {
  const [tabView, setTabView] = useState("basic_details");
  return (
    <div className="content-wrapper">
      <div className="container-xxl flex-grow-1 container-p-y">
        <div className="demo-inline-spacing d-flex justify-content-end mb-3">
          <Link to={"/vendors"}>
            <button type="button" className="btn btn-dark rounded-pill">
              <i className="bx bx-exit"></i> back
            </button>
          </Link>
        </div>
        <div className="row">
          <div className="col-xl-12">
            <div className="nav-align-top mb-4">
              <ul className="nav nav-pills mb-3" role="tablist">
                <li className="nav-item">
                  <button
                    type="button"
                    className={
                      tabView === "basic_details"
                        ? "nav-link active"
                        : "nav-link"
                    }
                    role="tab"
                    data-bs-toggle="tab"
                    data-bs-target="#navs-pills-top-home"
                    aria-controls="navs-pills-top-home"
                    aria-selected="false"
                    onClick={() => setTabView("basic_details")}
                  >
                    Basic Details
                  </button>
                </li>
                <li className="nav-item">
                  <button
                    type="button"
                    className={
                      tabView === "order" ? "nav-link active" : "nav-link"
                    }
                    role="tab"
                    data-bs-toggle="tab"
                    data-bs-target="#navs-pills-top-messages-three"
                    aria-controls="navs-pills-top-messages-three"
                    aria-selected="true"
                    onClick={() => setTabView("order")}
                  >
                    Orders
                  </button>
                </li>
                <li className="nav-item">
                  <button
                    type="button"
                    className={
                      tabView === "menus" ? "nav-link active" : "nav-link"
                    }
                    role="tab"
                    data-bs-toggle="tab"
                    data-bs-target="#navs-pills-top-profile"
                    aria-controls="navs-pills-top-profile"
                    aria-selected="false"
                    onClick={() => setTabView("menus")}
                  >
                    Menu
                  </button>
                </li>
                <li className="nav-item">
                  <button
                    type="button"
                    className={
                      tabView === "products" ? "nav-link active" : "nav-link"
                    }
                    role="tab"
                    data-bs-toggle="tab"
                    data-bs-target="#navs-pills-top-messages"
                    aria-controls="navs-pills-top-messages"
                    aria-selected="true"
                    onClick={() => setTabView("products")}
                  >
                    Product
                  </button>
                </li>
                <li className="nav-item">
                  <button
                    type="button"
                    className={
                      tabView === "staff" ? "nav-link active" : "nav-link"
                    }
                    role="tab"
                    data-bs-toggle="tab"
                    data-bs-target="#navs-pills-top-messages-three"
                    aria-controls="navs-pills-top-messages-three"
                    aria-selected="true"
                    onClick={() => setTabView("staff")}
                  >
                    Staff
                  </button>
                </li>                
              </ul>
              <div className="tab-content">
                {tabView === "basic_details" && <BasicDetails />}
                {tabView === "menus" && <Menus />}
                {tabView === "products" && <Product />}
                {tabView === "staff" && <Staff />}
                {tabView === "order" && <Orders />}
                <div
                  className="tab-pane fade"
                  id="navs-pills-top-messages-one"
                  role="tabpanel"
                >
                  <div className="misc-wrapper text-center">
                    <h2 className="mb-2 mx-2">Comming Soon!</h2>
                    <div className="mt-4">
                      <img
                        src="https://k-ramanathan.github.io/hoc-admin-dashboard/assets/img/illustrations/girl-doing-yoga-light.png"
                        alt="girl-doing-yoga-light"
                        width="500"
                        className="img-fluid"
                        data-app-dark-img="illustrations/girl-doing-yoga-dark.png"
                        data-app-light-img="illustrations/girl-doing-yoga-light.png"
                      />
                    </div>
                  </div>
                </div>
                <div
                  className="tab-pane fade"
                  id="navs-pills-top-messages-two"
                  role="tabpanel"
                >
                  <div className="misc-wrapper text-center">
                    <h2 className="mb-2 mx-2">Comming Soon!</h2>
                    <div className="mt-4">
                      <img
                        src="https://k-ramanathan.github.io/hoc-admin-dashboard/assets/img/illustrations/girl-doing-yoga-light.png"
                        alt="girl-doing-yoga-light"
                        width="500"
                        className="img-fluid"
                        data-app-dark-img="illustrations/girl-doing-yoga-dark.png"
                        data-app-light-img="illustrations/girl-doing-yoga-light.png"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-12"></div>
        </div>
      </div>

      <div className="content-backdrop fade"></div>
    </div>
  );
};

export default VendorDetails;
