/**
 * ################## API's Service Route's Defining ##################
 */
const app = "local";
export const baseUrl =
  app === "development"
    ? "http://api-services.houseofchefs.in/api/v1"
    : "http://127.0.0.1:8000/api/v1";

/**
 * ## Sub Routes Defining
 */

export const LOGIN = "/auth/admin/login";
export const CATEGORIES_LIST = "/categories";
export const SUBMODULES = "/module/";
export const VENDORLIST = "/vendor/list";
export const GOOGLE_LOCATION = "/get-location";
export const GET_LAT_LNG = "/lat-lng";
export const CREATE_VENDOR = "/vendor/signup";
export const MENU_LIST = "/menu/admin/list";
export const VENDOR_DETAILs = "/vendor/edit/";
export const VENDOR_DROPDOWN = "/vendor/dropdown";
export const VENDOR_BASED_MENU_LIST = "/menu/vendor/list/";
export const INGREDIANT_DROPDOWN = "/menu/ingrediants/dropdown";
export const CREATE_MENU = "/menu/cook/create";
export const MENU_APPROVE = "/menu/admin/approve/";
export const PRODUCT_LIST = "/product/vendor/";
export const CREATE_PRODUCT = "/product";
export const STAFF_LIST = "/staff/vendor-based/list/";
export const CREATE_STAFF = "/auth/staff/signup";
export const STAFF_ACTIVE = "/staff/active/";
export const STAFF_INACTIVE = "/staff/inactive/";
export const ORDER_LIST = "/vendor/order/";
export const DISCOUNT_LIST = "/discount";
export const ORDER_NEXT_ACTION = "/admin/order/next-action/";
export const SEPARATE_MENU_DETAILS = "/menu/separate-detail/";
export const UPDATE_MENU = "/menu/update/";
export const CUSTOMER_LIST = "/customer/list";
export const CUSTOMER_CREATE = "/auth/customer/signup";
export const CUSTOMER_EDIT = "/customer/edit/";
export const CUSTOMER_UPDATE = "/customer/update/";
export const ADMIN_LIST = "/admin/list";
export const ADMIN_SIGNUP = "/auth/admin/signup";
export const ADMIN_EDIT = "/admin/edit/";
export const ADMIN_UPDATE = "/admin/update/";
export const ADMIN_ORDER_LIST = "/admin/order";
export const CUSTOMER_ADDRESS = "/address/";
export const NEARBY_VENDOR = "/near-by/vendor/drop-down";
export const VENDOR_BASED_CATEGORY = "/category/vendor-based/";
export const CATEGORY_BASED_MENUS = "/near-by/category-based-menu";
export const PLACE_ORDER = "/customer/order";
export const DASHBOARD = "/admin/dashboard";
