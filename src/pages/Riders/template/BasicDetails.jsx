const BasicDetails = ({ data }) => {
  return (
    <div
      className="tab-pane fade active show"
      id="navs-pills-top-home"
      role="tabpanel"
    >
      <div className="mb-4">
        <div className="card-header d-flex justify-content-between align-items-center">
          <h5 className="mb-0">Personal Details</h5>
        </div>
        <div className="card-body py-0">
          <form>
            <div className="row">
              <div className="col-md-4">
                <div className="mb-3">
                  <label
                    className="form-label m-0"
                    htmlFor="basic-default-fullname"
                  >
                    Rider Name
                  </label>
                  <span className="d-block font-weight-600">{data?.name}</span>
                </div>
              </div>
              <div className="col-md-4">
                <div className="mb-3">
                  <label
                    className="form-label m-0"
                    htmlFor="basic-default-email"
                  >
                    Email
                  </label>
                  <span className="d-block font-weight-600">{data?.email}</span>
                </div>
              </div>
              <div className="col-md-4">
                <div className="mb-3">
                  <label
                    className="form-label m-0"
                    htmlFor="basic-default-mobile"
                  >
                    Mobile
                  </label>
                  <span className="d-block font-weight-600">
                    {data?.mobile}
                  </span>
                </div>
              </div>
            </div>
          </form>
        </div>
        <div className="card-header d-flex justify-content-between align-items-center">
          <h5 className="mb-0">Address Details</h5>
        </div>
        <div className="card-body py-0">
          <form>
            <div className="row">
              <div className="col-md-4">
                <div className="mb-3">
                  <label
                    className="form-label m-0"
                    htmlFor="basic-default-door-no"
                  >
                    Door No
                  </label>
                  <span className="d-block font-weight-600">
                    {data?.address?.door_no}
                  </span>
                </div>
              </div>
              <div className="col-md-4">
                <div className="mb-3">
                  <label className="form-label m-0" htmlFor="street-name">
                    Address Line
                  </label>
                  <span className="d-block font-weight-600">
                    {data?.address?.address_line}
                  </span>
                </div>
              </div>
              <div className="col-md-4">
                <div className="mb-3">
                  <label className="form-label m-0" htmlFor="lan-mark">
                    Lan Mark
                  </label>
                  <span className="d-block font-weight-600">
                    {data?.address?.lanmark}
                  </span>
                </div>
              </div>
              <div className="col-md-4">
                <div className="mb-3">
                  <label className="form-label m-0" htmlFor="pincode">
                    Pincode
                  </label>
                  <span className="d-block font-weight-600">
                    {data?.address?.pincode}
                  </span>
                </div>
              </div>
            </div>
          </form>
        </div>
        <div className="card-header d-flex justify-content-between align-items-center">
          <h5 className="mb-0">Bank Details</h5>
        </div>
        <div className="card-body pt-0">
          <form>
            <div className="row">
              <div className="col-md-4">
                <div className="mb-3">
                  <label className="form-label m-0" htmlFor="bank-name">
                    Bank Name
                  </label>
                  <span className="d-block font-weight-600">
                    {data?.bank?.bank_name}
                  </span>
                </div>
              </div>
              <div className="col-md-4">
                <div className="mb-3">
                  <label className="form-label m-0" htmlFor="account-no">
                    Account No
                  </label>
                  <span className="d-block font-weight-600">
                    {data?.bank?.account_number}
                  </span>
                </div>
              </div>
              <div className="col-md-4">
                <div className="mb-3">
                  <label className="form-label m-0" htmlFor="account-no">
                    Account Type
                  </label>
                  <span className="d-block font-weight-600">
                    {data?.bank?.type?.module_name}
                  </span>
                </div>
              </div>
              <div className="col-md-4">
                <div className="mb-3">
                  <label className="form-label m-0" htmlFor="holder-name">
                    Holder Name
                  </label>
                  <span className="d-block font-weight-600">
                    {data?.bank?.holder_name}
                  </span>
                </div>
              </div>
              <div className="col-md-4">
                <div className="mb-3">
                  <label className="form-label m-0" htmlFor="ifsc-code">
                    IFSC Code
                  </label>
                  <span className="d-block font-weight-600">
                    {data?.bank?.ifsc_code}
                  </span>
                </div>
              </div>
            </div>
          </form>
        </div>
        <div className="card-header d-flex justify-content-between align-items-center">
          <h5 className="mb-0">Vehicle Details</h5>
        </div>
        <div className="card-body pt-0">
          <form>
            <div className="row">
              <div className="col-md-4">
                <div className="mb-3">
                  <label className="form-label m-0" htmlFor="bank-name">
                    Vehicle Registration Number
                  </label>
                  <span className="d-block font-weight-600">
                    {data?.vehicle?.reg_no}
                  </span>
                </div>
              </div>
              <div className="col-md-4">
                <div className="mb-3">
                  <label className="form-label m-0" htmlFor="account-no">
                    Insurance Number
                  </label>
                  <span className="d-block font-weight-600">
                    {data?.vehicle?.insurance_number}
                  </span>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BasicDetails;
