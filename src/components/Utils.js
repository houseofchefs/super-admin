import axios from "axios";
import React from "react";
import { Navigate, Outlet, Route } from "react-router-dom";
import { baseUrl } from "../routes/routes";
import { ACTIVE } from "../constant/constant";

/**
 * ##Protected Route Components
 * @returns
 */
export const PrivateRoutes = () => {
  const auth = localStorage.getItem("token");
  return auth ? (
    <>
      <Navigate to={"/dashboard"} />
      <Outlet />
    </>
  ) : (
    <Navigate to={"/login"} />
  );
};

export const NewPrivateRoute = ({ children, ...rest }) => {
  const auth = localStorage.getItem("token");
    return (
      <Route {...rest}>
        { auth ? children : <Navigate to="/login" /> }
      </Route>
    )
};  

/**
 * ##Validation Message Handling
 * @param {*} param0
 * @returns
 */
export const ValidationMessage = ({ error, name }) => {
  var message = "";
  if (error.hasOwnProperty(name)) {
    message = error[name][0];
  }
  return <span className="text-danger">{message}</span>;
};

/**
 * ## set default config for axios
 */
export const Axios = axios.create({
  baseURL: baseUrl,
  headers: {
    common: {
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  },
});

/**
 * ## Pagination Component
 * @param {*} param
 * @returns
 */
export const Pagination = ({ paginator, page }) => {
  return (
    <nav aria-label="Page navigation mt-3">
      <ul className="pagination justify-content-end me-3 mt-3">
        <li
          className="page-item prev"
          onClick={() => page(paginator.current - 1)}
        >
          <div className="page-link">
            <i className="tf-icon bx bx-chevrons-left"></i>
          </div>
        </li>
        {Array.apply(null, Array(paginator.last)).map((data, i) => (
          <li
            key={i}
            onClick={() => page(i + 1)}
            className={
              paginator.current === i + 1 ? "page-item active" : "page-item"
            }
          >
            <div className="page-link">{i + 1}</div>
          </li>
        ))}
        <li
          className="page-item next"
          onClick={() => page(paginator.current + 1)}
        >
          <div className="page-link">
            <i className="tf-icon bx bx-chevrons-right"></i>
          </div>
        </li>
      </ul>
    </nav>
  );
};
/**
 * ## set badge class active while data status is Active
 * @param {*} status
 * @returns
 */
export const setBadgeClass = (status) => {
  if (status === ACTIVE) return "badge bg-label-info me-1";
  return "badge bg-label-warning me-1";
};

/**
 * Table Data Not Found means show the message
 * @param {*} param0
 * @returns
 */
export const NoDataFound = ({ front, back, message }) => {
  return (
    <tr>
      <td colSpan={front}> </td>
      <td>{message}</td>
      <td colSpan={back}> </td>
    </tr>
  );
};

/**
 * frame the react select options
 * @param {*} data
 * @param {*} key
 * @param {*} value
 * @returns
 */
export const frameDataOptions = (data, key, value) => {
  if (data.length > 0) {
    return data.map((rs) => ({ value: rs[key], label: rs[value] }));
  }
  return [];
};

/**
 * selected the react-select value pluck
 * @param {*} data
 * @returns
 */
export const pluckValue = (data) => {
  let response = [];
  if (data.length > 0) {
    data.forEach((value) => response.push(value.value));
  }
  return response;
};
