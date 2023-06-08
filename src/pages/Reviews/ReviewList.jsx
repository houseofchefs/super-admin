import React, { useEffect, useState } from "react";
import { ADMIN_ORDER_LIST } from "../../routes/routes";
import axios from "axios";
import { NoDataFound, Pagination } from "../../components/Utils";
import { Link } from "react-router-dom";

const ReviewList = () => {
  // ## State Variable Declaration
  const [data, setData] = useState([]);
  const [paginator, setPaginator] = useState({});
  const [page, setPage] = useState(1);

  /**
   * @API Customer List API's call
   */
  useEffect(() => {
    axios
      .get(ADMIN_ORDER_LIST + `?page=${page}`)
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
            <h5>Reviews</h5>
          </div>
          <div className="table-responsive text-nowrap">
            <table className="table">
              <thead>
                <tr>
                  <th>Action</th>
                  <th>Order No</th>
                  <th>Customer Name</th>
                  <th>Kitchen Name</th>
                </tr>
              </thead>
              <tbody className="table-border-bottom-0 reviews-table">
                {data.length > 0 ? (
                  data.map((order, i) => (
                    <tr key={i}>
                      <td>
                        <Link to={`/order/${order.id}/edit`}>
                          <button
                            className="badge bg-label-danger me-1 border-0"
                            data-bs-toggle="tooltip"
                            data-bs-offset="0,4"
                            data-bs-placement="top"
                            data-bs-html="true"
                            title="Edit"
                            data-bs-original-title="Edit"
                          >
                            <i className="bx bx-trash"></i>
                          </button>
                        </Link>
                      </td>
                      <td>{order?.order_no}</td>
                      <td>{order?.customers?.name}</td>
                      <td>{order?.vendor?.name}</td>
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
      <div
        className="modal fade reviews-modal"
        id="modalCenter"
        tabIndex="-1"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-body">
              <div className="row">
                <div className="col-6 mb-3">
                  <label htmlFor="nameWithTitle" className="form-label">
                    Rate your Cook
                  </label>
                  <ul>
                    <li>
                      <i className="bx bxs-star"></i>
                    </li>
                    <li>
                      <i className="bx bxs-star"></i>
                    </li>
                    <li>
                      <i className="bx bxs-star"></i>
                    </li>
                    <li>
                      <i className="bx bxs-star"></i>
                    </li>
                    <li>
                      <i className="bx bxs-star"></i>
                    </li>
                  </ul>
                </div>
                <div className="col-6 mb-3">
                  <label htmlFor="nameWithTitle" className="form-label">
                    Rate Your Thosai
                  </label>
                  <ul>
                    <li>
                      <i className="bx bxs-star"></i>
                    </li>
                    <li>
                      <i className="bx bxs-star"></i>
                    </li>
                    <li>
                      <i className="bx bxs-star"></i>
                    </li>
                    <li>
                      <i className="bx bxs-star"></i>
                    </li>
                    <li>
                      <i className="bx bxs-star"></i>
                    </li>
                  </ul>
                </div>
                <div className="col-6 mb-3">
                  <label htmlFor="nameWithTitle" className="form-label">
                    Rate Your Chapati
                  </label>
                  <ul>
                    <li>
                      <i className="bx bxs-star"></i>
                    </li>
                    <li>
                      <i className="bx bxs-star"></i>
                    </li>
                    <li>
                      <i className="bx bxs-star"></i>
                    </li>
                    <li>
                      <i className="bx bxs-star"></i>
                    </li>
                    <li>
                      <i className="bx bxs-star"></i>
                    </li>
                  </ul>
                </div>
                <div className="col-6 mb-3">
                  <label htmlFor="nameWithTitle" className="form-label">
                    Rate Your Kichan
                  </label>
                  <ul>
                    <li>
                      <i className="bx bxs-star"></i>
                    </li>
                    <li>
                      <i className="bx bxs-star"></i>
                    </li>
                    <li>
                      <i className="bx bxs-star"></i>
                    </li>
                    <li>
                      <i className="bx bxs-star"></i>
                    </li>
                    <li>
                      <i className="bx bxs-star"></i>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-outline-secondary rounded-pill"
                data-bs-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="content-backdrop fade"></div>
    </div>
  );
};

export default ReviewList;
