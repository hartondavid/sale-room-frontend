import Login from "./views/Login.js";
import Dashboard from "./layouts/Dashboard.js";
import Products from "./views/dashboard/Products.js";
import CreateEditProduct from "./views/dashboard/CreateEditProduct.js";
import AllProducts from "./views/dashboard/AllProducts.js";
import ProductsSold from "./views/dashboard/ProductsSold.js";
import Offers from "./views/dashboard/Offers.js";
import PurchasedProducts from "./views/dashboard/PurchasedProducts.js";
import Payments from "./views/dashboard/Payments.js";
import ShoppingCard from "./views/dashboard/ShoppingCard.js";
import Orders from "./views/dashboard/Orders.js";
import CreateOrder from "./views/dashboard/CreateOrder.js";
import FinishedOffers from "./views/dashboard/FinishedOffers.js";
var routes = [
  {
    path: "/login",
    name: "Login",
    icon: "ni ni-key-25 text-info",
    component: <Login />,
    layout: "/auth",
  },
  {
    path: "/index",
    name: "Login",
    icon: "ni ni-key-25 text-info",
    component: AllProducts,
    layout: "/dashboard",
  },
  {
    path: "/products",
    name: "Products",
    icon: "ni ni-key-25 text-info",
    component: Products,
    layout: "/dashboard",
  },
  {
    path: "/createEditProduct/:productId",
    name: "Create Edit Product",
    component: CreateEditProduct,
    layout: "/dashboard",
  },
  {
    path: "/allProducts",
    name: "All Products",
    component: AllProducts,
    layout: "/dashboard",
  },

  {
    path: "/productsSold",
    name: "Products Sold",
    component: ProductsSold,
    layout: "/dashboard",
  },
  {
    path: "/offers",
    name: "Offers",
    component: Offers,
    layout: "/dashboard",
  },
  {
    path: "/purchasedProducts",
    name: "Purchased Products",
    component: PurchasedProducts,
    layout: "/dashboard",
  },
  {
    path: "/payments",
    name: "Payments",
    component: Payments,
    layout: "/dashboard",
  },
  {
    path: "/shoppingCard",
    name: "Shopping Card",
    component: ShoppingCard,
    layout: "/dashboard",
  },
  {
    path: "/orders",
    name: "Orders",
    component: Orders,
    layout: "/dashboard",
  },
  {
    path: "/createOrder",
    name: "Create Order",
    component: CreateOrder,
    layout: "/dashboard",
  },
  {
    path: "/finishedOffers",
    name: "Finished Offers",
    component: FinishedOffers,
    layout: "/dashboard",
  },

];

export default routes;
