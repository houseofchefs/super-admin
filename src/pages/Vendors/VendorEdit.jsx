import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ValidationMessage, frameDataOptions } from "../../components/Utils";
import {
  GET_LAT_LNG,
  GOOGLE_LOCATION,
  SUBMODULES,
  VENDOR_DETAILs,
} from "../../routes/routes";
import { ACCOUNT_TYPE, STATUS } from "../../constant/constant";
import { toast } from "react-toastify";
import AsyncSelect from "react-select/async";
import Select from "react-select";
import axios from "axios";
import { Image } from "react-bootstrap";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/material_green.css";
import moment from "moment";

const VendorEdit = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [form, setForm] = useState({});
  const [errors, setErrors] = useState({});
  const [accountType, setAccountType] = useState([]);
  const [status, setStatus] = useState([]);

  /**   *
   * @param {*} inputValue
   * @param {*} callback
   */
  const loadOptions = (inputValue, callback) => {
    axios
      .get(GOOGLE_LOCATION + `?place=${inputValue}`)
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
        // place_id: requestBody.address_line.value,
      };

    if (requestBody.status != null)
      requestBody = { ...requestBody, status: requestBody.status.value };
    if (requestBody.account_type != null)
      requestBody = {
        ...requestBody,
        account_type: requestBody.account_type.value,
      };
    console.log(requestBody);
    axios
      .post(VENDOR_DETAILs + id, requestBody, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
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

    axios.get(VENDOR_DETAILs + id).then((response) => {
      if (response.status === 200 && response.data.data) {
        let data = response.data.data;
        setForm({
          name: data.name,
          email: data.email,
          mobile: data.mobile,
          cardImage: data.image,
          // image: data.image,
          open_time: data.open_time,
          close_time: data.close_time,
          order_accept_time: data.order_accept_time,
          gst_no: data.gst_no,
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
                    <div className="col-6">
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
                          Vendor Image
                        </label>
                        <div className="d-flex gap-3 image-info">
                          <div>
                            <label>Max :</label>
                            <span>2MB</span>
                          </div>
                          <div>
                            <label htmlFor="pixel">Pixels :</label>
                            <span> 100px * 100px </span>
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
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label
                          className="form-label"
                          htmlFor="basic-default-fullname"
                        >
                          Vendor / Kitchen Name
                          <span className="text-danger">*</span>
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
                          placeholder="Mobile No"
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
                          htmlFor="basic-default-mobile"
                        >
                          Open Time<span className="text-danger">*</span>
                        </label>
                        {/* <input
                          type="time"
                          className="form-control"
                          id="basic-default-mobile"
                          placeholder="Open TIme"
                          onChange={(e) =>
                            setForm({ ...form, open_time: e.target.value })
                          }
                        /> */}
                        <Flatpickr
                          className="form-control"
                          options={{
                            enableTime: true,
                            noCalendar: true,
                            dateFormat: "H:i",
                            onChange: (selected) => {
                              const utcDate = moment.utc(selected[0]); // UTC date and time
                              const istDate = utcDate
                                .utcOffset("+05:30")
                                .format("HH:mm:ss");
                              setForm({ ...form, open_time: istDate });
                            },
                          }}
                          value={form?.open_time}
                          placeholder="Select open time"
                        />
                        <ValidationMessage error={errors} name="open_time" />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label
                          className="form-label"
                          htmlFor="basic-default-mobile"
                        >
                          Close Time<span className="text-danger">*</span>
                        </label>
                        {/* <input
                          type="time"
                          className="form-control"
                          id="basic-default-mobile"
                          placeholder="close_time"
                          onChange={(e) =>
                            setForm({ ...form, close_time: e.target.value })
                          }
                        /> */}
                        <Flatpickr
                          className="form-control"
                          options={{
                            enableTime: true,
                            noCalendar: true,
                            dateFormat: "H:i",
                            onChange: (selected) => {
                              const utcDate = moment.utc(selected[0]); // UTC date and time
                              const istDate = utcDate
                                .utcOffset("+05:30")
                                .format("HH:mm:ss");
                              setForm({ ...form, close_time: istDate });
                            },
                          }}
                          value={form?.close_time}
                          placeholder="Select close time"
                        />
                        <ValidationMessage error={errors} name="close_time" />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label
                          className="form-label"
                          htmlFor="basic-default-mobile"
                        >
                          Order Accept Time
                          <span className="text-danger">*</span>
                        </label>
                        <Flatpickr
                          className="form-control"
                          options={{
                            enableTime: true,
                            noCalendar: true,
                            dateFormat: "H:i",
                            onChange: (selected) => {
                              const utcDate = moment.utc(selected[0]); // UTC date and time
                              const istDate = utcDate
                                .utcOffset("+05:30")
                                .format("HH:mm:ss");
                              setForm({ ...form, order_accept_time: istDate });
                            },
                          }}
                          value={form?.order_accept_time}
                          placeholder="Select order accept time"
                        />
                        <ValidationMessage
                          error={errors}
                          name="order_accept_time"
                        />
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
                          defaultValue={form.gst_no}
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
                          defaultValue={form.door_no}
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
                          defaultValue={form.lanmark}
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
                          defaultValue={form.pincode}
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
                          defaultValue={form.ifsc_code}
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
                          defaultValue={form.bank_name}
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
                          type="number"
                          className="form-control hide-arrow"
                          id="account-no"
                          placeholder="Account No"
                          defaultValue={form.account_number}
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
                          value={form.account_type}
                          onChange={(selected) =>
                            setForm({ ...form, account_type: selected })
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
                          defaultValue={form.holder_name}
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

export default VendorEdit;
