import Modal from "react-bootstrap/Modal";
import { ValidationMessage, frameDataOptions } from "../../../components/Utils";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Image } from "react-bootstrap";
import { CREATE_PRODUCT, SUBMODULES } from "../../../routes/routes";
import { STATUS, VALIDATION_ERROR } from "../../../constant/constant";
import Select from "react-select";
import { toast } from "react-toastify";
import axios from "axios";

const ProductEditModal = ({
  editProductModal,
  setEditProductModal,
  count,
  setCount,
  data,
}) => {
  const { id } = useParams();
  const [form, setForm] = useState({
    vendor_id: id,
    image:
      "https://images.unsplash.com/photo-1602253057119-44d745d9b860?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1026&q=80",
  });
  const [errors, setErrors] = useState([]);
  const [status, setStatus] = useState([]);

  const updateProduct = () => {
    let requestBody = { ...form };
    if (
      requestBody.status != null &&
      requestBody.status.hasOwnProperty("value")
    ) {
      requestBody = { ...requestBody, status: requestBody.status.value };
    }
    axios
      .put(CREATE_PRODUCT + `/${data.id}`, requestBody)
      .then((response) => {
        if (response.status === 200 && response.data.status) {
          toast.success(response.data.msg);
          setCount(count + 1);
          setErrors([]);
          setForm({
            vendor_id: id,
            image:
              "https://images.unsplash.com/photo-1602253057119-44d745d9b860?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1026&q=80",
          });
          setEditProductModal(false);
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
    axios.get(SUBMODULES + STATUS).then((response) => {
      if (response.status === 200) {
        let statusData = frameDataOptions(
          response.data.data,
          "module_code",
          "module_name"
        );
        setStatus(statusData);
      }
    });
    console.log(data);
    setForm({
      name: data.name,
      price: data.price,
      units: data.units,
      status: {
        label: data?.status?.module_name,
        value: data?.status?.module_code,
      },
      description: data.description,
      vendor_price: data.vendor_price,
      admin_price: data.admin_price,
      vendor_id: id,
      image:
        "https://images.unsplash.com/photo-1602253057119-44d745d9b860?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1026&q=80",
    });
  }, [id, data]);
  return (
    <Modal
      show={editProductModal}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      onHide={() => setEditProductModal(false)}
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Create Product
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="row">
          <div className="col-6">
            <Image width={80} height={80} src={form.image} rounded />
          </div>
          <div className="col-6">
            <label htmlFor="name" className="form-label">
              Menu Image
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
          <div className="col-6 mb-3">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              type="text"
              id="name"
              className="form-control"
              placeholder="Name"
              defaultValue={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
            <ValidationMessage error={errors} name="name" />
          </div>
          <div className="col-6 mb-3">
            <label htmlFor="name" className="form-label">
              Vendor Price
            </label>
            <input
              type="number"
              name="price"
              className="form-control"
              placeholder="Vendor Price"
              value={form.vendor_price}
              onChange={(e) => setForm({ ...form, vendor_price: e.target.value })}
            />
            <ValidationMessage error={errors} name="vendor_price" />
          </div>
          <div className="col-6 mb-3">
            <label htmlFor="name" className="form-label">
              Admin Price
            </label>
            <input
              type="number"
              name="price"
              className="form-control"
              placeholder="Admin Price"
              value={form.admin_price}
              onChange={(e) => setForm({ ...form, admin_price: e.target.value })}
            />
            <ValidationMessage error={errors} name="admin_price" />
          </div>
          <div className="col-6 mb-3">
            <label htmlFor="name" className="form-label">
              Units
            </label>
            <input
              type="text"
              name="units"
              className="form-control"
              placeholder="1 kg"
              defaultValue={form.units}
              onChange={(e) => setForm({ ...form, units: e.target.value })}
            />
            <ValidationMessage error={errors} name="units" />
          </div>
          <div className="col-6 mb-3">
            <label htmlFor="name" className="form-label">
              Status
            </label>
            <Select
              value={form.status}
              options={status}
              onChange={(selected) => setForm({ ...form, status: selected })}
            />
            <ValidationMessage error={errors} name="status" />
          </div>
          <div className="col-12 mb-3">
            <label htmlFor="name" className="form-label">
              Description
            </label>
            <textarea
              defaultValue={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
              className="form-control"
              rows={3}
            ></textarea>
            <ValidationMessage error={errors} name="description" />
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <button
          type="button"
          className="btn btn-outline-secondary rounded-pill"
          data-bs-dismiss="modal"
          onClick={() => setEditProductModal(false)}
        >
          Close
        </button>
        <button
          onClick={updateProduct}
          type="button"
          className="btn btn-primary rounded-pill"
        >
          Save
        </button>
      </Modal.Footer>
    </Modal>
  );
};

export default ProductEditModal;
