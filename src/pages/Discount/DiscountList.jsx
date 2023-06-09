import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { DISCOUNT_LIST } from "../../routes/routes";
import { PAGINATE } from "../../constant/constant";
import { NoDataFound, Pagination, setBadgeClass } from "../../components/Utils";
import moment from "moment";

const DiscountList = () => {
  // ## State Variable Declaration
  const [data, setData] = useState([]);
  const [paginator, setPaginator] = useState({});
  const [page, setPage] = useState(1);

  useEffect(() => {
    axios
      .get(DISCOUNT_LIST + `?type=${PAGINATE}&page=${page}`)
      .then((response) => {
        console.log(response);
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
            <h5>Discount</h5>
            <Link to={"/create/discount"}>
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
                  <th>Discount Name</th>
                  <th>Vendor Name</th>
                  <th>Type</th>
                  <th>Category</th>
                  <th>Percentage</th>
                  <th>Expired At</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody className="table-border-bottom-0">
                {data.length > 0 ? (
                  data.map((discount, i) => (
                    <tr key={i}>
                      <td>
                        <Link to={`/discount/${discount.id}/edit`}>
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
                      <td>{discount?.name}</td>
                      <td>
                        {discount?.vendor_id === 0
                          ? "All"
                          : discount?.vendor?.name}
                      </td>
                      <td>{discount?.type?.module_name}</td>
                      <td>
                        {discount?.category_id === 0
                          ? "All"
                          : discount?.category?.name}
                      </td>
                      <td>{discount?.percentage}</td>
                      <td>
                        {moment(discount?.expire_at).format(
                          "YYYY-MM-DD h:mm A"
                        )}
                      </td>
                      <td>
                        <span
                          className={setBadgeClass(
                            discount?.status?.module_name
                          )}
                        >
                          {discount?.status?.module_name}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <NoDataFound front="4" back="4" message="No Data Found" />
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
      <div className="content-backdrop fade"></div>
    </div>
  );
};

export default DiscountList;
