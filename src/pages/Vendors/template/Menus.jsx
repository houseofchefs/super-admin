import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  NoDataFound,
  Pagination,
  frameDataOptions,
} from "../../../components/Utils";
import {
  CATEGORIES_LIST,
  INGREDIANT_DROPDOWN,
  MENU_APPROVE,
  SUBMODULES,
  VENDOR_BASED_MENU_LIST,
} from "../../../routes/routes";
import { DROPDOWN, FOOD_TYPE } from "../../../constant/constant";
import { toast } from "react-toastify";
import MenuCreateModal from "../modals/MenuCreateModal";
import MenuEditModal from "../modals/MenuEditModal";
import axios from "axios";

const Menus = () => {
  // ## State Variable Declaration
  const [data, setData] = useState([]);
  const [paginator, setPaginator] = useState({});
  const [page, setPage] = useState(1);
  const [type, setType] = useState([]);
  const [category, setCategory] = useState([]);
  const [ingrediant, setIngrediant] = useState([]);
  const [createMenuModal, setCreateMenuModal] = useState(false);
  const [menuDetail, setMenuDetail] = useState({});
  const [editMenuModal, setEditMenuModal] = useState(false);
  const [count, setCount] = useState(0);
  const { id } = useParams();

  const approveMenu = (id) => {
    axios
      .put(MENU_APPROVE + id, {
        status: "MS02",
      })
      .then((response) => {
        if (response.status === 200 && response.data.status) {
          toast.success(response.data.msg);
          setCount(count + 1);
        }
      });
  };

  const openEditMenuModal = (data) => {
    setEditMenuModal(true);
    setMenuDetail(data);
  };

  useEffect(() => {
    // Menu List
    axios
      .get(VENDOR_BASED_MENU_LIST + `${id}?page=${page}`)
      .then((response) => {
        if (
          response.status === 200 &&
          response.data.status &&
          response.data.data.data.length > 0
        ) {
          setData(response.data.data.data);
          setPaginator({
            prev: response.data.data.prev_page_url != null,
            next: response.data.data.next_page_url != null,
            total: response.data.data.total,
            current: response.data.data.current_page,
            last: response.data.data.last_page,
          });
        }
      });
    // Food Type
    axios.get(SUBMODULES + FOOD_TYPE).then((response) => {
      if (response.status === 200) {
        setType(
          frameDataOptions(response.data.data, "module_code", "module_name")
        );
      }
    });
    // Category
    axios.get(CATEGORIES_LIST + `?type=${DROPDOWN}`).then((response) => {
      if (response.status === 200) {
        setCategory(frameDataOptions(response.data.data, "id", "name"));
      }
    });

    // Ingrediants
    axios.get(INGREDIANT_DROPDOWN).then((response) => {
      if (response.status === 200) {
        setIngrediant(response.data.data);
      }
    });
  }, [id, page, count]);
  return (
    <div
      className="tab-pane fade  active show"
      id="navs-pills-top-profile"
      role="tabpanel"
    >
      <div>
        <div className="row">
          <div className="card-header pt-0">
            <h5>Menu List</h5>
            <button
              type="button"
              className="btn rounded-pill btn-primary"
              data-bs-toggle="modal"
              data-bs-target="#modalCenter"
              fdprocessedid="zcflla"
              onClick={() => setCreateMenuModal(true)}
            >
              <span className="tf-icons bx bx-plus"></span>&nbsp; Add
            </button>
          </div>
          <div className="table-responsive text-nowrap">
            <table className="table">
              <thead>
                <tr>
                  <th>Action</th>
                  <th>Name</th>
                  <th>Category</th>
                  <th>Food Type</th>
                  <th>Price</th>
                  <th>Admin Price</th>
                  <th>Description</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody className="table-border-bottom-0">
                {data.length > 0 ? (
                  data.map((menu, i) => (
                    <tr key={i}>
                      <td>
                        {!menu.approved ? (
                          <button
                            onClick={() => approveMenu(menu.id)}
                            className="badge bg-label-info me-1 border-0"
                            data-bs-toggle="tooltip"
                            data-bs-offset="0,4"
                            data-bs-placement="top"
                            data-bs-html="true"
                            title="Approve"
                            data-bs-original-title="Approve"
                          >
                            <i className="bx bx-check"></i>
                          </button>
                        ) : (
                          ""
                        )}

                        <button
                          onClick={() => openEditMenuModal(menu.id)}
                          className="badge bg-label-success me-1 border-0"
                          data-bs-toggle="tooltip"
                          data-bs-offset="0,4"
                          data-bs-placement="top"
                          data-bs-html="true"
                          title="Edit"
                          data-bs-original-title="Edit"
                        >
                          <i className="bx bx-pencil"></i>
                        </button>
                      </td>
                      <td>{menu.name}</td>
                      <td>{menu.category}</td>
                      <td>{menu.food_type}</td>
                      <td>{menu.price}</td>
                      <td>{menu.admin_price}</td>
                      <td>{menu.description}</td>
                      <td>{menu.status}</td>
                    </tr>
                  ))
                ) : (
                  <NoDataFound front="3" back="3" message="No Data Found" />
                )}
              </tbody>
            </table>
          </div>
          {/* <div className="col-md-12">
            <div className="row">
              {data.length > 0 ? (
                data.map((menu, i) => (
                  <div key={i} className="col-md-3">
                    <div className="card menu-card">
                      <div className="card-head d-flex">
                        <div className="menu-actions">
                          <i
                            className="bx bxs-pencil"
                            onClick={() => openEditMenuModal(menu.id)}
                          ></i>
                        </div>
                        <img
                          className="card-img-top"
                          src={menu.image}
                          alt="Menu"
                        />
                      </div>
                      <div className="card-body">
                        <div className="card-menu-text">
                          <div className="card-text-header">
                            <h4>{menu.name}</h4>
                            {menu.approved ? (
                              <span
                                className={
                                  menu.food_type === "Non-Veg"
                                    ? "badge rounded-pill bg-danger"
                                    : "badge rounded-pill bg-success"
                                }
                              >
                                <i className="bx bxs-star"></i> {menu.rating}
                              </span>
                            ) : (
                              <span
                              style={{ padding:5 }}
                                className="badge badge-sm p-5 rounded-pill bg-danger check-icon"
                                onClick={() => approveMenu(menu.id)}
                              >
                                Approve
                              </span>
                            )}
                          </div>
                          <div className="card-text-header mt-2">
                            <p>{menu.description}</p>
                            <p>&#8377;{menu.price}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center mb-5">No Menu Founded</div>
              )}
            </div>
          </div> */}
        </div>
        {data.length > 0 && (
          <Pagination paginator={paginator} page={(no) => setPage(no)} />
        )}
      </div>
      {createMenuModal && (
        <MenuCreateModal
          createMenuModal={createMenuModal}
          setCreateMenuModal={(data) => setCreateMenuModal(data)}
          type={type}
          category={category}
          ingrediant={ingrediant}
          count={count}
          setCount={(no) => setCount(no)}
        />
      )}
      {editMenuModal && (
        <MenuEditModal
          editMenuModal={editMenuModal}
          setEditMenuModal={(data) => setEditMenuModal(data)}
          type={type}
          category={category}
          ingrediant={ingrediant}
          count={count}
          setCount={(no) => setCount(no)}
          data={menuDetail}
        />
      )}
    </div>
  );
};

export default Menus;
