import { useState } from "react";
import Logo from "../../assets/images/logo.png";
import axios from "axios";
import { LOGIN, baseUrl } from "../../routes/routes";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { ValidationMessage } from "../../components/Utils";

const Login = () => {
  // ## State Variables
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

    axios.post(baseUrl + LOGIN, form)
      .then((response) => {
        if(response?.data?.status && response?.status === 200) {
          localStorage.setItem('token', response.data.authorisation.token);
          toast.success(response.data.msg);
          navigate('/');
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
    <div className="container-xxl">
      <div className="authentication-wrapper authentication-basic container-p-y">
        <div className="authentication-inner">
          <div className="card">
            <div className="card-body">
              <div className="app-brand justify-content-center">
                <a href="index.html" className="app-brand-link gap-2">
                  <span className="app-brand-logo demo"></span>
                  <img src={Logo} alt="" width="300" />
                </a>
              </div>

              <form
                id="formAuthentication"
                className="mb-3"
                onSubmit={submit}
                method="POST"
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
                <div className="mb-3 form-password-toggle">
                  <div className="d-flex justify-content-between">
                    <label className="form-label" htmlFor="password">
                      Password
                    </label>
                  </div>
                  <div className="">
                    <input
                      type="password"
                      id="password"
                      className="form-control"
                      name="password"
                      placeholder="********"
                      aria-describedby="password"
                      onChange={(e) =>
                        setForm({ ...form, password: e.target.value })
                      }
                    />
                    <ValidationMessage error={errors} name="password" />
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
        </div>
      </div>
    </div>
  );
};

export default Login;
