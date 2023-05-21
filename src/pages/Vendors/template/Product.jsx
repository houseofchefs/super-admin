import React, { useEffect, useState } from "react";
import { Axios, Pagination } from "../../../components/Utils";
import { PRODUCT_LIST } from "../../../routes/routes";
import { useParams } from "react-router-dom";

import { toast } from "react-toastify";
import ProductCreateModal from "../modals/ProductCreateModal";
import ProductEditModal from "../modals/ProductEditModal";

const Product = () => {
  // ## State Variable Declaration
  const [data, setData] = useState([]);
  const [paginator, setPaginator] = useState({});
  const [page, setPage] = useState(1);
  const [createProductModal, setCreateProductModal] = useState(false);
  const [editProductModal, setEditProductModal] = useState(false);
  const [productDetail, setProductDetail] = useState({});
  const [count, setCount] = useState(0);
  const { id } = useParams();

  useEffect(() => {
    Axios.get(PRODUCT_LIST + `${id}?page=${page}`)
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
      })
      .catch((error) => {
        toast.error("Server Error");
      });
  }, [page, id, count]);
  return (
    <div
      className="tab-pane fade  active show"
      id="navs-pills-top-messages"
      role="tabpanel"
    >
      <div className="row">
        <div className="card-header pt-0">
          <h5>Product List</h5>
          <button
            type="button"
            className="btn rounded-pill btn-primary"
            onClick={() => setCreateProductModal(true)}
          >
            <span className="tf-icons bx bx-plus"></span>&nbsp; Add
          </button>
        </div>
        <div className="col-md-12">
          <div className="row">
            {data.length > 0 ? (
              data.map((product, i) => (
                <div key={i} className="col-md-3">
                  <div className="card menu-card">
                    <div className="card-head">
                      <div className="menu-actions">
                        <i
                          className="bx bxs-pencil"
                          onClick={() => { setEditProductModal(true); setProductDetail(product) }}
                        ></i>
                      </div>
                      <img
                        className="card-img-top"
                        src={product.image}
                        alt="Product"
                      />
                    </div>
                    <div className="card-body">
                      <div className="card-menu-text">
                        <div className="card-text-header">
                          <h4>{product.name}</h4>
                          <span className="badge rounded-pill bg-success">
                            <i className="bx bxs-star"></i> {product.rating}
                          </span>
                        </div>
                        <div className="card-text-header mt-2">
                          <p>{product.description}</p>
                          <p>&#8377;{product.price}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center mb-5">No Product Founded</div>
            )}
          </div>
        </div>
        {data.length > 0 && (
          <Pagination paginator={paginator} page={(no) => setPage(no)} />
        )}
      </div>
      {createProductModal && (
        <ProductCreateModal
          createProductModal={createProductModal}
          setCreateProductModal={(data) => setCreateProductModal(data)}
          count={count}
          setCount={(no) => setCount(no)}
        />
      )}

      {editProductModal && (
        <ProductEditModal
          editProductModal={editProductModal}
          setEditProductModal={(data) => setEditProductModal(data)}
          count={count}
          setCount={(no) => setCount(no)}
          data={productDetail}
        />
      )}
    </div>
  );
};

export default Product;
