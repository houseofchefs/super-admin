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
import ApplicationProvider from "./context/ApplicationProvider";
import VendorEdit from "./pages/Vendors/VendorEdit";
import CustomerList from "./pages/Customers/CustomerList";
import CustomerCreate from "./pages/Customers/CustomerCreate";
import CustomerEdit from "./pages/Customers/CustomerEdit";
import CreateDiscount from "./pages/Discount/CreateDiscount";
import EditDiscount from "./pages/Discount/EditDiscount";
import AdminList from "./pages/Admin/AdminList";
import CreateAdmin from "./pages/Admin/CreateAdmin";
import EditAdmin from "./pages/Admin/EditAdmin";
import ReviewList from "./pages/Reviews/ReviewList";
import OrderList from "./pages/Orders/OrderList";
import CreateOrder from "./pages/Orders/CreateOrder";
import EditOrder from "./pages/Orders/EditOrder";
import Riders from "./pages/Riders/Riders";
import CreateRider from "./pages/Riders/CreateRider";
import EditRider from "./pages/Riders/EditRider";

function App() {
  return (
    <>
      <ApplicationProvider>
        <ToastContainer autoClose={800} />
        <Router>
          <Routes>
            <Route element={<PrivateRoute />}>
              <Route path="/" element={<Layout />}>
                <Route index path="/" element={<Dashboard />} />
                <Route path="/categories" element={<CategoryList />} />
                <Route path="/categories/create" element={<CategoryCreate />} />
                <Route
                  path="/categories/:id/view"
                  element={<CategoriesView />}
                />
                <Route path="/categories/:id/edit" element={<CategoryEdit />} />
                <Route path="/vendors" element={<VendorList />} />
                <Route path="/vendor/create" element={<VendorCreate />} />
                <Route path="/vendor/:id/view" element={<VendorDetails />} />
                <Route path="/vendor/:id/edit" element={<VendorEdit />} />
                <Route path="/discounts" element={<DiscountList />} />
                <Route path="/create/discount" element={<CreateDiscount />} />
                <Route path="/discount/:id/edit" element={<EditDiscount />} />
                <Route path="/customers" element={<CustomerList />} />
                <Route path="/customer/create" element={<CustomerCreate />} />
                <Route path="/customer/:id/edit" element={<CustomerEdit />} />
                <Route path="/admin" element={<AdminList />} />
                <Route path="/create/admin" element={<CreateAdmin />} />
                <Route path="/admin/:id/edit" element={<EditAdmin />} />
                <Route path="/reviews" element={<ReviewList />} />
                <Route path="/orders" element={<OrderList />} />
                <Route path="/create/order" element={<CreateOrder />} />
                <Route path="/order/:id/edit" element={<EditOrder />} />
                <Route path="/riders" element={<Riders />} />
                <Route path="/rider/create" element={<CreateRider />} />
                <Route path="/rider/:id/edit" element={<EditRider />} />
              </Route>
            </Route>
            <Route path="/login" element={<LoginPage />} />
          </Routes>
        </Router>
      </ApplicationProvider>
    </>
  );
}

export default App;
