import React, { useEffect, useState } from "react";
import { ValidationMessage, frameDataOptions } from "../../components/Utils";
import { Link, useNavigate, useParams } from "react-router-dom";
import AsyncSelect from "react-select/async";
import Select from "react-select";
import {
  EDIT_RIDER,
  GET_LAT_LNG,
  GOOGLE_LOCATION,
  SUBMODULES,
} from "../../routes/routes";
import axios from "axios";
import { ACCOUNT_TYPE, STATUS } from "../../constant/constant";
import { toast } from "react-toastify";

const EditRider = () => {
  const { id } = useParams();
  const [form, setForm] = useState({});
  const [errors, setErrors] = useState({});
  const [accountType, setAccountType] = useState([]);
  const [status, setStatus] = useState([]);
  const navigate = useNavigate();

  /**   *
   * @param {*} input
   * @param {*} callback
   */
  const loadOptions = (input, callback) => {
    if (input.length > 3) {
      axios
        .get(GOOGLE_LOCATION + `?place=${input}`)
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
    } else {
      callback([]);
    }
  };

  const getLatLng = (id) => {
    axios.get(GET_LAT_LNG + "?place_id=" + id).then((res) => {
      setForm((prevForm) => ({
        ...prevForm,
        latitude: res.data.results[0].geometry.location.lat,
        longitude: res.data.results[0].geometry.location.lng,
      }));
    });
  };

  /**
   * form submit API's call
   */
  const createRider = () => {
    let requestBody = { ...form };
    if (requestBody.address_line != null)
      requestBody = {
        ...requestBody,
        address_line: requestBody.address_line.label,
        // place_id: requestBody.address_line.value,
      };
    if (requestBody.status != null)
      requestBody = { ...requestBody, status: requestBody.status.value };
    if (requestBody.account_type != null)
      requestBody = {
        ...requestBody,
        account_type: requestBody.account_type.value,
      };
    axios
      .post(EDIT_RIDER + id, requestBody)
      .then((res) => {
        if (res.status === 200 && res.data.status) {
          toast.success("Update Successfully!");
          navigate("/riders");
        }
      })
      .catch((err) => {
        if (err.response.status === 422) {
          const error = err.response.data.error;
          setErrors(error);
        }
      });
  };

  useEffect(() => {
    axios.get(SUBMODULES + ACCOUNT_TYPE).then((response) => {
      if (response.status === 200 && response.data.data.length > 0) {
        let data = frameDataOptions(response.data.data, "id", "module_name");
        setAccountType(data);
      }
    });

    axios.get(EDIT_RIDER + id).then((res) => {
      if (res.status === 200) {
        let data = res.data.data;
        setForm({
          name: data.name,
          email: data.email,
          mobile: data.mobile,
          door_no: data?.address?.door_no,
          lanmark: data?.address?.lanmark,
          address_line: {
            label: data?.address?.address_line,
            value: data?.address?.id,
          },
          pincode: data?.address?.pincode,
          latitude: data.latitude,
          longitude: data.longitude,
          ifsc_code: data?.bank?.ifsc_code,
          bank_name: data?.bank?.bank_name,
          account_number: data?.bank?.account_number,
          holder_name: data?.bank?.holder_name,
          account_type: {
            value: data?.bank?.account_type,
            label: data?.bank?.type?.module_name,
          },
          status: { label: data?.status?.module_name, value: data?.status?.id },
          bank_id: data?.bank?.id,
          address_id: data?.address?.id,
          vehicle_id: data?.vehicle?.id,
          insurance_number: data?.vehicle?.insurance_number,
          registration_number: data?.vehicle?.reg_no,
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
          <Link to={"/riders"}>
            <button type="button" className="btn btn-dark rounded-pill">
              <i className="bx bx-exit"></i> back
            </button>
          </Link>
        </div>
        <div className="row">
          <div className="col-xl-12">
            <div className="card mb-4">
              <div className="card-header d-flex justify-content-between align-items-center">
                <h5 className="mb-0">Rider</h5>
              </div>
              <div className="card-body pb-0">
                <form>
                  <div className="row">
                    {/* <div className="col-6">
                      <Image
                        width={80}
                        height={80}
                        src={form.cardImage}
                        rounded
                      />
                    </div>
                    <div className="col-6">
                      <div className="d-flex justify-content-between">
                        <label htmlFor="name" className="form-label">
                          Rider Image
                        </label>
                        <div className="d-flex gap-3 image-info">
                          <div>
                            <label>Max :</label>
                            <span>2MB</span>
                          </div>
                          <div>
                            <label htmlFor="pixel">Pixels :</label>
                            <span>875px * 1400px </span>
                          </div>
                        </div>
                      </div>
                      <input
                        type="file"
                        className="form-control"
                        accept="image/jpeg, image/png, image/jpg"
                        onChange={(e) =>
                          e.target.files.length > 0
                            ? setForm({
                                ...form,
                                image: e.target.files[0],
                                cardImage: URL.createObjectURL(
                                  e.target.files[0]
                                ),
                              })
                            : ""
                        }
                      />
                      <ValidationMessage error={errors} name="image" />
                    </div> */}
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label
                          className="form-label"
                          htmlFor="basic-default-fullname"
                        >
                          Name
                          <span className="text-danger">*</span>
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="basic-default-fullname"
                          placeholder="Name"
                          defaultValue={form?.name}
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
                          defaultValue={form?.email}
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
                          defaultValue={form?.mobile}
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
                          htmlFor="basic-default-door-no"
                        >
                          Door No<span className="text-danger">*</span>
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="basic-default-door-no"
                          placeholder="Door No"
                          defaultValue={form?.door_no}
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
                          defaultValue={form?.lanmark}
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
                          defaultValue={form?.pincode}
                          onChange={(e) =>
                            setForm({ ...form, pincode: e.target.value })
                          }
                        />
                        <ValidationMessage error={errors} name="pincode" />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label
                          className="form-label"
                          htmlFor="basic-default-gst-no"
                        >
                          Status
                        </label>
                        <Select
                          options={status}
                          value={form.status}
                          onChange={(selected) =>
                            setForm({ ...form, status: selected })
                          }
                        />
                        <ValidationMessage error={errors} name="status" />
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
                          defaultValue={form?.ifsc_code}
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
                          defaultValue={form?.bank_name}
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
                          defaultValue={form?.account_number}
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
                            setForm({ ...form, account_type: selected })
                          }
                          value={form?.account_type}
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
                          defaultValue={form.holder_name}
                          onChange={(e) =>
                            setForm({ ...form, holder_name: e.target.value })
                          }
                        />
                        <ValidationMessage error={errors} name="holder_name" />
                      </div>
                    </div>
                  </div>
                </form>
              </div>
              <div className="card-header d-flex justify-content-between align-items-center">
                <h5 className="mb-0">Vehicle</h5>
              </div>
              <div className="card-body">
                <form>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label
                          className="form-label"
                          htmlFor="registration-number"
                        >
                          Registration Number
                          <span className="text-danger">*</span>
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="registration-number"
                          placeholder="Registration Number"
                          defaultValue={form?.registration_number}
                          onChange={(e) =>
                            setForm({
                              ...form,
                              registration_number: e.target.value,
                            })
                          }
                        />
                        <ValidationMessage
                          error={errors}
                          name="registration_number"
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="form-label" htmlFor="isurance-number">
                          Insurance Number<span className="text-danger">*</span>
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="isurance-number"
                          placeholder="Insurance Number"
                          defaultValue={form?.insurance_number}
                          onChange={(e) =>
                            setForm({
                              ...form,
                              insurance_number: e.target.value,
                            })
                          }
                        />
                        <ValidationMessage
                          error={errors}
                          name="insurance_number"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="demo-inline-spacing d-flex justify-content-end">
                    <Link to={"/riders"}>
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
                      onClick={() => createRider()}
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

export default EditRider;
