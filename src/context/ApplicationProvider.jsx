import React, { useEffect } from "react";
import ApplicationContext from "./ApplicationContext";
import axios from "axios";
import { baseUrl } from "../routes/routes";

const ApplicationProvider = (props) => {
  useEffect(() => {
    axios.defaults.baseURL = baseUrl;
    axios.interceptors.request.use(
      function (request) {
        // Do something with response data
        request.headers["Authorization"] = `Bearer ${localStorage.getItem("token")}`;
        return request;
      },
      function (error) {
        return Promise.reject(error);
      }
    );
  }, []);
  return (
    <ApplicationContext.Provider>{props.children}</ApplicationContext.Provider>
  );
};

export default ApplicationProvider;
