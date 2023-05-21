import React from "react";

const DiscountList = () => {
  return (
    <div className="content-wrapper">
      <div className="container-xxl flex-grow-1 container-p-y">
        <div className="card">
          <div className="card-header">
            <h5>Discount</h5>
            <a href="discount-details.html">
              <button type="button" className="btn rounded-pill btn-primary">
                <span className="tf-icons bx bx-plus"></span>&nbsp; Add
              </button>
            </a>
          </div>
          <div className="table-responsive text-nowrap">
            <table className="table">
              <thead>
                <tr>
                  <th>Action</th>
                  <th>Discount Name</th>
                  <th>Cook Name</th>
                  <th>Type</th>
                  <th>Category</th>
                  <th>Percentage</th>
                  <th>Expired At</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody className="table-border-bottom-0">
                <tr>
                  <td>
                    <a href="discount-details.html">
                      <span className="badge bg-label-success me-1">
                        <i className="bx bx-show"></i>
                      </span>
                    </a>
                  </td>
                  <td>Good Friday</td>
                  <td>John Doe</td>
                  <td>Discount</td>
                  <td>Category 01</td>
                  <td>20</td>
                  <td>26/04/2023</td>
                  <td>
                    <span className="badge bg-label-warning me-1">Inactive</span>
                  </td>
                </tr>
                <tr>
                  <td>
                    <a href="discount-view.html">
                      <span className="badge bg-label-success me-1">
                        <i className="bx bx-show"></i>
                      </span>
                    </a>
                  </td>
                  <td>Ramzan Eid</td>
                  <td>Barry Doe</td>
                  <td>Offer</td>
                  <td>Category 02</td>
                  <td>20</td>
                  <td>25/04/2023</td>
                  <td>
                    <span className="badge bg-label-info me-1">active</span>
                  </td>
                </tr>
                <tr>
                  <td>
                    <a href="discount-view.html">
                      <span className="badge bg-label-success me-1">
                        <i className="bx bx-show"></i>
                      </span>
                    </a>
                  </td>
                  <td>Diwali</td>
                  <td>Charles Doe</td>
                  <td>Coupon</td>
                  <td>Category 03</td>
                  <td>20</td>
                  <td>22/04/2023</td>
                  <td>
                    <span className="badge bg-label-info me-1">active</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="content-backdrop fade"></div>
    </div>
  );
};

export default DiscountList;
