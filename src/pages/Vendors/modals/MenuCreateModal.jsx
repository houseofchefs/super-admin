import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Select from "react-select";
import { useParams } from "react-router-dom";
import { ValidationMessage, pluckValue } from "../../../components/Utils";
import { VALIDATION_ERROR, WEEK_DAYS } from "../../../constant/constant";
import { CREATE_MENU } from "../../../routes/routes";
import { toast } from "react-toastify";
import { Image } from "react-bootstrap";
import axios from "axios";

const MenuCreateModal = ({
  createMenuModal,
  setCreateMenuModal,
  type,
  category,
  ingrediant,
  count,
  setCount,
}) => {
  const { id } = useParams();
  const [form, setForm] = useState({
    vendor_id: id,
    isPreOrder: false,
    isDaily: false,
    menu_type:"menu",   
  });
  const [errors, setErrors] = useState([]);

  const createMenu = () => {
    let requestBody = { ...form };
    // Frame Category
    if (form.category_id != null && form.category_id.hasOwnProperty("value"))
      requestBody = { ...requestBody, category_id: form.category_id.value };
    // Frame Ingrediant
    if (form.ingredient_id != null && form.ingredient_id.length > 0)
      requestBody = {
        ...requestBody,
        ingredient_id: pluckValue(form.ingredient_id),
      };
    // Frame Food Type
    if (form.type != null && form.type.hasOwnProperty("value"))
      requestBody = { ...requestBody, type: form.type.value };
    // Frame Days
    if (!form.isDaily && form.days != null && form.days.length > 0)
      requestBody = { ...requestBody, days: pluckValue(form.days) };
    else requestBody = { ...requestBody, days: [] };
    
    requestBody = {...requestBody, isPreOrder: requestBody.isPreOrder ? 1 : 0}
    requestBody = {...requestBody, isDaily: requestBody.isDaily ? 1 : 0}

    axios
      .post(CREATE_MENU, requestBody, {headers: {
        'Content-Type': 'multipart/form-data'
      }})
      .then((response) => {
        if (response.status === 201 && response.data.status) {
          toast.success(response.data.msg);
          setCount(count + 1);
          setCreateMenuModal(false);
          setErrors([]);
          setForm({
            vendor_id: { id },
            isDaily: false,
            isPreOrder: false,
            menu_type: 'menu'
          });
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
    <>
      <Modal
        show={createMenuModal}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        onHide={() => setCreateMenuModal(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Create Menu
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
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
                        image: e.target.files[0],
                        cardImage: URL.createObjectURL(e.target.files[0])
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
                placeholder="Name..."
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
              <ValidationMessage error={errors} name="name" />
            </div>
            <div className="col-6 mb-3">
              <label htmlFor="name" className="form-label">
                Type
              </label>
              <Select
                options={type}
                onChange={(selected) => setForm({ ...form, type: selected })}
              />
              <ValidationMessage error={errors} name="type" />
            </div>
            <div className="col-6 mb-3">
              <label htmlFor="name" className="form-label">
                Category
              </label>
              <Select
                options={category}
                onChange={(selected) =>
                  setForm({ ...form, category_id: selected })
                }
              />
              <ValidationMessage error={errors} name="category_id" />
            </div>
            <div className="col-6 mb-3">
              <label htmlFor="name" className="form-label">
                Ingrediants
              </label>
              <Select
                isMulti
                options={ingrediant}
                onChange={(selected) =>
                  setForm({ ...form, ingredient_id: selected })
                }
              />
            </div>
            <div className="col-6 mb-3">
              <label htmlFor="name" className="form-label">
                Vendor Price
              </label>
              <input
                type="number"
                min={5}
                name="price"
                className="form-control"
                placeholder="Vendor Price"
                onChange={(e) =>
                  setForm({ ...form, vendor_price: e.target.value })
                }
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
                min={5}
                className="form-control"
                placeholder="Admin Price"
                onChange={(e) =>
                  setForm({ ...form, admin_price: e.target.value })
                }
              />
              <ValidationMessage error={errors} name="admin_price" />
            </div>
            <div className="col-6 mb-3">
              <label htmlFor="name" className="form-label">
                Min Quantity
              </label>
              <input
                min="0"
                type="number"
                name="quantity"
                className="form-control"
                placeholder="Min Quantity"
                onChange={(e) =>
                  setForm({ ...form, min_quantity: e.target.value })
                }
              />
              <ValidationMessage error={errors} name="min_quantity" />
            </div>
            <div className="col-3 mb-3">
              <label htmlFor="name" className="form-label">
                isPreBooking?
              </label>
              <div className="form-check form-switch mb-2">
                <input
                  className="form-control form-check-input"
                  type="checkbox"
                  id="flexSwitchCheckChecked"
                  onChange={() =>
                    setForm({ ...form, isPreOrder: !form.isPreOrder })
                  }
                />
              </div>
            </div>
            {form.isPreOrder && (
              <>
                <div className="col-3 mb-3">
                  <label htmlFor="name" className="form-label">
                    Availabilty
                  </label>
                  <div className="d-flex">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="availabilty"
                      onClick={() => setForm({ ...form, isDaily: false })}
                    />{" "}
                    <span className="ms-1">Day</span>
                    <input
                      className="form-check-input ms-2"
                      type="radio"
                      name="availabilty"
                      onClick={() => setForm({ ...form, isDaily: true })}
                    />{" "}
                    <span className="ms-1">Daily</span>
                  </div>
                </div>
                {!form.isDaily && (
                  <div className="col-6 mb-3">
                    <label htmlFor="name" className="form-label">
                      Available days
                    </label>
                    <Select
                      isMulti
                      options={WEEK_DAYS}
                      onChange={(selected) =>
                        setForm({ ...form, days: selected })
                      }
                    />
                  </div>
                )}
              </>
            )}

            <div className="col-12 mb-3">
              <label htmlFor="name" className="form-label">
                Description
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
            onClick={() => setCreateMenuModal(false)}
          >
            Close
          </button>
          <button
            onClick={createMenu}
            type="button"
            className="btn btn-primary rounded-pill"
          >
            Save
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default MenuCreateModal;
