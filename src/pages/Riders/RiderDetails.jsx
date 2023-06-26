import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { EDIT_RIDER } from "../../routes/routes";
import { toast } from "react-toastify";
import BasicDetails from "./template/BasicDetails";
import AssignedOrders from "./template/AssignedOrders";

const RiderDetails = () => {
  const { id } = useParams();
  const [data, setData] = useState({});
  const [tabView, setTabView] = useState("basic_details");

  useEffect(() => {
    axios
      .get(EDIT_RIDER + id)
      .then((res) => {
        if (res.status === 200 && res.data.status) {
          setData(res.data.data);
        }
      })
      .catch((error) => {
        toast.error("Server Error");
      });
  }, [id]);
  return (
    <div className="content-wrapper">
      <div className="container-xxl flex-grow-1 container-p-y">
        <div className="demo-inline-spacing d-flex justify-content-between align-items-center mb-3">
          <h4 className="mb-0">{data?.name}</h4>
          <Link to={"/riders"}>
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
                    Assigned Orders
                  </button>
                </li>
              </ul>
              <div className="tab-content">
                {tabView === "basic_details" && <BasicDetails data={data} />}
                {tabView === "order" && <AssignedOrders data={data} />}
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

export default RiderDetails;
