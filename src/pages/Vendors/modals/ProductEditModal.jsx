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
    menu_type: "product",
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
      .post(CREATE_PRODUCT + `/${data.id}`, requestBody, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        if (response.status === 200 && response.data.status) {
          toast.success(response.data.msg);
          setCount(count + 1);
          setErrors([]);
          setForm({
            vendor_id: id,
            menu_type: "product",
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
      vendor_id: id,
      cardImage: data.image,
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
            <Image width={80} height={80} src={form.cardImage} rounded />
          </div>
          <div className="col-6">
          <div className="d-flex justify-content-between">
              <label htmlFor="name" className="form-label">
                Menu Image<span className="text-danger">*</span>
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
                      cardImage: URL.createObjectURL(e.target.files[0]),
                    })
                  : ""
              }
            />
            <ValidationMessage error={errors} name="image" />
          </div>
          <div className="col-6 mb-3">
            <label htmlFor="name" className="form-label">
              Name<span className="text-danger">*</span>
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
              Price<span className="text-danger">*</span>
            </label>
            <input
              type="number"
              name="price"
              className="form-control"
              placeholder="Price"
              value={form.price}
              onChange={(e) =>
                setForm({ ...form, price: e.target.value })
              }
            />
            <ValidationMessage error={errors} name="price" />
          </div>
          <div className="col-6 mb-3">
            <label htmlFor="name" className="form-label">
              Units<span className="text-danger">*</span>
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
              Status<span className="text-danger">*</span>
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
              Description<span className="text-danger">*</span>
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
