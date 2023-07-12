import React, { useEffect, useState } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
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
  CATEGORIES_UPDATED,
  SLOTS,
  STATUS,
  VALIDATION_ERROR,
} from "../../constant/constant";
import { toast } from "react-toastify";
import Select from "react-select";
import axios from "axios";
import { Image } from "react-bootstrap";

const CategoryEdit = () => {
  // Declaring State Variable
  const [errors, setErrors] = useState({});
  const [slots, setSlots] = useState([]);
  const [status, setStatus] = useState([]);
  const [vendor, setVendor] = useState([]);
  const [form, setForm] = useState({
    name: "",
    slot: [],
    status: {},
  });
  const params = useParams();
  const navigate = useNavigate();

  const updateCategories = () => {
    let requestBody = { ...form };
    // Frame Slot
    if (requestBody.slot != null)
      requestBody = { ...requestBody, slot: pluckValue(requestBody.slot) };
    // Frame Status
    if (requestBody.status != null)
      requestBody = { ...requestBody, status: requestBody.status.value };
    // Frame Vendor
    if (requestBody.vendor_id != null)
      requestBody = { ...requestBody, vendor_id: requestBody.vendor_id.value };

    axios
      .post(CATEGORIES_LIST + `/${params.id}`, requestBody, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        if (res.status === 200 && res.data.status) {
          toast.success(CATEGORIES_UPDATED);
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
    const fetchData = async () => {
      try {
        let timeSlot = null;
        let status = null;
        let name = null;
        let selectedVendor = {};
        let image = "";
        // Fetch detail API
        const detailResponse = await axios.get(
          CATEGORIES_LIST + `/${params.id}/edit`
        );
        if (
          detailResponse.status === 200 &&
          detailResponse.data.status &&
          detailResponse.data.data.length > 0
        ) {
          name = detailResponse.data.data[0].name;
          timeSlot = detailResponse.data.data[0].slots;
          status = detailResponse.data.data[0].status;
          image = detailResponse.data.data[0].image;
          selectedVendor = {
            value: detailResponse.data.data[0].vendor_id,
            label:
              detailResponse.data.data[0].vendor_name != null
                ? detailResponse.data.data[0].vendor_name
                : "All",
          };
        }

        // Fetch Time Slot API
        const timeSlotResponse = await axios.get(SUBMODULES + SLOTS);
        if (
          timeSlotResponse.status === 200 &&
          timeSlotResponse.data.data.length > 0
        ) {
          let data = frameDataOptions(
            timeSlotResponse.data.data,
            "id",
            "module_name"
          );
          var selectedTS = data.filter((fts) =>
            timeSlot.split(", ").includes(fts.label)
          );
          setSlots(data);
        }

        // Fetch Status API
        const statusResponse = await axios.get(SUBMODULES + STATUS);
        if (
          statusResponse.status === 200 &&
          statusResponse.data.data.length > 0
        ) {
          let data = frameDataOptions(
            statusResponse.data.data,
            "id",
            "module_name"
          );
          var selectedS = data.filter((fs) => status === fs.label);
          setStatus(data);
        }

        setForm((prevForm) => ({
          ...prevForm,
          slot: selectedTS,
          status: selectedS[0],
          name: name,
          cardImage: image,
          vendor_id: selectedVendor,
        }));
      } catch (error) {
        console.error(error);
      }
    };

    axios.get(VENDOR_DROPDOWN).then((res) => {
      if (res.status === 200 && res.data.status) {
        setVendor([{ label: "All", value: 0 }].concat(res.data.data));
      }
    });
    fetchData();
  }, [params.id]);

  return (
    <div className="content-wrapper">
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
                <h5 className="mb-0">Category Edit</h5>
              </div>
              <div className="card-body ">
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
                          Category Image<span className="text-danger">*</span>
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
                          value={form.name}
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
                          value={form.vendor_id}
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
                          value={form.slot}
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
                        onClick={updateCategories}
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
    </div>
  );
};

export default React.memo(CategoryEdit);
