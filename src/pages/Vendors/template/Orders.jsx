import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { NoDataFound, Pagination } from "../../../components/Utils";
import { ORDER_LIST, ORDER_NEXT_ACTION } from "../../../routes/routes";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import axios from "axios";

const Orders = () => {
  const { id } = useParams();
  const [code, setCode] = useState("OS01");
  const [data, setData] = useState([]);
  const [paginator, setPaginator] = useState({});
  const [page, setPage] = useState(1);
  const [detailsModal, setDetailModal] = useState(false);
  const [detailData, setDetailData] = useState({});
  const [count, setCount] = useState(0);

  const nextAction = (id, code) => {
    axios.get(ORDER_NEXT_ACTION + `${id}/${code}`).then((response) => {
      if (response.status === 200 && response.data.status) {
        toast.success(response.data.msg);
        setDetailModal(false);
        setCount(count + 1);
      }
    });
  };

  useEffect(() => {
    axios.get(ORDER_LIST + `${id}/${code}?page=${page}`)
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
      })
      .catch((error) => {
        toast.error("Server Error");
      });
  }, [id, code, page, count]);
  return (
    <div
      className="tab-pane fade active show"
      id="navs-pills-top-home"
      role="tabpanel"
    >
      <div className="mb-4">
        <div className="nav-align-top mb-4">
          <ul className="nav nav-pills mb-3" role="tablist">
            <li className="nav-item">
              <button
                type="button"
                className={code === "OS01" ? "nav-link active" : "nav-link"}
                onClick={() => {
                  setCode("OS01");
                  setData([]);
                  setPage(1);
                }}
              >
                Pending
              </button>
            </li>
            <li className="nav-item">
              <button
                type="button"
                className={code === "OS02" ? "nav-link active" : "nav-link"}
                onClick={() => {
                  setCode("OS02");
                  setData([]);
                  setPage(1);
                }}
              >
                Progress
              </button>
            </li>
            <li className="nav-item">
              <button
                type="button"
                className={code === "OS03" ? "nav-link active" : "nav-link"}
                onClick={() => {
                  setCode("OS03");
                  setData([]);
                  setPage(1);
                }}
              >
                Canceled
              </button>
            </li>
            <li className="nav-item">
              <button
                type="button"
                className={code === "OS04" ? "nav-link active" : "nav-link"}
                onClick={() => {
                  setCode("OS04");
                  setData([]);
                  setPage(1);
                }}
              >
                Delivered
              </button>
            </li>
          </ul>
        </div>
        <div className="table-responsive text-nowrap">
          <table className="table">
            <thead>
              <tr>
                <th>Action</th>
                <th>Order No</th>
                <th>Customer Name</th>
                <th>Item Count</th>
                <th>Price</th>
                <th>Order At</th>
                <th>Instructions</th>
                <th>Payment Method</th>
                <th>Payment Status</th>
              </tr>
            </thead>
            <tbody className="table-border-bottom-0">
              {data.length > 0 ? (
                data.map((order, i) => (
                  <tr key={i}>
                    <td>
                      <span
                        onClick={() => {
                          setDetailModal(true);
                          setDetailData(order);
                        }}
                        className="badge bg-label-success me-1"
                      >
                        <i className="bx bx-show"></i>
                      </span>
                    </td>
                    <td>{order.order_no}</td>
                    <td>{order?.customers?.name}</td>
                    <td>{order?.item_count}</td>
                    <td>{order?.price}</td>
                    <td>{order?.order_at}</td>
                    <td>{order?.instructions}</td>
                    <td>{order?.payments?.method?.module_name}</td>
                    <td>{order?.payments?.status?.module_name}</td>
                  </tr>
                ))
              ) : (
                <NoDataFound front="5" back="4" message="No Data Found" />
              )}
            </tbody>
          </table>
        </div>
        {/* Pagination Component */}
        {data.length > 0 && (
          <Pagination paginator={paginator} page={(no) => setPage(no)} />
        )}
      </div>
      <Modal
        show={detailsModal}
        size="xl"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Body>
          <div className="tab-content">
            <div
              className="tab-pane fade active show"
              id="navs-pills-top-home"
              role="tabpanel"
            >
              <div className="mb-4">
                <div className="card-header d-flex justify-content-between align-items-center">
                  <h5 className="mb-0">Order Details</h5>
                </div>
                <div className="card-body py-0">
                  <form>
                    <div className="row">
                      <div className="col-md-4">
                        <div className="mb-4">
                          <label
                            className="form-label m-0"
                            htmlFor="basic-default-fullname"
                          >
                            Order No
                          </label>
                          <span className="d-block font-weight-600">
                            {detailData.order_no}
                          </span>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="mb-3">
                          <label
                            className="form-label m-0"
                            htmlFor="basic-default-fullname"
                          >
                            Customer Name
                          </label>
                          <span className="d-block font-weight-600">
                            {detailData?.customers?.name}
                          </span>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="mb-3">
                          <label
                            className="form-label m-0"
                            htmlFor="basic-default-fullname"
                          >
                            Delivery Location
                          </label>
                          <span className="d-block font-weight-600">
                            {detailData?.address?.address_line}
                          </span>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="mb-4">
                          <label
                            className="form-label m-0"
                            htmlFor="basic-default-fullname"
                          >
                            Order At
                          </label>
                          <span className="d-block font-weight-600">
                            {detailData.order_at}
                          </span>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="mb-3">
                          <label
                            className="form-label m-0"
                            htmlFor="basic-default-fullname"
                          >
                            Item Count
                          </label>
                          <span className="d-block font-weight-600">
                            {detailData?.item_count}
                          </span>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="mb-3">
                          <label
                            className="form-label m-0"
                            htmlFor="basic-default-fullname"
                          >
                            Total Amount
                          </label>
                          <span className="d-block font-weight-600">
                            {detailData?.price}
                          </span>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="mb-3">
                          <label
                            className="form-label m-0"
                            htmlFor="basic-default-fullname"
                          >
                            Discount
                          </label>
                          <span className="d-block font-weight-600">
                            {detailData?.discount} %
                          </span>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="mb-3">
                          <label
                            className="form-label m-0"
                            htmlFor="basic-default-fullname"
                          >
                            Rider Name
                          </label>
                          <span className="d-block font-weight-600">NA</span>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="mb-3">
                          <label
                            className="form-label m-0"
                            htmlFor="basic-default-fullname"
                          >
                            Instructions
                          </label>
                          <span className="d-block font-weight-600">
                            {detailData?.instructions}
                          </span>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="mb-3">
                          <label
                            className="form-label m-0"
                            htmlFor="basic-default-fullname"
                          >
                            Payment Method
                          </label>
                          <span className="d-block font-weight-600">
                            {detailData?.payments?.payment_method}
                          </span>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="mb-3">
                          <label
                            className="form-label m-0"
                            htmlFor="basic-default-fullname"
                          >
                            Payment Status
                          </label>
                          <span className="d-block font-weight-600">
                            {detailData?.payments?.status?.module_name}
                          </span>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="mb-3">
                          <label
                            className="form-label m-0"
                            htmlFor="basic-default-fullname"
                          >
                            Order Status
                          </label>
                          <span className="d-block font-weight-600">
                            {detailData?.status?.module_name}
                          </span>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
                <div className="card-header d-flex justify-content-between align-items-center">
                  <h5 className="mb-0">Menu Details</h5>
                  {code === "OS01" && (
                    <button
                      type="button"
                      className="btn btn-sm btn-success rounded-pill"
                      data-bs-dismiss="modal"
                      onClick={() => nextAction(detailData.id, "OS02")}
                    >
                      Accept
                    </button>
                  )}
                  {code === "OS02" && (
                    <div>
                      <button
                        type="button"
                        className="btn btn-sm btn-secondary me-2 rounded-pill"
                        data-bs-dismiss="modal"
                        onClick={() => nextAction(detailData.id, "OS03")}
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        className="btn btn-sm btn-primary rounded-pill"
                        data-bs-dismiss="modal"
                        onClick={() => nextAction(detailData.id, "OS04")}
                      >
                        Delivery
                      </button>
                    </div>
                  )}
                </div>
                <div className="table-responsive text-nowrap">
                  <table className="table">
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Quantity</th>
                      </tr>
                    </thead>
                    <tbody className="table-border-bottom-0">
                      {detailData.hasOwnProperty("details") &&
                        detailData?.details.length > 0 &&
                        detailData?.details.map((detail, i) => (
                          <tr key={i}>
                            <td>{detail?.menu?.name}</td>
                            <td>{detail?.menu?.price}</td>
                            <td>{detail?.quantity}</td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button
            type="button"
            className="btn btn-primary rounded-pill"
            data-bs-dismiss="modal"
            onClick={() => setDetailModal(false)}
          >
            Close
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Orders;
