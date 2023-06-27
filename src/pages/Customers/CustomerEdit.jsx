import React, { useEffect, useState } from "react";
import { ValidationMessage } from "../../components/Utils";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { CUSTOMER_EDIT, CUSTOMER_UPDATE } from "../../routes/routes";
import { toast } from "react-toastify";
import { CUSTOMER_UPDATED, VALIDATION_ERROR } from "../../constant/constant";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/material_red.css";
import moment from "moment";

const CustomerEdit = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [form, setForm] = useState({
    referral: "",
  });
  const [errors, setErrors] = useState({});

  const submit = () => {
    axios
      .put(CUSTOMER_UPDATE + id, form)
      .then((res) => {
        if (res.status === 200 && res.data.status) {
          toast.success(CUSTOMER_UPDATED);
          navigate("/customers");
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
  useEffect(() => {
    axios.get(CUSTOMER_EDIT + id).then((res) => {
        if (res.status === 200 && res.data.status) {
          setForm(res.data.data);
        }
      });
  }, [id]);
  return (
    <div className="content-wrapper">
      <div className="container-xxl flex-grow-1 container-p-y">
        <div className="demo-inline-spacing d-flex justify-content-end mb-3">
          <Link to={"/customers"}>
            <button type="button" className="btn btn-dark rounded-pill">
              <i className="bx bx-exit"></i> back
            </button>
          </Link>
        </div>
        <div className="row">
          <div className="col-xl-12">
            <div className="card mb-4">
              <div className="card-header d-flex justify-content-between align-items-center">
                <h5 className="mb-0">Edit Customer</h5>
              </div>
              <div className="card-body">
                <form>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label
                          className="form-label"
                          htmlFor="basic-default-fullname"
                        >
                          Name<span className="text-danger">*</span>
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="basic-default-fullname"
                          placeholder="Name"
                          onChange={(e) =>
                            setForm({ ...form, name: e.target.value })
                          }
                          defaultValue={form.name}
                        />
                        <ValidationMessage error={errors} name="name" />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label
                          className="form-label"
                          htmlFor="basic-default-email"
                        >
                          Email<span className="text-danger">*</span>
                        </label>
                        <input
                          type="email"
                          className="form-control"
                          id="basic-default-email"
                          placeholder="Email"
                          onChange={(e) =>
                            setForm({ ...form, email: e.target.value })
                          }
                          defaultValue={form.email}
                        />
                        <ValidationMessage error={errors} name="email" />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label
                          className="form-label"
                          htmlFor="basic-default-mobile"
                        >
                          Mobile<span className="text-danger">*</span>
                        </label>
                        <input
                          type="number"
                          className="form-control hide-arrow"
                          id="basic-default-mobile"
                          placeholder="Mobile No"
                          onChange={(e) =>
                            setForm({ ...form, mobile: e.target.value })
                          }
                          defaultValue={form.mobile}
                        />
                        <ValidationMessage error={errors} name="mobile" />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label
                          className="form-label"
                          htmlFor="basic-default-mobile"
                        >
                          DOB<span className="text-danger">*</span>
                        </label>
                        {/* <input
                          type="date"
                          className="form-control"
                          id="basic-default-mobile"
                          onChange={(e) =>
                            setForm({ ...form, dob: e.target.value })
                          }
                          defaultValue={form.dob}
                        /> */}
                        <Flatpickr
                          className="form-control"
                          options={{
                            dateFormat: "Y-m-d",
                            enableTime: false,
                            maxDate: "today",
                            onChange: (selected) =>
                              setForm({
                                ...form,
                                dob: moment(selected[0]).format("YYYY-MM-DD"),
                              }),
                          }}
                          value={form.dob}
                          placeholder="Select DOB"
                        />
                        <ValidationMessage error={errors} name="dob" />
                      </div>
                    </div>
                    <div className="demo-inline-spacing d-flex justify-content-end">
                      <Link to={"/customers"}>
                        <button
                          type="button"
                          className="btn btn-primary rounded-pill"
                        >
                          Close
                        </button>
                      </Link>
                      <button
                        type="button"
                        className="btn btn-secondary rounded-pill"
                        onClick={() => submit()}
                      >
                        &nbsp; Save
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerEdit;
