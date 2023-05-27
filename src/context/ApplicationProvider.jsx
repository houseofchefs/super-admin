import React, { Component } from "react";
import ApplicationContext from "./ApplicationContext";
import axios from "axios";
import { baseUrl } from "../routes/routes";

export default class ApplicationProvider extends Component {
  // Life-Cycle Methods
  componentDidMount() {
    axios.defaults.baseURL = baseUrl;
    axios.interceptors.request.use(
      function (request) {
        // Do something with response data
        request.headers["Authorization"] = `Bearer ${localStorage.getItem(
          "token"
        )}`;
        return request;
      },
      function (error) {
        return Promise.reject(error);
      }
    );
  }

  render() {
    return (
      <ApplicationContext.Provider value={{ auth: true }}>
        {this.props.children}
      </ApplicationContext.Provider>
    );
  }
}
