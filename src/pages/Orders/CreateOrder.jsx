import axios from "axios";
import { useEffect, useState } from "react";
import Select from "react-select";
import {
  CATEGORY_BASED_MENUS,
  CUSTOMER_ADDRESS,
  CUSTOMER_LIST,
  NEARBY_VENDOR,
  PLACE_ORDER,
  VENDOR_BASED_CATEGORY,
} from "../../routes/routes";
import { DROPDOWN, VALIDATION_ERROR } from "../../constant/constant";
import { ValidationMessage, frameDataOptions } from "../../components/Utils";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";

const CreateOrder = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({});
  const [address, setAddress] = useState([]);
  const [customer, setCustomer] = useState([]);
  const [vendor, setVendor] = useState([]);
  const [category, setCategory] = useState([]);
  const [menu, setMenu] = useState([]);
  const [selectedMenu, setSelectedMenu] = useState([]);
  const [total, setTotal] = useState(0);
  const [errors, setErrors] = useState({});

  /**
   * Vendor List
   */
  const vendorList = (selected) => {
    axios
      .get(
        NEARBY_VENDOR +
          `?latitude=${selected.latitude}&longitude=${selected.longitude}`
      )
      .then((res) => {
        if (res.status === 200 && res.data.status && res.data.data.length > 0) {
          let vendorData = frameDataOptions(res.data.data, "id", "name");
          setVendor(vendorData);
        }
      });
  };

  /**
   * Category List
   */
  const categoryList = (selected) => {
    axios.get(VENDOR_BASED_CATEGORY + selected.value).then((res) => {
      if (res.status === 200 && res.data.status && res.data.data.length > 0) {
        let categoryData = frameDataOptions(res.data.data, "id", "name");
        setCategory(categoryData);
      }
    });
  };

  /**
   * Menu List
   */
  const menuList = (selected) => {
    axios
      .get(
        CATEGORY_BASED_MENUS +
          `?latitude=${form.address_id.latitude}&longitude=${form.address_id.longitude}&categoryId=${selected.value}&slot=0`
      )
      .then((res) => {
        if (res.status === 200 && res.data.status && res.data.data.length > 0) {
          setMenu(res.data.data);
        }
      });
  };

  /**
   * Customer Address
   */
  const customerAddress = (id) => {
    axios.get(CUSTOMER_ADDRESS + `${id}/customer`).then((res) => {
      if (res.status === 200 && res.data.status && res.data.data.length > 0) {
        let addressData = [];
        res.data.data.forEach((data) => {
          addressData.push({
            value: data.id,
            label: data.address_line,
            latitude: data.latitude,
            longitude: data.longitude,
          });
        });
        setAddress(addressData);
      }
    });
  };

  /**
   * Add or Remove Menu
   */
  const addOrRemoveMenu = (data) => {
    let menus = [];
    if (selectedMenu.length > 0) {
      let index = selectedMenu.findIndex((obj) => obj.id === data.id);
      if (index > -1) {
        setTotal(total - selectedMenu[index].price);
        let tempMenu = [...selectedMenu];
        tempMenu.splice(index, 1);
        menus = tempMenu;
        setSelectedMenu(tempMenu);
      } else {
        let existArr = [...selectedMenu];
        existArr.push({ ...data, quantity: 1 });
        setSelectedMenu(existArr);
        menus = existArr;
      }
    } else {
      let existArr = [...selectedMenu];
      existArr.push({ ...data, quantity: 1 });
      setSelectedMenu(existArr);
      menus = existArr;
    }
    calculateMenuTotal(menus);
  };

  const calculateMenuTotal = (sm) => {
    let overallTotal = 0;
    sm.forEach((data) => {
      overallTotal =
        overallTotal + parseInt(data.price) * parseInt(data.quantity);
    });
    setTotal(overallTotal);
  };

  /**
   * Update Quantity
   */

  const updateQuantity = (index, type) => {
    let selected = [...selectedMenu];
    let menus = [];
    if (type === "minus") {
      let quantity = selected[index].quantity - 1;
      if (quantity <= 0) {
        let remove = [...selectedMenu];
        remove.splice(index, 1);
        setSelectedMenu(remove);
        menus = remove;
      } else {
        let update = [...selectedMenu];
        update[index].quantity = quantity;
        setSelectedMenu(update);
        menus = update;
      }
    } else {
      let update = [...selectedMenu];
      update[index].quantity += 1;
      setSelectedMenu(update);
      menus = update;
    }
    calculateMenuTotal(menus);
  };

  /**
   * Place Order @submit
   */
  const placeOrder = () => {
    console.log(form);
    let requestBody = { ...form };
    // Customer ID
    if (
      requestBody.customer_id != null &&
      Object.keys(requestBody.customer_id).length > 0
    )
      requestBody = {
        ...requestBody,
        customer_id: requestBody.customer_id.value,
      };
    // Address ID
    if (
      requestBody.address_id != null &&
      Object.keys(requestBody.address_id).length > 0
    )
      requestBody = {
        ...requestBody,
        address_id: requestBody.address_id.value,
        latitude: requestBody.address_id.latitude,
        longitude: requestBody.address_id.longitude,
        discount: 0,
        cod: 1,
        price: total,
      };
    // Vendor ID
    if (
      requestBody.vendor_id != null &&
      Object.keys(requestBody.vendor_id).length > 0
    )
      requestBody = {
        ...requestBody,
        vendor_id: requestBody.vendor_id.value,
      };
    // Product
    let menus = [];
    selectedMenu.forEach((sm) => {
      menus.push({
        menu_id: sm.id,
        quantity: sm.quantity,
      });
    });
    requestBody = { ...requestBody, product_id: menus };
    axios
      .post(PLACE_ORDER, requestBody)
      .then((res) => {
        if (res.status === 201 && res.data.status) {
          toast.success("Order Placed Successfully!");
          navigate("/orders");
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
    axios.get(CUSTOMER_LIST + `?type=${DROPDOWN}`).then((res) => {
      if (res.status === 200 && res.data.status) {
        let customer = [];
        res.data.data.forEach((data) => {
          customer.push({
            value: data.id,
            label: `${data.name}(${data.mobile})`,
          });
        });
        setCustomer(customer);
      }
    });
  }, []);
  return (
    <div className="content-wrapper">
      <div className="container-xxl flex-grow-1 container-p-y">
        <div className="demo-inline-spacing d-flex justify-content-end mb-3">
          <Link to={"/orders"}>
            <button type="button" className="btn btn-dark rounded-pill">
              <i className="bx bx-exit"></i> back
            </button>
          </Link>
        </div>
        <div className="row">
          <div className="col-xl-12">
            <div className="row">
              <div className="col-md-8">
                <div className="row">
                  <div className="col-md-12">
                    <div className="card mb-4">
                      <div className="card-header d-flex justify-content-between align-items-center">
                        <h5 className="mb-0">
                          Customer<span className="text-danger">*</span>
                        </h5>
                      </div>
                      <div className="card-body">
                        <div className="row">
                          <div className="col-md-6 mt-2">
                            <label className="form-label">Customer</label>
                            <Select
                              options={customer}
                              onChange={(selected) => {
                                setForm({ ...form, customer_id: selected });
                                customerAddress(selected.value);
                              }}
                            />
                            <ValidationMessage
                              error={errors}
                              name="customer_id"
                            />
                          </div>
                          <div className="col-md-6 mt-2">
                            <label className="form-label">
                              Address<span className="text-danger">*</span>
                            </label>
                            <Select
                              options={address}
                              onChange={(selected) => {
                                setForm({ ...form, address_id: selected });
                                vendorList(selected);
                              }}
                            />
                            <ValidationMessage
                              error={errors}
                              name="address_id"
                            />
                          </div>
                          <div className="col-md-6 mt-2">
                            <label className="form-label">Vendor</label>
                            <Select
                              options={vendor}
                              onChange={(selected) => {
                                setForm({ ...form, vendor_id: selected });
                                categoryList(selected);
                              }}
                            />
                            <ValidationMessage
                              error={errors}
                              name="vendor_id"
                            />
                          </div>
                          <div className="col-md-6 mt-2">
                            <label className="form-label">Category</label>
                            <Select
                              options={category}
                              onChange={(selected) => {
                                setForm({ ...form, category_id: selected });
                                menuList(selected);
                              }}
                            />
                          </div>
                          <div className="col-md-12 mt-2">
                            <label className="form-label">Instruction</label>
                            <textarea
                              onChange={(e) =>
                                setForm({
                                  ...form,
                                  instructions: e.target.value,
                                })
                              }
                              className="form-control"
                            ></textarea>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {menu.length > 0 && (
                    <div className="col-md-12">
                      <div className="card mb-4">
                        <div className="card-header d-flex justify-content-between align-items-center">
                          <h5 className="mb-0">Menu</h5>
                        </div>
                        <div className="row">
                          {menu.map((data, i) => (
                            <div key={i} className="col-md-6">
                              <div className="card-body">
                                <div className="owl-carousel owl-theme gallery">
                                  <div className="item">
                                    <div className="card menu-card">
                                      <div className="card-body">
                                        <div className="card-menu-text">
                                          <div className="card-text-header">
                                            <h4>{data.name}</h4>
                                          </div>
                                          <div className="card-text-header mt-2">
                                            <p>&#8377;{data.price}</p>
                                            <button
                                              type="button"
                                              className={
                                                selectedMenu.length > 0 &&
                                                selectedMenu.some(
                                                  (sm) => sm.id === data.id
                                                )
                                                  ? "btn btn-icon btn-outline-secondary selected-menu"
                                                  : "btn btn-icon btn-outline-secondary"
                                              }
                                              onClick={() => {
                                                addOrRemoveMenu(data);
                                              }}
                                            >
                                              <i className="bx bx-plus"></i>
                                            </button>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div className="col-md-4">
                <div className="row">
                  <div className="col-md-12">
                    <div className="card mb-4">
                      <div className="card-header d-flex justify-content-between align-items-center">
                        <h5 className="mb-0">Cart</h5>
                      </div>
                      <div className="card-body pb-0">
                        {selectedMenu.length > 0 &&
                          selectedMenu.map((sm, i) => (
                            <div
                              key={i}
                              className="order-check d-flex align-items-center my-3"
                            >
                              <div className="dlab-info">
                                <div className="d-flex align-items-center justify-content-between">
                                  <h4 className="dlab-title">
                                    <span>{sm.name}</span>
                                  </h4>
                                  <h4 className="text-primary ms-2">
                                    &#8377;{sm.price}
                                  </h4>
                                </div>
                                <div className="d-flex align-items-center justify-content-between">
                                  <span>x{sm.quantity}</span>
                                  <div className="quntity">
                                    <button
                                      data-decrease=""
                                      onClick={() => updateQuantity(i, "minus")}
                                    >
                                      -
                                    </button>
                                    <input
                                      data-value=""
                                      type="text"
                                      value={sm.quantity}
                                      onChange={() => {}}
                                    />
                                    <button
                                      data-increase=""
                                      onClick={() => updateQuantity(i, "add")}
                                    >
                                      +
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                      </div>
                      <div className="card-footer border-top">
                        <div className="d-flex align-items-center justify-content-between">
                          <p>Total Price</p>
                          <h4 className="font-w500">{total}</h4>
                        </div>
                        <div className="d-flex align-items-center justify-content-between mb-3">
                          <p className="font-w500">Packaging Charge</p>
                          <p className="font-w500 text-danger">Free</p>
                        </div>
                        <div className="d-flex align-items-center justify-content-between mb-3">
                          <p className="font-w500">Delivery Charge</p>
                          <h4 className="font-w500">0</h4>
                        </div>
                        <div className="d-flex align-items-center justify-content-between mb-3">
                          <p className="font-w500">Tax</p>
                          <h4 className="font-w500">0</h4>
                        </div>
                        <div className="d-flex align-items-center justify-content-between mb-3">
                          <p className="font-w500 text-danger">Net Total</p>
                          <h4 className="font-w500">{total}</h4>
                        </div>
                        <button
                          className="btn btn-primary btn-block w-100"
                          alt="checkout"
                          onClick={() => placeOrder()}
                        >
                          Place Order
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateOrder;
