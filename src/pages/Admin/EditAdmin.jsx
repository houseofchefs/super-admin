import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ADMIN_EDIT, ADMIN_UPDATE, SUBMODULES } from "../../routes/routes";
import { toast } from "react-toastify";
import Select from "react-select";
import { STATUS, VALIDATION_ERROR } from "../../constant/constant";
import { ValidationMessage, frameDataOptions } from "../../components/Utils";

const EditAdmin = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [status, setStatus] = useState([]);
  const [form, setForm] = useState({
    referral: "",
  });
  const [errors, setErrors] = useState({});

  const submit = () => {
    let requestBody = { ...form };
    requestBody = { ...form, status: form?.status?.value };
    axios
      .put(ADMIN_UPDATE + id, requestBody)
      .then((res) => {
        if (res.status === 200 && res.data.status) {
          toast.success("Updated Successfully!");
          navigate("/admin");
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
    axios.get(ADMIN_EDIT + id).then((res) => {
      if (res.status === 200 && res.data.status) {
        setForm({
          name: res.data.data.name,
          mobile: res.data.data.mobile,
          email: res.data.data.email,
          status: {
            label: res.data.data?.status?.module_name,
            value: res.data.data?.status?.id,
          },
        });
      }
    });

    axios.get(SUBMODULES + STATUS).then((res) => {
      if (res.status === 200 && res.data.data.length > 0) {
        let data = frameDataOptions(res.data.data, "id", "module_name");
        setStatus(data);
      }
    });
  }, [id]);
  return (
    <div className="content-wrapper">
      <div className="container-xxl flex-grow-1 container-p-y">
        <div className="demo-inline-spacing d-flex justify-content-end mb-3">
          <Link to={"/admin"}>
            <button type="button" className="btn btn-dark rounded-pill">
              <i className="bx bx-exit"></i> back
            </button>
          </Link>
        </div>
        <div className="row">
          <div className="col-xl-12">
            <div className="card mb-4">
              <div className="card-header d-flex justify-content-between align-items-center">
                <h5 className="mb-0">Edit Admin</h5>
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
                          defaultValue={form.name}
                          onChange={(e) =>
                            setForm({ ...form, name: e.target.value })
                          }
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
                          defaultValue={form.email}
                          onChange={(e) =>
                            setForm({ ...form, email: e.target.value })
                          }
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
                          placeholder="Mobile"
                          defaultValue={form.mobile}
                          onChange={(e) =>
                            setForm({ ...form, mobile: e.target.value })
                          }
                        />
                        <ValidationMessage error={errors} name="mobile" />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label
                          className="form-label"
                          htmlFor="basic-default-fullname"
                        >
                          Status<span className="text-danger">*</span>
                        </label>
                        <Select
                          options={status}
                          value={form.status}
                          onChange={(selected) =>
                            setForm({
                              ...form,
                              status: selected,
                            })
                          }
                        />
                        <ValidationMessage error={errors} name="status" />
                      </div>
                    </div>
                    <div className="demo-inline-spacing d-flex justify-content-end">
                      <Link to={"/admin"}>
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

export default EditAdmin;
