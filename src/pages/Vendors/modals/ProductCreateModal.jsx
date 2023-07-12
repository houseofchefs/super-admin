import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { ValidationMessage } from "../../../components/Utils";
import { useParams } from "react-router-dom";
import { CREATE_PRODUCT } from "../../../routes/routes";
import { toast } from "react-toastify";
import { VALIDATION_ERROR } from "../../../constant/constant";
import { Image } from "react-bootstrap";
import axios from "axios";

const ProductCreateModal = ({
  createProductModal,
  setCreateProductModal,
  count,
  setCount,
}) => {
  const { id } = useParams();
  const [form, setForm] = useState({
    vendor_id: id,
    menu_type: "product",
    category_id: 0,
    isPreOrder: 0,
    isDaily: 1,
    type: 0,
    min_quantity: 0,
  });
  const [errors, setErrors] = useState([]);

  /**
   * @createProduct
   */
  const createProduct = () => {
    axios
      .post(CREATE_PRODUCT, form, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        if (response.status === 201 && response.data.status) {
          toast.success(response.data.msg);
          setCount(count + 1);
          setErrors([]);
          setForm({
            vendor_id: id,
            menu_type: "product",
            category_id: 0,
            isPreOrder: 0,
            isDaily: 1,
            type: 0,
            min_quantity: 0,
            isApproved: 1,
          });
          setCreateProductModal(false);
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
  return (
    <Modal
      show={createProductModal}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      onHide={() => setCreateProductModal(false)}
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
              placeholder="Name..."
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
              onChange={(e) => setForm({ ...form, units: e.target.value })}
            />
            <ValidationMessage error={errors} name="units" />
          </div>
          <div className="col-12 mb-3">
            <label htmlFor="name" className="form-label">
              Description<span className="text-danger">*</span>
            </label>
            <textarea
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
          onClick={() => setCreateProductModal(false)}
        >
          Close
        </button>
        <button
          onClick={createProduct}
          type="button"
          className="btn btn-primary rounded-pill"
        >
          Save
        </button>
      </Modal.Footer>
    </Modal>
  );
};

export default ProductCreateModal;
