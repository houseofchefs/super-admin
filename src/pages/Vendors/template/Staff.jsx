import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  NoDataFound,
  Pagination,
  ValidationMessage,
} from "../../../components/Utils";
import {
  CREATE_STAFF,
  STAFF_ACTIVE,
  STAFF_INACTIVE,
  STAFF_LIST,
} from "../../../routes/routes";
import Modal from "react-bootstrap/Modal";
import Select from "react-select";
import { ROLES_STAFF, VALIDATION_ERROR } from "../../../constant/constant";
import { toast } from "react-toastify";
import axios from "axios";

const Staff = () => {
  // ## State Variable Declaration
  const [data, setData] = useState([]);
  const [paginator, setPaginator] = useState({});
  const [page, setPage] = useState(1);
  const [createStaffModal, setCreateStaffModal] = useState(false);
  const [errors, setErrors] = useState([]);
  const [count, setCount] = useState(0);
  const { id } = useParams();
  const [form, setForm] = useState({
    vendor_id: id,
  });

  const createStaff = () => {
    axios.post(CREATE_STAFF, form)
      .then((response) => {
        if (response.status === 201 && response.data.status) {
          toast.success(response.data.msg);
          setCount(count + 1);
          setErrors([]);
          setCreateStaffModal(false);
          setForm({
            vendor_id: id,
          });
        }
      })
      .catch((err) => {
        if (err.response.status === 422) {
          const error = err.response.data.error;
          setErrors(error);
          toast.error(VALIDATION_ERROR);
        }
      });
  };

  const setStaffActive = (id) => {
    axios.get(STAFF_ACTIVE + id).then((response) => {
      if (response.status === 200 && response.data.status) {
        toast.success(response.data.msg);
        setCount(count + 1);
      }
    });
  };

  const setStaffInActive = (id) => {
    axios.get(STAFF_INACTIVE + id).then((response) => {
      if (response.status === 200 && response.data.status) {
        toast.success(response.data.msg);
        setCount(count + 1);
      }
    });
  };

  useEffect(() => {
    axios.get(STAFF_LIST + `${id}?page=${page}`).then((response) => {
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
  }, [page, id, count]);
  return (
    <div
      className="tab-pane fade active show"
      id="navs-pills-top-messages-three"
      role="tabpanel"
    >
      <div className="card-header pt-0">
        <h5>Staff List</h5>
        <button
          onClick={() => setCreateStaffModal(true)}
          type="button"
          className="btn rounded-pill btn-primary"
        >
          <span className="tf-icons bx bx-plus"></span>&nbsp; Add
        </button>
      </div>
      <div className="table-responsive text-nowrap">
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Mobile</th>
              <th>Email</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody className="table-border-bottom-0">
            {data.length > 0 ? (
              data.map((staff, i) => (
                <tr key={i}>
                  <td>{staff.name}</td>
                  <td>{staff.mobile}</td>
                  <td>{staff.email}</td>
                  <td>
                    {/* <span className={setBadgeClass(staff?.status?.module_name)}>
                      {staff?.status?.module_name}
                    </span> */}
                    {staff?.status?.module_name === "Active" ? (
                      <div className="form-check form-switch mb-2">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          checked="checked"
                          onChange={() => setStaffInActive(staff.id)}
                        />
                      </div>
                    ) : (
                      <div className="form-check form-switch mb-2">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          checked=""
                          onChange={() => setStaffActive(staff.id)}
                        />
                      </div>
                    )}
                  </td>
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
      <Modal
        show={createStaffModal}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header>
          <Modal.Title id="contained-modal-title-vcenter">
            Create Staff
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="col-6 mb-3">
              <label htmlFor="name" className="form-label">
                Name
              </label>
              <input
                type="text"
                id="name"
                className="form-control"
                placeholder="Name..."
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
              <ValidationMessage error={errors} name="name" />
            </div>
            <div className="col-6 mb-3">
              <label htmlFor="name" className="form-label">
                Mobile
              </label>
              <input
                type="text"
                name="mobile"
                className="form-control"
                placeholder="Mobile"
                onChange={(e) => setForm({ ...form, mobile: e.target.value })}
              />
              <ValidationMessage error={errors} name="mobile" />
            </div>
            <div className="col-6 mb-3">
              <label htmlFor="name" className="form-label">
                Email
              </label>
              <input
                type="email"
                name="email"
                className="form-control"
                placeholder="Email"
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
              <ValidationMessage error={errors} name="email" />
            </div>
            <div className="col-6 mb-3">
              <label htmlFor="name" className="form-label">
                Password
              </label>
              <input
                type="password"
                name="password"
                className="form-control"
                placeholder="*********"
                onChange={(e) => setForm({ ...form, password: e.target.value })}
              />
              <ValidationMessage error={errors} name="password" />
            </div>
            <div className="col-6 mb-3">
              <label htmlFor="name" className="form-label">
                Role
              </label>
              <Select
                options={ROLES_STAFF}
                onChange={(selected) =>
                  setForm({ ...form, role: selected.value })
                }
              />
              <ValidationMessage error={errors} name="role" />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button
            type="button"
            className="btn btn-outline-secondary rounded-pill"
            data-bs-dismiss="modal"
            onClick={() => setCreateStaffModal(false)}
          >
            Close
          </button>
          <button
            onClick={createStaff}
            type="button"
            className="btn btn-primary rounded-pill"
          >
            Save
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Staff;
