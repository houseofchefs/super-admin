import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CATEGORIES_LIST } from "../../routes/routes";
import { INTERNAL_SERVER_ERROR, PAGINATE } from "../../constant/constant";
import { toast } from "react-toastify";
import {
  NoDataFound,
  Pagination,
  setBadgeClass,
} from "../../components/Utils";
import axios from "axios";

const CategoryList = () => {
  // ## State Variable Declaration
  const [data, setData] = useState([]);
  const [paginator, setPaginator] = useState({});
  const [page, setPage] = useState(1);

  /**
   * @API Categories List API's call
   */
  useEffect(() => {
    const fetchData = async () => {
      let api = await axios;
      api
        .get(CATEGORIES_LIST + `?type=${PAGINATE}&page=${page}`)
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
          toast.error(INTERNAL_SERVER_ERROR);
        });
    };

    fetchData();
  }, [page]);
  return (
    <div className="card">
      <div className="card-header">
        <h5>Categories</h5>
        <Link to={"/categories/create"}>
          <button type="button" className="btn rounded-pill btn-primary">
            <span className="tf-icons bx bx-plus"></span>&nbsp; Add
          </button>
        </Link>
      </div>
      <div className="table-responsive text-nowrap">
        <table className="table">
          <thead>
            <tr>
              <th>Action</th>
              <th>Name</th>
              <th>Slot</th>
              <th>Vendor</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody className="table-border-bottom-0">
            {data.length > 0 ? (
              data.map((category, i) => (
                <tr key={i}>
                  <td>
                    <Link to={`/categories/${category.id}/view`}>
                      <span className="badge bg-label-info me-1">
                        <i className="bx bx-show"></i>
                      </span>
                    </Link>
                    <Link to={`/categories/${category.id}/edit`}>
                      <span className="badge bg-label-success me-1">
                        <i className="bx bx-pencil"></i>
                      </span>
                    </Link>
                  </td>
                  <td>{category?.name}</td>
                  <td>{category?.slots}</td>
                  <td>
                    {category?.vendor_id !== 0
                      ? category?.vendor_name
                      : "Admin"}
                  </td>
                  <td>
                    <span className={setBadgeClass(category.status)}>
                      {category?.status}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <NoDataFound front="2" back="2" message="No Data Found" />
            )}
          </tbody>
        </table>
      </div>
      {/* Pagination Component */}
      {data.length > 0 && (
        <Pagination paginator={paginator} page={(no) => setPage(no)} />
      )}
    </div>
  );
};

export default CategoryList;
