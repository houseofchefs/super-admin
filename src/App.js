import "./assets/css/boxicons.css";
import "./assets/css/core.css";
import "./assets/css/demo.css";
import "./assets/css/theme-default.css";
import "./assets/css/auth.css";
import "react-toastify/dist/ReactToastify.css";
import "./assets/css/style.css";
import { ToastContainer } from "react-toastify";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard/Dashboard";
import Layout from "./components/common/Layout";
import CategoryCreate from "./pages/Categories/CategoryCreate";
import CategoriesView from "./pages/Categories/CategoriesView";
import CategoryEdit from "./pages/Categories/CategoryEdit";
import CategoryList from "./pages/Categories/CategoryList";
import VendorList from "./pages/Vendors/VendorList";
import VendorCreate from "./pages/Vendors/VendorCreate";
import VendorDetails from "./pages/Vendors/VendorDetails";
import DiscountList from "./pages/Discount/DiscountList";
import PrivateRoute from "./components/common/PrivateRoute";
import LoginPage from "./pages/Login/LoginPage";

function App() {
  return (
    <>
      <ToastContainer autoClose={800} />
      <Router>
        <Routes>
          <Route element={<PrivateRoute />}>
            <Route path="/" element={<Layout />}>
              <Route index path="/" element={<Dashboard />} />
              <Route path="/categories" element={<CategoryList />} />
              <Route path="/categories/create" element={<CategoryCreate />} />
              <Route path="/categories/:id/view" element={<CategoriesView />} />
              <Route path="/categories/:id/edit" element={<CategoryEdit />} />
              <Route path="/vendors" element={<VendorList />} />
              <Route path="/vendor/create" element={<VendorCreate />} />
              <Route path="/vendor/:id/view" element={<VendorDetails />} />
              <Route path="/discounts" element={<DiscountList />} />
            </Route>
          </Route>
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
