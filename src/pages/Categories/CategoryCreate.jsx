import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ValidationMessage,
  frameDataOptions,
  pluckValue,
} from "../../components/Utils";
import {
  CATEGORIES_LIST,
  SUBMODULES,
  VENDOR_DROPDOWN,
} from "../../routes/routes";
import {
  CATEGORIES_CREATED,
  SLOTS,
  VALIDATION_ERROR,
} from "../../constant/constant";
import { toast } from "react-toastify";
import Select from "react-select";
import axios from "axios";
import { Image } from "react-bootstrap";

const CategoryCreate = () => {
  // Declaring State Variable
  const [form, setForm] = useState({});
  const [errors, setErrors] = useState({});
  const [slots, setSlots] = useState([]);
  const [vendor, setVendor] = useState([]);
  const navigate = useNavigate();

  /**
   * @API Create Categories
   */
  const createCategories = () => {
    let requestBody = { ...form };
    if (requestBody.slot != null)
      requestBody = { ...requestBody, slot: pluckValue(requestBody.slot) };
    if (requestBody.vendor_id != null)
      requestBody = {
        ...requestBody,
        vendor_id: requestBody.vendor_id.value,
      };
    axios
      .post(CATEGORIES_LIST, requestBody, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        if (res.status === 201 && res.data.status) {
          toast.success(CATEGORIES_CREATED);
          navigate("/categories");
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

  /**
   * Component Mount
   */
  useEffect(() => {
    axios.get(SUBMODULES + SLOTS).then((res) => {
      if (res.status === 200 && res.data.data.length > 0) {
        let data = frameDataOptions(res.data.data, "id", "module_name");
        setSlots(data);
      }
    });
    axios.get(VENDOR_DROPDOWN).then((res) => {
      setVendor([{ label: "All", value: 0 }].concat(res.data.data));
    });
  }, []);
  return (
    <div className="container-xxl flex-grow-1 container-p-y">
      <div className="demo-inline-spacing d-flex justify-content-end mb-3">
        <Link to={"/categories"}>
          <button type="button" className="btn btn-dark rounded-pill">
            <i className="bx bx-exit"></i> back
          </button>
        </Link>
      </div>
      <div className="row">
        <div className="col-xl-12">
          <div className="card mb-4">
            <div className="card-header d-flex justify-content-between align-items-center">
              <h5 className="mb-0">Create Category</h5>
            </div>

            <div className="card-body">
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
                    <label htmlFor="name" className="form-label">
                      Category Image<span className="text-danger">*</span>
                    </label>
                    <input
                      type="file"
                      className="form-control"
                      accept="image/jpeg, image/png, image/jpg"
                      onChange={(e) =>
                        e.target.files.length > 0
                          ? setForm({
                              ...form,
                              image: e.target.files[0],
                              cardImage: URL.createObjectURL(e.target.files[0]),
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
                        Vendor<span className="text-danger">*</span>
                      </label>
                      <Select
                        options={vendor}
                        onChange={(selected) =>
                          setForm({
                            ...form,
                            vendor_id: selected,
                          })
                        }
                      />
                      <ValidationMessage error={errors} name="vendor_id" />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label
                        className="form-label"
                        htmlFor="basic-default-fullname"
                      >
                        Time Slot<span className="text-danger">*</span>
                      </label>
                      <Select
                        isMulti
                        options={slots}
                        onChange={(selected) =>
                          setForm({
                            ...form,
                            slot: selected,
                          })
                        }
                      />
                      <ValidationMessage error={errors} name="slot" />
                    </div>
                  </div>
                  <div className="demo-inline-spacing d-flex justify-content-end">
                    <Link to={"/categories"}>
                      <button
                        type="button"
                        className="btn btn-primary rounded-pill"
                      >
                        Close
                      </button>
                    </Link>

                    <button
                      type="button"
                      onClick={createCategories}
                      className="btn btn-secondary rounded-pill"
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
  );
};

export default CategoryCreate;
