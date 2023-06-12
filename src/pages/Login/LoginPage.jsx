import "../../assets/css/login.css";
import hocTwo from "../../assets/images/hoc-two.png";
import hocOne from "../../assets/images/hoc-one.png";
import axios from "axios";
import { LOGIN, baseUrl } from "../../routes/routes";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { ValidationMessage } from "../../components/Utils";

const LoginPage = () => {
  // ## State Variables
  const [type, setType] = useState("password");
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});

  // Navigation
  const navigate = useNavigate();

  /**
   * @API call for Login Authentication
   */
  const submit = (e) => {
    e.preventDefault();

    axios
      .post(baseUrl + LOGIN, form)
      .then((response) => {
        if (response?.data?.status && response?.status === 200) {
          localStorage.setItem("token", response.data.authorisation.token);
          toast.success(response.data.msg);
          navigate("/");
        }
      })
      .catch((error) => {
        if (
          !error?.response?.data?.status &&
          error?.response?.data?.status_code === 422
        ) {
          setErrors(error?.response?.data?.error);
          toast.error(error?.response?.data?.msg);
        }
      });
  };
  return (
    <div className="layout-wrapper layout-content-navbar">
      <div className="login-pg">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6 m-auto">
              <div className="login-container">
                <div className="login-content">
                  <img src={hocTwo} className="login-logo" alt="" />
                  <img src={hocOne} className="login-logo-one" alt="" />
                  <h3>Welcome</h3>
                </div>
                <form
                  id="formAuthentication"
                  className="mb-3"
                  onSubmit={submit}
                  method="POST"
                  autoComplete="off"
                  autoFocus="off"
                >
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                      Email
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="email"
                      name="email"
                      placeholder="Enter your email"
                      autoFocus
                      onChange={(e) =>
                        setForm({ ...form, email: e.target.value })
                      }
                    />
                    <ValidationMessage error={errors} name="email" />
                  </div>
                  <div className="mb-3 form-password-toggle login-password">
                    <div className="d-flex justify-content-between">
                      <label className="form-label" htmlFor="password">
                        Password
                      </label>
                    </div>
                    <div className="input-group input-group-merge">
                      <input
                        type={type}
                        id="basic-default-password32"
                        className="form-control"
                        name="password"
                        placeholder="********"
                        aria-describedby="basic-default-password"
                        onChange={(e) =>
                          setForm({ ...form, password: e.target.value })
                        }
                      />
                      <ValidationMessage error={errors} name="password" />
                      {type === "password" ? (
                        <span
                          className="input-group-text cursor-pointer"
                          id="basic-default-password"
                          onClick={() => setType('text')}
                        >
                          <i className="bx bx-hide"></i>
                        </span>
                      ) : (
                        <span
                          className="input-group-text cursor-pointer"
                          id="basic-default-password"
                          onClick={() => setType('password')}
                        >
                          <i className="bx bx-show"></i>
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="mb-3">
                    <button
                      className="btn btn-primary d-grid w-100"
                      type="submit"
                    >
                      Sign in
                    </button>
                  </div>
                </form>
              </div>
            </div>
            <div className="col-lg-6">
              {/* <div className="login-img-content">
                <img
                  className="chef"
                  src={chef}
                  alt=""
                />
                <img className="lamp" src={lamp} alt="" />
                <img className="red-bg" src={redBackground} alt="" />
              </div> */}
            </div>
          </div>
        </div>
        <div className="layout-overlay layout-menu-toggle"></div>
      </div>
    </div>
  );
};

export default LoginPage;
