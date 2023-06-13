import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Select from "react-select";
import {
  ValidationMessage,
  frameDataOptions,
  pluckValue,
} from "../../../components/Utils";
import {
  MENU_STATUS,
  VALIDATION_ERROR,
  WEEK_DAYS,
} from "../../../constant/constant";
import { Image } from "react-bootstrap";
import {
  SEPARATE_MENU_DETAILS,
  SUBMODULES,
  UPDATE_MENU,
} from "../../../routes/routes";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import axios from "axios";

const MenuEditModal = ({
  editMenuModal,
  setEditMenuModal,
  category,
  ingrediant,
  type,
  data,
  count,
  setCount,
}) => {
  const { id } = useParams();
  const [form, setForm] = useState({});
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState([]);

  const updateMenu = () => {
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
    // status
    if (form.status != null && form.status.hasOwnProperty("value")) {
      // requestBody = {
      //   ...requestBody,
      //   isApproved: requestBody.status.label === "Approved",
      // };
      requestBody = { ...requestBody, status: requestBody.status.value };
      requestBody = {
        ...requestBody,
        isPreOrder: requestBody.isPreOrder ? 1 : 0,
      };
      requestBody = { ...requestBody, isDaily: requestBody.isDaily ? 1 : 0 };
      requestBody = {
        ...requestBody,
        isApproved: requestBody.isApproved ? 1 : 0,
      };
    }

    axios
      .post(UPDATE_MENU + data, requestBody, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        if (response.status === 200 && response.data.status) {
          toast.success(response.data.msg);
          setCount(count + 1);
          setEditMenuModal(false);
          setErrors([]);
          setForm({
            vendor_id: { id },
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

  useEffect(() => {
    let statusData = [];
    axios.get(SUBMODULES + MENU_STATUS).then((response) => {
      if (response.status === 200) {
        statusData = frameDataOptions(response.data.data, "id", "module_name");
        setStatus(statusData);
      }
    });
    axios.get(SEPARATE_MENU_DETAILS + data).then((response) => {
      if (response.status === 200) {
        let data = response.data.data;
        // Food Type
        let selectedType =
          type.length > 0 &&
          type.filter((st) => st.value === data.type?.module_code);
        // Category
        let selectedCategory =
          category.length > 0 &&
          category.filter((scat) => scat.value === data.category_id);
        // Ingrediants
        let selectedIngrediant =
          data.has_ingrediants != null &&
          data.has_ingrediants.length > 0 &&
          data.has_ingrediants.map((ingrediant) => {
            return {
              label: ingrediant?.ingrediants?.name,
              value: ingrediant.ingredient_id,
            };
          });
        // Status
        let currentStatus = {
          label: data?.status?.module_name,
          value: data?.status?.id,
        };
        // Selected Day
        if (data.available.length > 0) {
          var selectedDay = data.available.map((day) => WEEK_DAYS[day.day]);
        }

        setForm({
          name: data.name,
          image: data.image,
          cardImage: data.image,
          type: selectedType.length > 0 ? selectedType[0] : {},
          category_id: selectedCategory.length > 0 ? selectedCategory[0] : {},
          ingredient_id: selectedIngrediant,
          price: data.price,
          min_quantity: data.min_quantity,
          status: currentStatus,
          isPreOrder: data.isPreOrder,
          isDaily: data.isDaily,
          day: selectedDay,
          isApproved: data.isApproved,
          description: data.description,
          vendor_id: id,
          vendor_price: data.vendor_price,
          admin_price: data.admin_price,
        });
      }
    });
  }, [data, category, type, id]);

  return (
    <Modal
      show={editMenuModal}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      onHide={() => setEditMenuModal(false)}
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Edit Menu</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="row">
          <div className="col-6">
            <Image width={80} height={80} src={form.cardImage} rounded />
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
                      cardImage: URL.createObjectURL(e.target.files[0]),
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
              Type
            </label>
            <Select
              value={form.type}
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
              value={form.category_id}
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
              value={form.ingredient_id}
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
              name="price"
              defaultValue={form.vendor_price}
              className="form-control"
              placeholder="Vendor Price"
              min={5}
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
              defaultValue={form.admin_price}
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
              defaultValue={form.min_quantity}
              onChange={(e) =>
                setForm({ ...form, min_quantity: e.target.value })
              }
            />
            <ValidationMessage error={errors} name="min_quantity" />
          </div>
          <div className="col-6 mb-3">
            <label htmlFor="name" className="form-label">
              Status
            </label>
            <Select
              onChange={(selected) => setForm({ ...form, status: selected })}
              value={form.status}
              options={status}
            />
            <ValidationMessage error={errors} name="status" />
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
                checked={form.isPreOrder ? "checked" : ""}
                onChange={() =>
                  setForm({ ...form, isPreOrder: !form.isPreOrder })
                }
              />
            </div>
          </div>
          {form.isPreOrder ? (
            <>
              <div className="col-3 mb-3">
                <label htmlFor="name" className="form-label">
                  Availability
                </label>
                <div className="d-flex">
                  <input
                    name="default-radio-1"
                    className="form-check-input"
                    type="radio"
                    value="Yes"
                    id="defaultRadio2"
                    defaultChecked={form.isDaily ? "checked" : ""}
                    onClick={() => setForm({ ...form, isDaily: true })}
                  />
                  <span className="ms-1">Daily</span>
                  <input
                    name="default-radio-1"
                    className="form-check-input ms-2"
                    type="radio"
                    value="No"
                    id="defaultRadio2"
                    defaultChecked={!form.isDaily ? "checked" : ""}
                    onClick={() => setForm({ ...form, isDaily: false })}
                  />
                  <span className="ms-1">Day</span>
                </div>
              </div>
              {!form.isDaily && (
                <div className="col-6 mb-3">
                  <label htmlFor="name" className="form-label">
                    Available days
                  </label>
                  <Select
                    isMulti
                    value={form.day}
                    options={WEEK_DAYS}
                    onChange={(selected) =>
                      setForm({ ...form, days: selected })
                    }
                  />
                </div>
              )}
            </>
          ) : (
            ""
          )}

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
          onClick={() => setEditMenuModal(false)}
        >
          Close
        </button>
        <button
          onClick={() => updateMenu()}
          type="button"
          className="btn btn-primary rounded-pill"
        >
          Save
        </button>
      </Modal.Footer>
    </Modal>
  );
};

export default MenuEditModal;
