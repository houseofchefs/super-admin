import "../../assets/css/login.css";
import hocTwo from "../../assets/images/hoc-two.png";
import hocOne from "../../assets/images/hoc-one.png";
import lamp from "../../assets/images/Lamp.png";
import redBackground from "../../assets/images/red-bg.png";
import chef from '../../assets/images/chef-in-uniform.png'

const LoginPage = () => {
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
                <form action="">
                  <div className="form-floating mb-4">
                    <input
                      type="email"
                      className="form-control"
                      id="floatingInput"
                    />
                    <label for="floatingInput">Email address</label>
                  </div>
                  <div className="form-floating">
                    <input
                      type="password"
                      className="form-control"
                      id="floatingPassword"
                    />
                    <label for="floatingPassword">Password</label>
                  </div>
                  <button
                    type="submit"
                    className="btn btn-primary btn-lg w-100 btn-bg"
                    fdprocessedid="edcbub"
                  >
                    Login
                  </button>
                </form>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="login-img-content">
                <img
                  className="chef"
                  src={chef}
                  alt=""
                />
                <img className="lamp" src={lamp} alt="" />
                <img className="red-bg" src={redBackground} alt="" />
              </div>
            </div>
          </div>
        </div>
        <div className="layout-overlay layout-menu-toggle"></div>
      </div>
    </div>
  );
};

export default LoginPage;
