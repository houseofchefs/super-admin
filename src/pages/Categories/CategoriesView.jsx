import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { CATEGORIES_LIST } from "../../routes/routes";
import axios from "axios";

const CategoriesView = () => {
  // ## State Declartion
  const [data, setData] = useState([]);
  const params = useParams();

  // ## Component Mount
  useEffect(() => {
    axios.get(CATEGORIES_LIST + `/${params.id}/edit`).then((response) => {
      if (
        response.status === 200 &&
        response.data.status &&
        response.data.data.length > 0
      ) {
        setData(response.data.data[0]);
      }
    });
  }, [params.id]);
  return (
    <div className="content-wrapper">
      <div className="container-xxl flex-grow-1 container-p-y">
        <div className="demo-inline-spacing d-flex justify-content-end mb-3">
          <Link to={"/categories"}>
            <button type="button" className="btn btn-dark rounded-pill">
              <i className="bx bx-exit"></i> back
            </button>
          </Link>
        </div>
        <div className="row">
          <div className="col-xl-12">
              <div className="card mb-4">
                <div className="card-header d-flex justify-content-between align-items-center">
                  <h5 className="mb-0">Category View</h5>
                </div>
                <div className="card-body py-0">
                  <form>
                    <div className="row">
                      <div className="col-md-4">
                        <div className="mb-3">
                          <label className="form-label m-0" htmlFor="order-no">
                            Name
                          </label>
                          <span className="d-block font-weight-600">
                            {data.name}
                          </span>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="mb-3">
                          <label className="form-label m-0" htmlFor="customer">
                            Slot
                          </label>
                          <span className="d-block font-weight-600">
                            {data.slots}
                          </span>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="mb-3">
                          <label className="form-label m-0" htmlFor="customer">
                            Status
                          </label>
                          <span className="d-block font-weight-600">
                            {data.status}
                          </span>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoriesView;
