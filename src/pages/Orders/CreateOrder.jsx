import axios from "axios";
import { useEffect, useState } from "react";
import Select from "react-select";
import { CUSTOMER_ADDRESS, CUSTOMER_LIST } from "../../routes/routes";
import { DROPDOWN } from "../../constant/constant";
import { frameDataOptions } from "../../components/Utils";

const CreateOrder = () => {
  const [form, setForm] = useState({});
  const [address, setAddress] = useState([]);
  const [customer, setCustomer] = useState([]);

  /**
   * Vendor List
   */
  const vendorList = (selected) => {
    console.log(selected);
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
   * Component Mount
   */
  useEffect(() => {
    axios.get(CUSTOMER_LIST + `?type=${DROPDOWN}`).then((res) => {
      if (res.status === 200 && res.data.status) {
        let data = frameDataOptions(res.data.data, "id", "mobile");
        setCustomer(data);
      }
    });
  }, []);
  return (
    <div className="content-wrapper">
      <div className="container-xxl flex-grow-1 container-p-y">
        <div className="demo-inline-spacing d-flex justify-content-end mb-3">
          <a href="order.html">
            <button type="button" className="btn btn-dark rounded-pill">
              <i className="bx bx-exit"></i> back
            </button>
          </a>
        </div>
        <div className="row">
          <div className="col-xl-12">
            <div className="row">
              <div className="col-md-8">
                <div className="row">
                  <div className="col-md-12">
                    <div className="card mb-4">
                      <div className="card-header d-flex justify-content-between align-items-center">
                        <h5 className="mb-0">Customer</h5>
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
                          </div>
                          <div className="col-md-6 mt-2">
                            <label className="form-label">Address</label>
                            <Select
                              options={address}
                              onChange={(selected) => {
                                setForm({ ...form, address_id: selected });
                                vendorList(selected);
                              }}
                            />
                          </div>
                          <div className="col-md-6 mt-2">
                            <label className="form-label">Vendor</label>
                            <Select />
                          </div>
                          <div className="col-md-6 mt-2">
                            <label className="form-label">Category</label>
                            <Select />
                          </div>
                          <div className="col-md-12 mt-2">
                            <label className="form-label">Instruction</label>
                            <textarea className="form-control"></textarea>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-md-12">
                    <div className="card mb-4">
                      <div className="card-header d-flex justify-content-between align-items-center">
                        <h5 className="mb-0">Menu</h5>
                      </div>
                      <div className="row">
                        <div className="col-md-6">
                          <div className="card-body">
                            <div class="owl-carousel owl-theme gallery">
                              <div class="item">
                                <a href="#">
                                  <div class="card menu-card">
                                    <div class="card-head">
                                      <img
                                        class="card-img-top"
                                        src="https://k-ramanathan.github.io/hoc-admin-dashboard/assets/img/menu-1%20(1).jpg"
                                        alt="Card image cap"
                                      />
                                    </div>
                                    <div class="card-body">
                                      <div class="card-menu-text">
                                        <div class="card-text-header">
                                          <h4>Lorem ipsum dolor</h4>
                                        </div>
                                        <div class="card-text-header mt-2">
                                          <p>&#8377;50</p>
                                          <button
                                            type="button"
                                            class="btn btn-icon btn-outline-secondary"
                                          >
                                            <i class="bx bx-plus"></i>
                                          </button>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
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
                        {/* <div className="order-check d-flex align-items-center my-3">
                          <div className="dlab-media">
                            <img src="./assets/img/menu-1-(1).png" alt="" />
                          </div>
                          <div className="dlab-info">
                            <div className="d-flex align-items-center justify-content-between">
                              <h4 className="dlab-title">
                                <a href="javascript:void(0);">
                                  Pepperoni Pizza
                                </a>
                              </h4>
                              <h4 className="text-primary ms-2">&#8377;50</h4>
                            </div>
                            <div className="d-flex align-items-center justify-content-between">
                              <span>x1</span>
                              <div className="quntity">
                                <button data-decrease="">-</button>
                                <input data-value="" type="text" value="1" />
                                <button data-increase="">+</button>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="order-check d-flex align-items-center my-3">
                          <div className="dlab-media">
                            <img src="./assets/img/menu-1-(1).png" alt="" />
                          </div>
                          <div className="dlab-info">
                            <div className="d-flex align-items-center justify-content-between">
                              <h4 className="dlab-title">
                                <a href="javascript:void(0);">
                                  Pepperoni Pizza
                                </a>
                              </h4>
                              <h4 className="text-primary ms-2">&#8377;50</h4>
                            </div>
                            <div className="d-flex align-items-center justify-content-between">
                              <span>x1</span>
                              <div className="quntity">
                                <button data-decrease="">-</button>
                                <input data-value="" type="text" value="1" />
                                <button data-increase="">+</button>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="order-check d-flex align-items-center my-3">
                          <div className="dlab-media">
                            <img src="./assets/img/menu-1-(1).png" alt="" />
                          </div>
                          <div className="dlab-info">
                            <div className="d-flex align-items-center justify-content-between">
                              <h4 className="dlab-title">
                                <a href="javascript:void(0);">
                                  Pepperoni Pizza
                                </a>
                              </h4>
                              <h4 className="text-primary ms-2">&#8377;50</h4>
                            </div>
                            <div className="d-flex align-items-center justify-content-between">
                              <span>x1</span>
                              <div className="quntity">
                                <button data-decrease="">-</button>
                                <input data-value="" type="text" value="1" />
                                <button data-increase="">+</button>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="order-check d-flex align-items-center my-3">
                          <div className="dlab-media">
                            <img src="./assets/img/menu-1-(1).png" alt="" />
                          </div>
                          <div className="dlab-info">
                            <div className="d-flex align-items-center justify-content-between">
                              <h4 className="dlab-title">
                                <a href="javascript:void(0);">
                                  Pepperoni Pizza
                                </a>
                              </h4>
                              <h4 className="text-primary ms-2">&#8377;50</h4>
                            </div>
                            <div className="d-flex align-items-center justify-content-between">
                              <span>x1</span>
                              <div className="quntity">
                                <button data-decrease="">-</button>
                                <input data-value="" type="text" value="1" />
                                <button data-increase="">+</button>
                              </div>
                            </div>
                          </div>
                        </div> */}
                      </div>
                      <div className="card-footer border-top">
                        <div className="d-flex align-items-center justify-content-between">
                          <p>Discount</p>
                          <h4 className="font-w500">-&#8377;20.00</h4>
                        </div>
                        <div className="d-flex align-items-center justify-content-between mb-3">
                          <h4 className="font-w500">Total</h4>
                          <h3 className="font-w500 text-primary">
                            &#8377;180.00
                          </h3>
                        </div>
                        <a
                          href="checkout-page.html"
                          className="btn btn-primary btn-block w-100"
                        >
                          Checkout
                        </a>
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
