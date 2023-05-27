import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ValidationMessage,
  frameDataOptions,
} from "../../components/Utils";
import {
  CREATE_VENDOR,
  GET_LAT_LNG,
  GOOGLE_LOCATION,
  SUBMODULES,
} from "../../routes/routes";
import { ACCOUNT_TYPE } from "../../constant/constant";
import { toast } from "react-toastify";
import AsyncSelect from "react-select/async";
import Select from "react-select";
import axios from "axios";

const VendorCreate = () => {
  const [form, setForm] = useState({});
  const [errors, setErrors] = useState({});
  const [accountType, setAccountType] = useState([]);
  const navigate = useNavigate();

  /**   *
   * @param {*} inputValue
   * @param {*} callback
   */
  const loadOptions = (inputValue, callback) => {
    axios.get(GOOGLE_LOCATION + `?place=${inputValue}`)
      .then((res) => {
        let data = res.data;
        let options = [];
        if (data.predictions.length > 0) {
          data.predictions.forEach((sd) => {
            options.push({ label: sd.description, value: sd.place_id });
          });
        }
        callback(options);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  /**
   * form submit API's call
   */
  const createVendor = () => {
    let requestBody = { ...form };
    if (requestBody.address_line != null)
      requestBody = {
        ...requestBody,
        address_line: requestBody.address_line.label,
        place_id: requestBody.address_line.value,
      };
    axios.post(CREATE_VENDOR, requestBody)
      .then((res) => {
        console.log(res);
        if (res.status === 201 && res.data.status) {
          toast.success("Create Successfully!");
          navigate("/vendors");
        }
      })
      .catch((err) => {
        if (err.response.status === 422) {
          const error = err.response.data.error;
          setErrors(error);
        }
      });
  };

  const getLatLng = (id) => {
    console.log(id);
    axios.get(GET_LAT_LNG + "?place_id=" + id).then((res) => {
      setForm((prevForm) => ({
        ...prevForm,
        latitude: res.data.results[0].geometry.location.lat,
        longitude: res.data.results[0].geometry.location.lng,
      }));
    });
  };

  useEffect(() => {
    axios.get(SUBMODULES + ACCOUNT_TYPE).then((response) => {
      if (response.status === 200 && response.data.data.length > 0) {
        let data = frameDataOptions(response.data.data, "id", "module_name");
        setAccountType(data);
      }
    });
  }, []);
  return (
    <div className="content-wrapper">
      <div className="container-xxl flex-grow-1 container-p-y">
        <div className="demo-inline-spacing d-flex justify-content-end mb-3">
          <Link to={"/vendors"}>
            <button type="button" className="btn btn-dark rounded-pill">
              <i className="bx bx-exit"></i> back
            </button>
          </Link>
        </div>
        <div className="row">
          <div className="col-xl-12">
            <div className="card mb-4">
              <div className="card-header d-flex justify-content-between align-items-center">
                <h5 className="mb-0">Vendor</h5>
              </div>
              <div className="card-body pb-0">
                <form>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label
                          className="form-label"
                          htmlFor="basic-default-fullname"
                        >
                          Vendor / Kitchen Name<span className="text-danger">*</span>
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="basic-default-fullname"
                          placeholder="Name"
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
                          type="text"
                          className="form-control"
                          id="basic-default-email"
                          placeholder="Email"
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
                          type="text"
                          className="form-control"
                          id="basic-default-mobile"
                          placeholder="Mobile No"
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
                          htmlFor="basic-default-gst-no"
                        >
                          GST No
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="basic-default-gst-no"
                          placeholder="GST No"
                          onChange={(e) =>
                            setForm({ ...form, gst_no: e.target.value })
                          }
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label
                          className="form-label"
                          htmlFor="basic-default-door-no"
                        >
                          Door No<span className="text-danger">*</span>
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="basic-default-door-no"
                          placeholder="Door No"
                          onChange={(e) =>
                            setForm({ ...form, door_no: e.target.value })
                          }
                        />
                        <ValidationMessage error={errors} name="door_no" />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="form-label" htmlFor="lan-mark">
                          Lanmark
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="lan-mark"
                          placeholder="Landmark"
                          onChange={(e) =>
                            setForm({ ...form, lanmark: e.target.value })
                          }
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label
                          className="form-label"
                          htmlFor="basic-default-gst-no"
                        >
                          Address<span className="text-danger">*</span>
                        </label>
                        <AsyncSelect
                          cacheOptions
                          defaultOptions
                          loadOptions={loadOptions}
                          placeholder="Search Address"
                          onChange={(selected) => {
                            setForm({ ...form, address_line: selected });
                            getLatLng(selected.value);
                          }}
                          value={form.address_line}
                        />
                        <ValidationMessage error={errors} name="address_line" />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label
                          className="form-label"
                          htmlFor="basic-default-gst-no"
                        >
                          Pincode
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="pincode"
                          placeholder="Pincode"
                          onChange={(e) =>
                            setForm({ ...form, pincode: e.target.value })
                          }
                        />
                        <ValidationMessage error={errors} name="pincode" />
                      </div>
                    </div>
                  </div>
                </form>
              </div>
              <div className="card-header d-flex justify-content-between align-items-center">
                <h5 className="mb-0">Bank</h5>
              </div>
              <div className="card-body">
                <form>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="form-label" htmlFor="ifsc-code">
                          IFSC Code<span className="text-danger">*</span>
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="ifsc-code"
                          placeholder="IFSC Code"
                          onChange={(e) =>
                            setForm({ ...form, ifsc_code: e.target.value })
                          }
                        />
                        <ValidationMessage error={errors} name="ifsc_code" />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="form-label" htmlFor="bank-name">
                          Bank Name<span className="text-danger">*</span>
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="bank-name"
                          placeholder="Bank Name"
                          onChange={(e) =>
                            setForm({ ...form, bank_name: e.target.value })
                          }
                        />
                        <ValidationMessage error={errors} name="bank_name" />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="form-label" htmlFor="account-no">
                          Account No<span className="text-danger">*</span>
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="account-no"
                          placeholder="Account No"
                          onChange={(e) =>
                            setForm({ ...form, account_number: e.target.value })
                          }
                        />
                        <ValidationMessage
                          error={errors}
                          name="account_number"
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="form-label" htmlFor="account-type">
                          Account Type<span className="text-danger">*</span>
                        </label>
                        <Select
                          options={accountType}
                          onChange={(selected) =>
                            setForm({ ...form, account_type: selected.value })
                          }
                        />
                        <ValidationMessage error={errors} name="account_type" />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="form-label" htmlFor="holder-name">
                          Holder Name<span className="text-danger">*</span>
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="holder-name"
                          placeholder="Holder Name"
                          onChange={(e) =>
                            setForm({ ...form, holder_name: e.target.value })
                          }
                        />
                        <ValidationMessage error={errors} name="holder_name" />
                      </div>
                    </div>
                  </div>
                  <div className="demo-inline-spacing d-flex justify-content-end">
                    <Link to={"/vendors"}>
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
                      onClick={() => createVendor()}
                    >
                      &nbsp;Save
                    </button>
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

export default VendorCreate;
