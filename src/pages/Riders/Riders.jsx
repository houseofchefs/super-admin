import React, { useEffect, useState } from "react";
import { NoDataFound, Pagination, setBadgeClass } from "../../components/Utils";
import { Link } from "react-router-dom";
import { RIDER } from "../../routes/routes";
import axios from "axios";

const Riders = () => {
  // ## State Variable Declaration
  const [data, setData] = useState([]);
  const [paginator, setPaginator] = useState({});
  const [page, setPage] = useState(1);

  /**
   * @API Customer List API's call
   */
  useEffect(() => {
    axios.get(RIDER + `?page=${page}`).then((response) => {
      if (
        response.status === 200 &&
        response.data.status &&
        response.data.data.data.length > 0
      ) {
        setData(response.data.data.data);
        setPaginator({
          prev: response.data.data.prev_page_url != null,
          next: response.data.data.next_page_url != null,
          total: response.data.data.total,
          current: response.data.data.current_page,
          last: response.data.data.last_page,
        });
      }
    });
  }, [page]);
  return (
    <div className="content-wrapper">
      <div className="container-xxl flex-grow-1 container-p-y">
        <div className="card">
          <div className="card-header">
            <h5>Rider List</h5>
            <Link to={"/rider/create"}>
              <button type="button" className="btn rounded-pill btn-primary">
                <span className="tf-icons bx bx-plus"></span>&nbsp; Add
              </button>
            </Link>
          </div>
          <div className="table-responsive text-nowrap">
            <table className="table">
              <thead>
                <tr>
                  <th>Action</th>
                  <th>Name</th>
                  <th>Mobile</th>
                  <th>Vehicle</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody className="table-border-bottom-0">
                {data.length > 0 ? (
                  data.map((rider, i) => (
                    <tr key={i}>
                      <td>
                        <Link to={`/rider/${rider.id}/edit`}>
                          <button
                            className="badge bg-label-success me-1 border-0"
                            data-bs-toggle="tooltip"
                            data-bs-offset="0,4"
                            data-bs-placement="top"
                            data-bs-html="true"
                            title="Edit"
                            data-bs-original-title="Edit"
                          >
                            <i className="bx bx-pencil"></i>
                          </button>
                        </Link>
                      </td>
                      <td>{rider?.name}</td>
                      <td>{rider?.mobile}</td>
                      <td>{rider?.vehicle?.reg_no}</td>
                      <td>
                        <span
                          className={setBadgeClass(rider?.status?.module_name)}
                        >
                          {rider?.status?.module_name}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <NoDataFound front="3" back="3" message="No Data Found" />
                )}
              </tbody>
            </table>
          </div>
          {/* Pagination Component */}
          {data.length > 0 && (
            <Pagination paginator={paginator} page={(no) => setPage(no)} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Riders;
