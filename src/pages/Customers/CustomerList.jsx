import axios from "axios";
import React, { useEffect, useState } from "react";
import { CUSTOMER_LIST } from "../../routes/routes";
import { PAGINATE } from "../../constant/constant";
import { NoDataFound, Pagination } from "../../components/Utils";
import { Link } from "react-router-dom";

const CustomerList = () => {
  // ## State Variable Declaration
  const [data, setData] = useState([]);
  const [paginator, setPaginator] = useState({});
  const [page, setPage] = useState(1);

  /**
   * @API Customer List API's call
   */
  useEffect(() => {
    axios
      .get(CUSTOMER_LIST + `?type=${PAGINATE}&page=${page}`)
      .then((response) => {
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
            <h5>Customer List</h5>
            <Link to={"/customer/create"}>
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
                </tr>
              </thead>
              <tbody className="table-border-bottom-0">
                {data.length > 0 ? (
                  data.map((customer, i) => (
                    <tr key={i}>
                      <td>
                        <Link to={`/customer/${customer.id}/edit`}>
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
                      <td>{customer?.name}</td>
                      <td>{customer?.mobile}</td>
                    </tr>
                  ))
                ) : (
                  <NoDataFound front="2" back="2" message="No Data Found" />
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

export default CustomerList;
