import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  CATEGORIES_LIST,
  DISCOUNT_LIST,
  SUBMODULES,
  VENDOR_DROPDOWN,
} from "../../routes/routes";
import Select from "react-select";
import { ValidationMessage, frameDataOptions } from "../../components/Utils";
import { DROPDOWN, VALIDATION_ERROR } from "../../constant/constant";
import { Image } from "react-bootstrap";
import { toast } from "react-toastify";

const CreateDiscount = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    image:
      "https://images.unsplash.com/photo-1602253057119-44d745d9b860?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1026&q=80",
  });
  const [type, setType] = useState([]);
  const [vendor, setVendor] = useState([]);
  const [category, setCategory] = useState([]);
  const [errors, setErrors] = useState({});

  const submit = () => {
    axios
      .post(DISCOUNT_LIST, form)
      .then((res) => {
        if (res.status === 201 && res.data.status) {
          toast.success("Created Successfully!");
          navigate("/discounts");
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
    /**
     * Vendor Dropdown
     */
    axios.get(VENDOR_DROPDOWN).then((res) => {
      setVendor([{ label: "All", value: 0 }].concat(res.data.data));
    });
    /**
     * Discount Dropdown
     */
    axios.get(SUBMODULES + "MT06").then((response) => {
      if (response.status === 200 && response.data.data.length > 0) {
        let data = frameDataOptions(response.data.data, "id", "module_name");
        setType(data);
      }
    });
    /**
     * Category Dropdown
     */
    axios.get(CATEGORIES_LIST + `?type=${DROPDOWN}`).then((response) => {
      if (response.status === 200 && response.data.data.length > 0) {
        let data = frameDataOptions(response.data.data, "id", "name");
        setCategory([{ label: "All", value: 0 }].concat(data));
      }
    });
  }, []);
  return (
    <div className="content-wrapper">
      <div className="container-xxl flex-grow-1 container-p-y">
        <div className="demo-inline-spacing d-flex justify-content-end mb-3">
          <Link to={"/discounts"}>
            <button type="button" className="btn btn-dark rounded-pill">
              <i className="bx bx-exit"></i> back
            </button>
          </Link>
        </div>
        <div className="row">
          <div className="col-xl-12">
            <div className="card mb-4">
              <div className="card-header d-flex justify-content-between align-items-center">
                <h5 className="mb-0">Create Discount</h5>
              </div>
              <div className="card-body">
                <form>
                  <div className="row">
                    <div className="col-6">
                      <Image width={80} height={80} src={form.image} rounded />
                    </div>
                    <div className="col-6">
                      <label htmlFor="name" className="form-label">
                        Image
                      </label>
                      <input
                        type="file"
                        className="form-control"
                        accept="image/jpeg, image/png, image/jpg"
                        onChange={(e) =>
                          e.target.files.length > 0
                            ? setForm({
                                ...form,
                                image: URL.createObjectURL(e.target.files[0]),
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
                          htmlFor="basic-default-mobile"
                        >
                          Type<span className="text-danger">*</span>
                        </label>
                        <Select
                          options={type}
                          onChange={(selected) => {
                            if (selected.value === 26)
                              setForm({
                                ...form,
                                category_id: 0,
                                vendor_id: 0,
                                type: selected.value,
                              });
                            else setForm({ ...form, type: selected.value });
                          }}
                        />
                        <ValidationMessage error={errors} name="type" />
                      </div>
                    </div>
                    {form.type !== 26 && (
                      <>
                        <div className="col-md-6">
                          <div className="mb-3">
                            <label
                              className="form-label"
                              htmlFor="basic-default-mobile"
                            >
                              Vendor<span className="text-danger">*</span>
                            </label>
                            <Select
                              options={vendor}
                              onChange={(selected) =>
                                setForm({ ...form, vendor_id: selected.value })
                              }
                            />
                            <ValidationMessage
                              error={errors}
                              name="vendor_id"
                            />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="mb-3">
                            <label
                              className="form-label"
                              htmlFor="basic-default-mobile"
                            >
                              Category<span className="text-danger">*</span>
                            </label>
                            <Select
                              options={category}
                              onChange={(selected) =>
                                setForm({
                                  ...form,
                                  category_id: selected.value,
                                })
                              }
                            />
                            <ValidationMessage
                              error={errors}
                              name="category_id"
                            />
                          </div>
                        </div>
                      </>
                    )}
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label
                          className="form-label"
                          htmlFor="basic-default-fullname"
                        >
                          Offer Name<span className="text-danger">*</span>
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
                          htmlFor="basic-default-fullname"
                        >
                          Percentage<span className="text-danger">*</span>
                        </label>
                        <input
                          type="number"
                          min={5}
                          className="form-control"
                          id="basic-default-fullname"
                          placeholder="Percentage"
                          onChange={(e) =>
                            setForm({ ...form, percentage: e.target.value })
                          }
                        />
                        <ValidationMessage error={errors} name="percentage" />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label
                          htmlFor="html5-datetime-local-input"
                          className="col-md-2 col-form-label"
                        >
                          EXPIRED AT<span className="text-danger">*</span>
                        </label>
                        <div className="col-md-12">
                          <input
                            className="form-control"
                            type="datetime-local"
                            id="html5-datetime-local-input"
                            onChange={(e) =>
                              setForm({ ...form, expire_at: e.target.value })
                            }
                          />
                          <ValidationMessage error={errors} name="expire_at" />
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-12">
                      <label
                        htmlFor="html5-datetime-local-input"
                        className="col-md-2 col-form-label"
                      >
                        Description<span className="text-danger">*</span>
                      </label>
                      <textarea
                        className="form-control"
                        rows={3}
                        onChange={(e) =>
                          setForm({ ...form, description: e.target.value })
                        }
                      ></textarea>
                      <ValidationMessage error={errors} name="description" />
                    </div>
                    <div className="demo-inline-spacing d-flex justify-content-end">
                      <Link to={"/discounts"}>
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

export default CreateDiscount;