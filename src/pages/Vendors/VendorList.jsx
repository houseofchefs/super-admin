import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Axios,
  NoDataFound,
  Pagination,
  setBadgeClass,
} from "../../components/Utils";
import { VENDORLIST } from "../../routes/routes";

const VendorList = () => {
  // ## State Variable Declaration
  const [data, setData] = useState([]);
  const [paginator, setPaginator] = useState({});
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      let api = await Axios;
      api.get(VENDORLIST + `?page=${page}`).then((response) => {
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
    };
    fetchData();
  }, [page]);
  return (
    <div className="card">
      <div className="card-header">
        <h5>Vendors</h5>
        <Link to={"/vendor/create"}>
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
              <th>Mobile</th>
              <th>Email</th>
              <th>Subscribtion Expire</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody className="table-border-bottom-0">
            {data.length > 0 ? (
              data.map((vendor, i) => (
                <tr key={i}>
                  <td>
                    <Link to={`/vendor/${vendor.id}/view`}>
                      <span className="badge bg-label-success me-1">
                        <i className="bx bx-show"></i>
                      </span>
                    </Link>
                  </td>
                  <td>{vendor.name}</td>
                  <td>{vendor.mobile}</td>
                  <td>{vendor.email}</td>
                  <td>04/04/2023</td>
                  <td>
                    <span
                      className={setBadgeClass(vendor?.status?.module_name)}
                    >
                      {vendor?.status?.module_name}
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

export default VendorList;
