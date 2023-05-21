import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Axios, Pagination, frameDataOptions } from "../../../components/Utils";
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
    Axios.put(MENU_APPROVE + id, {
      status: "MS02",
    }).then((response) => {
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
    Axios.get(VENDOR_BASED_MENU_LIST + `${id}?page=${page}`).then(
      (response) => {
        if (
          response.status === 200 &&
          response.data.status &&
          response.data.data.data.length > 0
        ) {
          console.log(response.data.data.data);
          setData(response.data.data.data);
          setPaginator({
            prev: response.data.data.prev_page_url != null,
            next: response.data.data.next_page_url != null,
            total: response.data.data.total,
            current: response.data.data.current_page,
            last: response.data.data.last_page,
          });
        }
      }
    );
    // Food Type
    Axios.get(SUBMODULES + FOOD_TYPE).then((response) => {
      if (response.status === 200) {
        setType(
          frameDataOptions(response.data.data, "module_code", "module_name")
        );
      }
    });
    // Category
    Axios.get(CATEGORIES_LIST + `?type=${DROPDOWN}`).then((response) => {
      if (response.status === 200) {
        setCategory(frameDataOptions(response.data.data, "id", "name"));
      }
    });

    // Ingrediants
    Axios.get(INGREDIANT_DROPDOWN).then((response) => {
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
          <div className="col-md-12">
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
          </div>
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
